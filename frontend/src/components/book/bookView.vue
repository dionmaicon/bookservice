<template>
  <div class="view">
    <div class="breadcrumbs">
      <nav style="display: inline">
        <li class="liTitle">
          <router-link :to="{ name: 'home', params: {} }">
            Home
          </router-link>
        </li>
        /
        <li class="liTitle">
          <router-link :to="{ name: 'book', params: {} }">
            book
          </router-link>
        </li>
        /
        <li class="liTitle">
          <router-link
            class="breadcrumbs-active"
            :to="{ name: 'bookView', params: { id: id } }"
          >
            view book
          </router-link>
        </li>
      </nav>
    </div>
    <div class="row">
      <div class="card" style="width: 100%;">
        <div class="card-header">
          Detalhes
        </div>
        <ul class="list-group list-group-flush">
          <li v-if="book.titulo" class="list-group-item">
            <span class="liTitle"> <strong> titulo: </strong> </span>{{ book.titulo }}
          </li>
          <li v-if="book.ISBN" class="list-group-item">
            <span class="liTitle"> <strong> ISBN: </strong> </span>{{ book.ISBN }}
          </li>
          <li v-if="book.autor" class="list-group-item">
            <span class="liTitle"> <strong> autor: </strong> </span>{{ book.autor }}
          </li>
          <li v-if="book.editora" class="list-group-item">
            <span class="liTitle"> <strong> editora: </strong> </span>{{ book.editora }}
          </li>
          <li v-if="book.ano" class="list-group-item">
            <span class="liTitle"> <strong> ano: </strong> </span>{{ book.ano }}
          </li>
          <li v-if="book.idioma" class="list-group-item">
            <span class="liTitle"> <strong> idioma: </strong> </span>{{ book.idioma }}
          </li>
          <li v-if="book.peso" class="list-group-item">
            <span class="liTitle"> <strong> peso: </strong> </span>{{ book.peso }} gramas
          </li>
          <li v-if="book.dimensoes.comprimento" class="list-group-item">
            <span class="liTitle"> <strong> comprimento: </strong> </span>{{ book.dimensoes.comprimento }} cm
          </li>
          <li v-if="book.dimensoes.largura" class="list-group-item">
            <span class="liTitle"> <strong> largura: </strong> </span>{{ book.dimensoes.largura }} cm
          </li>
          <li v-if="book.dimensoes.altura" class="list-group-item">
            <span class="liTitle"> <strong> altura: </strong> </span>{{ book.dimensoes.altura }} cm
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <button @click="edit(id)"
class="btn btn-warning ">
          Editar
        </button>
        <button
          type="button"
          @click="goBack()"
          name="button"
          class="btn btn-default"
        >
          Voltar
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
      id: "",
      book: {
        dimensoes: {}
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    edit(id) {
      this.$router.push({ name: "bookEdit", params: { id: id } });
    },
    setInstace() {
      this.$http
        .get(this.$endPoint.getUrlByName("book") + "/" + this.id)
        .then(response => {
          this.book = response.data;
        });
    }
  },
  created() {
    this.id = this.$route.params.id;
    eventBus.changeModalState();
    this.setInstace();
  }
};
</script>

<style lang="css" scoped>
h1 {
  text-transform: capitalize;
  text-align: center;
}
li {
  display: inline;

  font-size: 0.8em;
}
.liTitle {
text-transform: capitalize;
}
.breadcrumbs {
  background-color: white;
}
.breadcrumbs-active {
  text-decoration: underline;
  color: black;
  font-weight: bold;
}
button {
  margin: 8px;
  width: 30%;
  float: right;
}
</style>
