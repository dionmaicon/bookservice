import Vue from "vue";
import Router from "vue-router";
import Home from "./components/home.vue";

import bookView from "./components/book/bookView.vue";
import bookIndex from "./components/book/bookIndex.vue";
import bookEdit from "./components/book/bookEdit.vue";
import bookCreate from "./components/book/bookCreate.vue";

Vue.use(Router);

let router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/book",
      name: "book",
      component: bookIndex,
      children: [
        { path: "view/:id", component: bookView, name: "bookView" },
        { path: "edit/:id", component: bookEdit, name: "bookEdit" },
        { path: "create", component: bookCreate, name: "bookCreate" }
      ]
    },

    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});

const EndPoint = class {
  constructor(production) {
    this.production = production;
    this.prodEndPoints = [];
    this.devEndPoints = [];
  }
  getAll() {
    if (this.production) return this.prodEndPoints;
    return this.devEndPoints;
  }
  getUrlByName(name) {
    if (this.production) {
      return this.prodEndPoints[name];
    } else {
      return this.devEndPoints[name];
    }
  }
  addUrl(urlProd, urlDev, name) {
    this.prodEndPoints[name] = urlProd;
    this.devEndPoints[name] = urlDev;
  }
};

export { router, EndPoint };
