<template>
  <!-- <ion-content>
    <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content :refreshingSpinner="spinner" :refreshingText="greeting">
        <div>Hello {{name}}!</div> -->
        <button @click="showModal">Load</button>
      <!-- </ion-refresher-content>
    </ion-refresher>
  </ion-content> -->
</template>

<script  lang="ts">
import Vue from "vue";

export default Vue.extend({
  data(): any {
    return {
      name: "World",
      spinner: "asd"
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
    doRefresh() {},

    async showModal(): Promise<any> {
      const loading = await this.$ionic.loadingController.create({
        spinner: "hide",
        duration: 5000,
        message: "Please wait...",
        translucent: true,
        cssClass: "custom-class custom-loading"
      });
      loading.present();
    }
  }
});
</script>

<style>
body {
  font-style: italic;
  border: solid 1px pink;
}
</style>


