<template>
  <div class="bookEdit">
    <div class="breadcrumbs">
      <nav style="display: inline">
        <li>
          <router-link :to="{ name: 'home', params: {} }">
            Home
          </router-link>
        </li>
        /
        <li>
          <router-link :to="{ name: 'book', params: {} }">
            book
          </router-link>
        </li>
        /
        <li>
          <router-link
            class="breadcrumbs-active"
            :to="{ name: 'bookEdit', params: { id: id } }"
          >
            edit book
          </router-link>
        </li>
      </nav>
    </div>
    <h1>Editar Livro</h1>
    <book-form :id="id" />
  </div>
</template>

<script>
import bookForm from "./bookForm.vue";

export default {
  name: "Book",
  data() {
    return {
      id: "Teste"
    };
  },
  components: {
    bookForm
  },
  created() {
    this.id = this.$route.params.id;
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
</style>
