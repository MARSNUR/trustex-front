import { createStore } from "vuex";
import { auth } from "./auth.module";

const store = createStore({
  modules: {
    auth,
  },
  state: {
    //API_URI: "https://localhost:7085",
    API_URI: "https://api.trustex.kg",
  }
});

export default store;
