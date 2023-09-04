import { createRouter, createWebHashHistory } from "vue-router";
const Login = () => import("../components/Login/login.vue");
const Main = () => import("../components/groupManagement/main.vue");
const Message = () => import("../components/Message/message.vue");
const Manage = () => import("../components/Project/manage.vue");
const Members = () =>
  import("../components/groupManagement/components/Members.vue");
const Team = () => import("../components/groupManagement/components/Team.vue");
const Person = () => import("../components/groupManagement/Person.vue");
const Doc = () => import("../components/documentEdit/doc.vue");
const Project = () => import("../components/Project/project.vue");
const demo = () => import("../demo.vue");
const Home = () => import("../components/Home.vue");

const formdesign = () => import("../views/design/form/index.vue")

const datascreen = () => import("../views/design/dataScreen/index.vue")


const routes = [
  { path: "/login", component: Login },
  { path: "/test", component: demo },
  {
    path: "/main",
    component: Main,
    children: [
      {
        path: "message",
        component: Message,
      },
      {
        path: "manage",
        component: Manage,
      },
      {
        path: "members",
        component: Members,
      },
      {
        path: "doc",
        component: Doc,
      },
      {
        path: "project/:pid",
        component: Project,
      },
      {
        path: "formdesign",
        component: formdesign
      },
      {
        path: "datascreen",
        component: datascreen
      },
      {
        path: "/",
        redirect: "/home",
      },
      {
        path: "formdesign",
        component: formdesign
      }
    ],
  },
  { path: "/team", component: Team },
  { path: "/person", component: Person },
  {
    path: '/formdesign',
    name: '/formdesign',
    component: () => import('../views/design/form/index.vue')
  },
  
  {
    path: '/datascreen',
    name: '/datascreen',
    component: () => import('../views/design/dataScreen/index.vue')
  },
  {
    path: '/Lcytest',
    name: '/Lcytest',
    component: () =>import('../views/design/Lcytest.vue')
  },
  { path: "/home", component: Home },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
