<template>
  <div>Hello {{name}}!</div>
</template>

<script  lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): any {
    return {
      name: "World"
    };
  },
  mounted(): void {
    console.log(this.greeting);
  },
  computed: {
    // need annotation
    greeting(): string {
      return "Hi from App.vue!" + this.name;
    }
  },
  methods: {
    // async showModal(): Promise<any> {
    //   const loading = await this.$ionic.loadingController.create({
    //     spinner: "hide",
    //     duration: 5000,
    //     message: "Please wait...",
    //     translucent: true,
    //     cssClass: "custom-class custom-loading"
    //   });
    //   loading.present();
    // }
  }
});
</script>

<style>
body {
  font-style: italic;
  border: solid 1px pink;
}
</style>


