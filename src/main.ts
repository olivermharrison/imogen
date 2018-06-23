import Vue from 'vue';
import App from './ui/app.vue';

Vue.config.productionTip = true;

new Vue({
    render: (h) => h(App),
}).$mount('#app');


