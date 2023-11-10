import { createRouter, createWebHistory } from "vue-router";
import TheMain from "../views/TheMain.vue";
import TheMain from "@/views/TheMain.vue";
import TheLogin from "@/components/member/TheLogin.vue";
import TheFindPassWord from "@/components/member/TheFindPassWord.vue";
import TheJoin from "@/components/member/TheJoin.vue";
import TheMyPage from "@/components/member/TheMyPage.vue";
// import TheBoardView from "./components/board/TheBoardView.vue";
// import TheBoardWrite from "./components/board/TheBoardWrite.vue";
// import TheBoardModify from "./components/board/TheBoardModify.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMain,
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TheLogin,
    },
    {
      path: "/findpassWord",
      name: "findpassWord",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TheFindPassWord,
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TheJoin,
    },
    {
      path: "/mypage",
      name: "mypage",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TheMyPage,
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../components/board/BoardList.vue"),
      redirect: { name: "boardlist" },
      children: [
        {
          path: "list",
          name: "boardlist",
          component: () => import("../components/board/BoardList.vue"),
        },
        {
          path: "write",
          name: "boardwrite",
          component: () => import("../components/board/BoardWrite.vue"),
        },
        {
          path: "view/:no",
          name: "boardview",
          component: () => import("../components/board/BoardView.vue"),
        },
        {
          path: "modify/:no",
          name: "boardmodify",
          component: () => import("../components/board/BoardModify.vue"),
        },
      ],
    },
    {},
  ],
});

export default router;
