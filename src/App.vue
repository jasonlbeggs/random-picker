<template>
  <div id="app" class="text-grey-darkest">
    <div class="container mx-auto px-4 py-16 md:flex flex-col items-center justify-center min-h-screen">
      <h1 :class="{'opacity-0': disabled}" class="text-3xl md:text-4xl text-black mb-4 transition">{{ result }}</h1>
      <button :disabled="disabled" class="mb-6 bg-blue text-white shadow-md rounded-lg px-4 py-3 text-xl uppercase tracking-wide font-medium focus:outline-none focus:shadow-outline" @click.prevent="generate">Choose</button>
      <div class="w-full md:w-auto text-left">
        <h2 class="text-black mb-3">Options:</h2>
        <div v-if="options.length" class="mb-4">
          <div v-for="option in options" class="flex items-center justify-between mb-2" :key="option">
            <div class="text-xl text-grey-dark">{{ option }}</div>
            <div
              class="font-bold text-2xl text-grey cursor-pointer hover:text-red"
              @click.prevent="removeOption(option)"
            >
              &times;
            </div>
          </div>
        </div>
        <div v-else class="text-xl text-grey mb-4">Add an option to generate a random pick.</div>
        <form class="flex items-center" @submit.prevent="addOption">
          <input placeholder="Add an option" v-model="newOption" class="w-full bg-white px-3 py-2 rounded-lg shadow-md mr-1 focus:outline-none focus:shadow-outline">
          <button class="bg-blue text-white shadow-md rounded-lg px-3 py-2 uppercase tracking-wide font-medium focus:outline-none focus:shadow-outline">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      newOption: null,
      disabled: false,
      options: ["Watch more TV", "Go to sleep"],
      result: "Click the button to choose a random option."
    };
  },
  mounted() {
    const options = JSON.parse(localStorage.getItem("random-options"));

    if (options && options.length) {
      this.options = options;
    }
  },
  watch: {
    options() {
      localStorage.setItem("random-options", JSON.stringify(this.options));
    }
  },
  methods: {
    addOption() {
      if (!this.newOption || !this.newOption.trim().length) {
        return;
      }
      this.options.push(this.newOption);
      this.newOption = null;
    },
    removeOption(option) {
      const index = this.options.indexOf(option);
      if (index >= -1) {
        this.options.splice(index, 1);
      }
    },
    generate() {
      if (!this.options.length) {
        return;
      }

      this.disabled = true;

      const chosen = this.options[
        Math.floor(Math.random() * this.options.length)
      ];

      setTimeout(() => {
        this.result = `Result: ${chosen}`;
        this.disabled = false;
      }, 500);
    }
  }
};
</script>

<style>
.transition {
  transition: all 0.2s;
}
</style>
