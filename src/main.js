import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from 'pinia'
import ElementPlus from "element-plus";
// @ts-ignore
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import "element-plus/dist/index.css";
import './assets/scss/element-var.scss'
import '@/assets/scss/index.scss'
import AKDesign from './views/design/index'
import ComComponents from './components/index.ts'
import store from "./store/index.js";
import VueScrollTo from "vue-scrollto";
import { library } from "@fortawesome/fontawesome-svg-core";
// unocss
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {
  faUserPlus,
  faXmark,
  faCirclePlus,
  faUser,
  faUserGroup,
  faAt,
  faClockRotateLeft,
  faDownload,
  faTrashCan,
  faPaintBrush,
  faObjectGroup,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as regularStar,
  faCommentDots,
  faComment,
  faFileLines,
  faClipboard,
  faFolder,
  faFloppyDisk,
} from "@fortawesome/free-regular-svg-icons";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import zhLocale from "element-plus/es/locale/lang/zh-cn";
// 实例化 Pinia
const pinia = createPinia()
library.add(faUserPlus);
library.add(solidStar);
library.add(regularStar);
library.add(faXmark);
library.add(faCirclePlus);
library.add(faUser);
library.add(faUserGroup);
library.add(faAt);
library.add(faCommentDots);
library.add(faComment);
library.add(faFileLines);
library.add(faClipboard);
library.add(faClockRotateLeft);
library.add(faDownload);
library.add(faTrashCan);
library.add(faPaintBrush);
library.add(faFolder);
library.add(faFloppyDisk);
library.add(faObjectGroup);
library.add(faBars);

const app = createApp(App);
app.use(library);
app.use(faUserPlus);
app.use(FontAwesomeIcon);
app.use(router);
app.use(ElementPlus, { locale: zhLocale });
app.use(store);
app.use(pinia)
app.use(mavonEditor);
app.use(AKDesign)
app.use(ComComponents)
app.mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册一个全局组件用于自定义组件测试
import componentTest from '@/docs/components/componentTest.vue'
app.component('ComponentTest', componentTest)
