import '@/style/element.scss';
import 'element-plus/theme-chalk/display.css';
import '@/style/index.sass';
// import '@/style/theme/index.css';
import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import App from './App.vue';
import router from './router';
import store from './store';
import MetaMask from '@/contract/MetaMask';

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount('#app');
