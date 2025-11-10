import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import 'highlight.js/styles/github.css';
import 'highlight.js/styles/github-dark.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');