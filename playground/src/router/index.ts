import { createRouter, createWebHistory } from "vue-router";

const componentItems = (
  import.meta as ImportMeta & {
    glob: (pattern: string) => Record<string, () => Promise<unknown>>;
  }
).glob("../components/items/*.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/components",
    name: "components",
    component: () => import("../views/Components.vue"),
    children: Object.entries(componentItems).map(([file, component]) => {
      const name =
        file
          .split("/")
          .pop()
          ?.replace(/\.vue$/, "")
          .replace(/([a-z])([A-Z])/g, "$1-$2")
          .toLowerCase() ?? "";

      return {
        path: name,
        name,
        component,
      };
    }),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("../views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: "auto",
      };
    } else {
      // Scroll to top needs to be delayed to wait to fix scrolling issue in Firefox
      // See https://router.vuejs.org/guide/advanced/scroll-behavior.html#delaying-the-scroll
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ left: 0, top: 0 });
        }, 50);
      });
    }
  },
});

export default router;
