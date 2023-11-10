import { createRouter, createWebHistory } from "vue-router";
import TheMain from '../views/TheMain.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: TheMain
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/board",
      name: 'board',
      component: () => import("../components/board/BoardList.vue"),
      redirect: { name: "boardlist" },
      children: [
        {
          path: "list",
          name: "boardlist",
          component: () => import("../components/board/BoardList.vue")
        },
        {
          path: "write",
          name: "boardwrite",
          component: () => import("../components/board/BoardWrite.vue")
        },
        {
          path: "view/:no",
          name: "boardview",
          component: () => import("../components/board/BoardView.vue")
        },
        {
          path: "modify/:no",
          name: "boardmodify",
          component: () => import("../components/board/BoardModify.vue")
        }
      ]

    },
    {

    }
  ],
});

export default router;
