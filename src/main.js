import { createApp } from "vue";

import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/main.css";
import "ant-design-vue/dist/reset.css";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import router from "./router";

const app = createApp(App);
app.use(ToastPlugin);
app.use(router).mount("#app");
