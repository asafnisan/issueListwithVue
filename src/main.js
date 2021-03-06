import Vue from 'vue';
import App from './App.vue';
import router from './router';

window.EventBus = new Vue();

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
