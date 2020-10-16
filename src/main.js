import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faPen,
  faMinus,
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrashAlt, faChevronUp, faChevronDown, faPen, faMinus);

const app = createApp(App);
app
  .use(store)
  .use(router)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#app");
