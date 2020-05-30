import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store";

// @ main page
import PageHome from "@/pages/PageHome";
import PageAbout from "@/pages/PageAbout";
import PageAuth from "@/pages/PageAuth";
import PagePost from "@/pages/PagePost";

// @ child page
// auth
import PageRegister from "@/pages/child-pages/auth/PageRegister";
import PageLogin from "@/pages/child-pages/auth/PageLogin";
// post
import PageAllPosts from "@/pages/child-pages/post/PageAllPosts";
import PageOnePost from "@/pages/child-pages/post/PageOnePost";
import PageCreatePost from "@/pages/child-pages/post/PageCreatePost";
import PageUpdatePost from "@/pages/child-pages/post/PageUpdatePost";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "page-home",
    component: PageHome,
  },
  {
    path: "/about",
    name: "page-about",
    component: PageAbout,
  },
  {
    path: "/auth",
    name: "page-auth",
    component: PageAuth,
    children: [
      {
        path: "register",
        name: "page-register",
        component: PageRegister,
        meta: {
          guestPage: true,
        },
      },
      {
        path: "login",
        name: "page-login",
        component: PageLogin,
        meta: {
          guestPage: true,
        },
      },
    ],
  },
  {
    path: "/post",
    name: "page-post",
    component: PagePost,
    redirect: { name: "page-all-posts" },
    children: [
      {
        path: "all",
        name: "page-all-posts",
        component: PageAllPosts,
      },
      {
        path: "create",
        name: "page-create-post",
        component: PageCreatePost,
      },
      {
        path: ":postId",
        name: "page-one-post",
        component: PageOnePost,
      },
      {
        path: ":postId/update",
        name: "page-update-post",
        component: PageUpdatePost,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("authModule/loadUser").then((res) => {
    if (!!res && to.matched.some((record) => record.meta.guestPage)) {
      next({ name: "page-home" });
    } else {
      next();
    }
  });
  next();
});

export default router;
