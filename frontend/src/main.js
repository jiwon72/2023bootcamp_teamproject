import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';

const app = createApp(App);

app.use(store);  // Vuex store 추가
app.use(router);

app.mount("#app");
