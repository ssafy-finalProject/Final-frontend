import "./assets/css/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
// import { createPinia } from 'pinia'
// import { VueCookies } from "vue-cookies";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
//Vue.use(VueCookies);
const app = createApp(App);
const pinia = createPinia();
// app.use(createPinia())
app.use(router);

app.use(pinia);
app.mount("#app");
