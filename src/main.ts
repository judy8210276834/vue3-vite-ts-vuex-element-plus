import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { HomeFilled, Money, InfoFilled, Timer } from "@element-plus/icons-vue";

const app = createApp(App);

const icons = {
  HomeFilled: HomeFilled,
  Money: Money,
  InfoFilled: InfoFilled,
  Timer: Timer,
};

for (const [key, value] of Object.entries(icons)) {
  app.component(key, value);
}

app.use(createPinia());
app.use(router);
app.mount("#app");
