<template>
  <ion-content>
    <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
      <ion-refresher-content :refreshingSpinner="dynamicIcon" :refreshingText="refreshMessage"></ion-refresher-content>
    </ion-refresher>
  </ion-content>
</template>

<script>
export default {
  mounted() {},
  methods: {
    async showModal() {
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
};
</script>

