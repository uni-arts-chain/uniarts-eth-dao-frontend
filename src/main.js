import { createApp } from "vue";
import App from "@/views/App";
import router from "@/router";
import store from "@/store";
import inject from "@/inject";

createApp(App).use(store).use(router).use(inject).mount("#app");
