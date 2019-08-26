<template>
  <div class="index container">
    <transition name="fade">
      <router-view />
    </transition>

    <div class="breadcrumbs" v-if="!modal" style="margin-bottom: 20px;">
      <nav style="display: inline">
        <li>
          <router-link :to="{ name: 'home', params: {} }">
            Home
          </router-link>
        </li>
        /
        <li>
          <router-link
            class="breadcrumbs-active"
            :to="{ name: 'book', params: {} }"
          >
            book
          </router-link>
        </li>
      </nav>
    </div>


    <div class="row" v-if="!modal">
      <div class="cols-2 hidden">
        <span style="font-size: 30px; text-align: left; vertical-align: middle; font-weight: bolder;"> SUPERO </span>
      </div>
      <div class="form-group has-search col" v-if="!modal">
        <span class="fa fa-search form-control-feedback" />
        <input type="text"
        placeholder="Busque livros pelo título, autor ou ISBN" v-model="search" class="form-control search" />
      </div>
      <div class="form-group hidden" >
        <button class="btn btn-primary" type="button" @click="searchFilter"> Buscar</button>
      </div>
    </div>

    <div class="row" style="margin-bottom: 15px;">

      <div class="col hidden" style="text-align: left;">
        <div class="form-control col" style="height: 50px;" v-if="!modal">
          <span>Filtrar ano de publicação: </span>
          <input class="form-control" style="display: inline; width: 100px;" type="number" min="1900" max="2050" step="1" value="2019"
                 v-model="initialYearSearch" />
         <span> até: </span>
         <input style="display: inline; width: 100px;" type="number" min="1900" max="2050" step="1" value="2019"
                class="form-control" v-model="endYearSearch" />
        <span>  <i style="float: right; vertical-align: middle;" class="fa fa-calendar" /> </span>
        </div>
      </div>

      <div class="total-pages col-3 hidden" style="text-align: right;" v-if="!modal">
        <small v-if="search != ''"> Procurando por: "{{ search }}".</small>
        <small v-if="mainList.length > 0"> Total de {{ bookList.length }}  resultados encontrados. </small>
        <small v-else>Não foram encontradas entradas para a busca realizada.</small>
      </div>
    </div>

    <div class="table-container" v-if="!modal">

      <table class="table table-striped">
        <thead>
          <tr>
            <th @click="sortBy('titulo')">
              livro <i style="float: right" class="fa fa-sort" />
            </th>
            <th @click="sortBy('autor')">
              autor <i style="float: right" class="fa fa-sort" />
            </th>
            <th @click="sortBy('editora')">
              editora <i style="float: right" class="fa fa-sort" />
            </th>
            <th @click="sortBy('ano')">
              ano <i style="float: right" class="fa fa-sort" />
            </th>

            <th>
              <div class="options-th">
                Ações
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in bookList" :key="index">
            <td>{{ book.titulo }} <br> ({{ book.ISBN }})</td>
            <td>{{ book.autor }}</td>
            <td>{{ book.editora }}</td>
            <td>{{ book.ano }}</td>

            <td>
              <div class="options-button">
                <button class="btn btn-info" @click="view(book.id)">
                  Detalhes <i class="fa fa-eye" aria-hidden="true" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination" v-if="!modal">
      <div class="col" style="text-align: center;">
        <button
          type="button"
          class="btn btn-default"
          @click="pagination.current = 0"
          name="button"
        >
          Primeira
        </button>
        <button
          type="button"
          class="btn btn-default"
          @click="pagination.current -= 1"
          name="button"
        >
          <i class="fa fa-backward" />
        </button>
        <span
          >Página:<strong> {{ pagination.current + 1 }} </strong></span
        >
        <button
          type="button"
          class="btn btn-default"
          @click="pagination.current += 1"
          name="button"
        >
          <i class="fa fa-forward" />
        </button>
        <button
          type="button"
          class="btn btn-default"
          @click="pagination.current = pagination.numberPages"
          name="button"
        >
          Última
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";
export default {
  data() {
    return {
      initialYearSearch: 1900,
      endYearSearch: 2050,
      pagination: {
        current: 0,
        numberPages: 0,
        numberRegisterForPage: 5
      },
      bookList: [],
      mainList: [],
      modal: false,
      columns: ["type", "idioma", "peso", "comprimento", "largura", "altura"],
      sort: {
        key: null
      },
      search: ""
    };
  },
  methods: {
    view(id) {
      this.modal = !this.modal;
      this.$router.push({ name: "bookView", params: { id: id } });
    },
    edit(id) {
      this.modal = !this.modal;
      this.$router.push({ name: "bookEdit", params: { id: id } });
    },
    async remove(id) {
      let option = await this.$modal.show({
        title: "Danger",
        message:
          "Do you sure that want delete this book? This operation is irreversible!",
        alert: "danger"
      });
      if (option) {
        this.$http
          .delete(this.$endPoint.getUrlByName("book") + "/" + id)
          .then(response => {
            this.$modal.show({
              title: "Success",
              message: "book was deleted with successfull!",
              alert: "info"
            });
            this.getResources();
          })
          .catch(err => {
            this.$modal.show({
              title: "Error",
              message: "Server response with error" + error,
              alert: "danger",
              type: 1
            });
          });
      }
    },
    getResources() {
      this.$http.get(this.$endPoint.getUrlByName("book")).then(response => {
        this.mainList = response.data;
      });
    },
    sortBy(param) {
      if (this.sort.key == param) {
        this.mainList.reverse();
        return;
      }

      this.mainList.sort((a, b) => {
        if (a[param] < b[param]) return -1;
        if (a[param] > b[param]) return 1;
        return 0;
      });
      this.sort.key = param;
    },
    searchFilter() {

      if ( this.initialYearSearch != '' && this.endYearSearch != '') {
        this.bookList = this.mainList.filter(object =>
          object.ano >= this.initialYearSearch && object.ano <= this.endYearSearch
        );
      } else {
        this.bookList = this.mainList.filter(object =>
          JSON.stringify(object).includes(text)
        );
      }
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.modal = toDepth < fromDepth ? false : true;
      if (!this.modal) {
        this.getResources();
      }
    },
    "pagination.current": function(value) {
      this.pagination.numberPages = parseInt(
        this.mainList.length / this.pagination.numberRegisterForPage
      );
      if (value < 1) {
        this.pagination.current = 0;
      }
      if (value > this.pagination.numberPages) {
        this.pagination.current = this.pagination.numberPages;
      }
      this.bookList = this.mainList.slice(
        this.pagination.current * this.pagination.numberRegisterForPage,
        this.pagination.current * this.pagination.numberRegisterForPage +
          this.pagination.numberRegisterForPage
      );
    },
    "pagination.numberRegisterForPage": function() {
      this.pagination.current = -1;
    },
    mainList: function(value) {
      this.bookList = value.slice(
        this.pagination.current * this.pagination.numberRegisterForPage,
        this.pagination.current * this.pagination.numberRegisterForPage +
          this.pagination.numberRegisterForPage
      );
    },
    search: function(text) {
      this.bookList = this.mainList.filter(object =>
        JSON.stringify(object).includes(text)
      );
    }
  },
  created() {
    this.$endPoint.addUrl(
      "https://vuejs-resource-tutorial.firebaseio.com/data/.json",
      "http://localhost:8081/books",
      "book"
    );

    eventBus.$on("modalHide", () => {
      this.modal = true;
    });

    this.getResources();

    this.bookList = this.mainList.slice(0, 10);
    this.pagination.numberPages = parseInt(
      this.mainList.length / this.pagination.numberRegisterForPage
    );
  }
};
</script>

<style lang="css" scoped>
.options-button {
  float: right;
  min-width: 100px;
  width: 100px;
  margin-right: 23px;

}
.create-button {
  float: right;
  min-width: 100px;
  width: 130px;
  margin: 8px;
}
.options-th {
  float: right;
  width: 80px;
}
table tbody tr:hover {
  background-color: #ccc;
}
th{
  text-transform: capitalize;
}
.table-container {
  overflow-x: auto;
  white-space: nowrap;
}
.table-container table {
  width: 100%;
}
.total-pages {
  float: right;
}
.pagination {
  vertical-align: center;
}
.pagination button {
  margin: 2px;
}
li {
  display: inline;
  text-transform: capitalize;
  font-size: 0.8em;
}
.breadcrumbs {
  background-color: white;
}
.breadcrumbs-active {
  text-decoration: underline;
  color: black;
  font-weight: bold;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
}
.search {
  padding-left: 2.378rem;
}

@media screen and (max-width: 780px) {
  div.hidden {
    display: none;
  }
}
</style>
