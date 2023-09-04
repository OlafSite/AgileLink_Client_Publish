import {createStore} from "vuex"
import GroupModule from './group.js'
import createPersistedState from 'vuex-persistedstate'
import UserModule from "./MyUser.js";
import DocModule from "./doc.js";
import FormModule from "./form.js"
import ChatModule from "./chat.js";
const store = createStore({
  modules: {
    Group: GroupModule, //团队模块，对应group.js
    User: UserModule,
    Chat: ChatModule,
    Doc: DocModule,
    Form: FormModule
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ["User", "Chat", "Group", "Doc","Form"],
    }),
  ],
});
export default store;
