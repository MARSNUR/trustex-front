import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/libs/bootstrap/bootstrap-4.6.min.css"
import "./assets/css/styles.min.css"
import { FontAwesomeIcon } from './plugins/font-awesome'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import setupInterceptors from './services/setupInterceptors';

setupInterceptors(store);



createApp(App)
  .use(bootstrap)
  .use(router)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
