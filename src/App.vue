<template>
  <div id="app">
    <transition name="fade">
      <div v-if="!result" class="container mx-auto px-4 py-16 md:flex flex-col items-center justify-center min-h-screen">
        <h1 class="text-3xl md:text-4xl text-black">Random Picker</h1>
        <h2 class="text-xl md:text-2xl text-grey-darker mb-6 font-medium">Click the button to choose a random option.</h2>
        <button class="w-full md:w-auto mb-6 bg-teal-dark hover:bg-teal text-white shadow-md rounded-lg px-4 py-3 text-xl uppercase tracking-wide font-medium focus:outline-none focus:shadow-outline" @click.prevent="generate">Choose</button>
        <div class="w-full md:w-auto text-left">
          <h2 class="text-black mb-3">Options:</h2>
          <div v-if="options.length" class="mb-4">
            <div v-for="option in options" class="flex items-center justify-between mb-2" :key="option">
              <div class="text-xl text-grey-darker">{{ option }}</div>
              <button
                class="font-bold text-2xl text-grey cursor-pointer hover:text-red"
                @click.prevent="removeOption(option)"
              >
                &times;
              </button>
            </div>
          </div>
          <div v-else class="text-xl text-grey mb-4">Add an option to generate a random pick.</div>
          <form class="flex items-center mb-8" @submit.prevent="addOption">
            <input aria-label="new option" id="new-option" placeholder="Add an option" v-model="newOption" class="w-full bg-white px-4 py-3 text-xl rounded-lg shadow-md mr-1 focus:outline-none focus:shadow-outline">
            <button class="bg-teal-dark hover:bg-teal text-white shadow-md rounded-lg px-4 py-3 text-xl uppercase tracking-wide font-medium focus:outline-none focus:shadow-outline">Add</button>
          </form>
        </div>
        <div class="text-center">
          <a href="https://jasonlbeggs.com" class="text-grey-dark no-underline">Made with &hearts; by jasonlbeggs</a>
        </div>
      </div>
      <h1 v-else class="text-teal-dark text-center container px-4 py-16 flex items-center justify-center min-h-screen">
        {{ result }}
      </h1>
    </transition>
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
      result: null
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

      this.result = this.options[
        Math.floor(Math.random() * this.options.length)
      ];

      setTimeout(() => {
        this.result = null;
      }, 3000);
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
