import Vue from 'vue';
// for the VSCode TypeScript error try adding installing 'vue-ts-plugin' ($ npm i - D vue-ts-plugin)
// and adding it in tsconfig.json:
// "plugins": [
//   {
//     "name": "vue-ts-plugin"
//   }
// ]


// import Ionic from '@ionic/vue';
// Vue.use(Ionic);

import App from '@/App.vue';


new Vue({
  render: h => h(App)
}).$mount('#app');

console.log('Hi from main');

import '@/styles.css';
