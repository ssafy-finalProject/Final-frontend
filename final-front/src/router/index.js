import { createRouter, createWebHistory } from "vue-router";
import TheMain from "../views/TheMain.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMain,
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../components/board/TheBoardList.vue"),
      redirect: { name: "boardlist" },
      children: [
        {
          path: "list",
          name: "boardlist",
          component: () => import("../components/board/TheBoardList.vue"),
        },
        {
          path: "write",
          name: "boardwrite",
          component: () => import("../components/board/TheBoardWrite.vue"),
        },
        {
          path: "view/:no",
          name: "boardview",
          component: () => import("../components/board/TheBoardView.vue"),
        },
        {
          path: "modify/:no",
          name: "boardmodify",
          component: () => import("../components/board/TheBoardModify.vue"),
        },
      ],
    },
    {},
  ],
});

export default router;
