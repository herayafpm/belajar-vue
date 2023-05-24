import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.config.globalProperties.$apiURL = "http://vaccination.test/api/v1/";

app.mount("#app");
