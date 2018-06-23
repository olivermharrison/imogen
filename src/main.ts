import Vue from 'vue';
import App from './ui/app.vue';

import * as scene from './scene';

Vue.config.productionTip = true;

new Vue({
    render: (h) => h(App),
}).$mount('#app');

scene.initScene();
