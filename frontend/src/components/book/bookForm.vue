<template>
  <div id="bookForm" class="form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="titulo">titulo</label><br >
        <input
          id="titulo"
          class="form-control"
          type="text"
          required="true"
          v-model="book.titulo"
        >
      </div>
      <div class="form-group">
        <label for="ISBN">ISBN</label><br >
        <input
          id="ISBN"
          class="form-control"
          type="text"
          required="true"
          minlength="10"
          maxlength="13"
          v-model="book.ISBN"
        >
      </div>
      <div class="form-group">
        <label for="autor">autor</label><br >
        <input
          id="autor"
          class="form-control"
          type="text"
          required="true"
          v-model="book.autor"
        >
      </div>
      <div class="form-group">
        <label for="editora">editora</label><br >
        <input
          id="editora"
          class="form-control"
          type="text"
          required="true"
          v-model="book.editora"
        >
      </div>
      <div class="form-group">
        <label for="ano">ano</label><br >
        <input
          id="ano"
          class="form-control"
          type="number"
          required="true"
          v-model="book.ano"
        >
      </div>
      <div class="form-group">
        <label for="idioma">idioma</label><br >
        <input
          id="idioma"
          class="form-control"
          type="text"
          v-model="book.idioma"
        >
      </div>
      <div class="form-group">
        <label for="peso">peso (G)</label><br >
        <input
          id="peso"
          class="form-control"
          type="number"
          step="0.1"
          v-model="book.peso"
        >
      </div>
      <div class="form-group">
        <label for="comprimento">comprimento</label><br >
        <input
          id="comprimento"
          class="form-control"
          type="number"
          step="0.1"
          v-model="book.comprimento"
        >
      </div>
      <div class="form-group">
        <label for="largura">largura</label><br >
        <input
          id="largura"
          class="form-control"
          type="number"
          step="0.1"
          v-model="book.largura"
        >
      </div>
      <div class="form-group">
        <label for="altura">altura</label><br >
        <input
          id="altura"
          class="form-control"
          type="number"
          step="0.1"
          v-model="book.altura"
        >
      </div>

      <button
        v-if="id"
        type="submit"
        name="buttonUpdate"
        class="btn btn-primary "
      >
        Atualizar
      </button>
      <button v-else type="submit" name="buttonCreate" class="btn btn-success ">
        Salvar
      </button>
      <button
        type="button"
        @click="goBack"
        name="button"
        class="btn btn-default"
      >
        Voltar
      </button>
    </form>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {
  props: ["id"],
  data() {
    return {
      book: {
        titulo: "",
        ISBN: "",
        autor: "",
        editora: "",
        ano: "",
        idioma: "",
        peso: "",
        comprimento: "",
        largura: "",
        altura: ""
      }
    };
  },
  created() {
    this.$endPoint.addUrl(
      "https://vuejs-resource-tutorial.firebaseio.com/data/.json",
      "http://localhost:8081/books",
      "book"
    );
    eventBus.changeModalState();
    this.setInstace();
  },
  methods: {
    async handleSubmit() {
      if (this.id) {
        //Implements here your submit method UPDATE
        /**
         * type equals 0 means that this modal disappear automatically after 1500 milliseconds
         * type equals 1 means that this modal  will have button close without timer
         * type equals 2 means that this modal will have button close and ok without timer
         */
        let option = await this.$modal.show({
          title: "Warning",
          message: "Deseja completar está atualização?",
          alert: "warning",
          type: 2
        });
        if (option) {
          let book = this.book;
          //Uncomment and replace property for you select property
          //book.property = this.book.property.selected;

          this.$http
            .put(this.$endPoint.getUrlByName("book") + "/" + this.id, book)
            .then(response => {
              if (response.status == 200) {
                this.$modal.show({
                  title: "Success",
                  message: "Livro foi atualizado com sucesso!",
                  alert: "success"
                });
                this.goBack();
              }
            })
            .catch(error => {
              this.$modal.show({
                title: "Error",
                message: "Servidor respondeu com erro: " + error,
                alert: "danger",
                type: 1
              });
            });
        }
        return;
      } else {
        //Implements here your submit method CREATE
        let option = await this.$modal.show({
          title: "Warning",
          message: "Deseja continuar?",
          alert: "warning",
          type: 2
        });
        if (option) {
          let book = this.book;
          //Uncomment and replace property for you select property
          //book.property = this.book.property.selected;

          this.$http
            .post(this.$endPoint.getUrlByName("book"), book)
            .then(response => {
              if (response.status == 201) {
                this.$modal.show({
                  title: "Success",
                  message: "Livro foi atualizado com sucesso!",
                  alert: "success"
                });
                this.goBack();
              }
            })
            .catch(error => {
              this.$modal.show({
                title: "Error",
                message: "Servidor respondeu com erro: " + error,
                alert: "danger",
                type: 1
              });
            });
        }
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    setInstace() {
      if (this.id) {
        this.$http
          .get(this.$endPoint.getUrlByName("book") + "/" + this.id)
          .then(response => {
            let instance = response.data;
            for (var prop in instance) {
              if (
                instance.hasOwnProperty(prop) &&
                this.book.hasOwnProperty(prop)
              ) {
                //Uncomment  for select property
                //if(prop == "property_selected"){
                //  this.book[prop].selected = instance[prop];
                //  continue;
                //}
                this.book[prop] = instance[prop];
              }
            }
          });
      }
    }
  },
  watch: {
    "book.ISBN": function(text){
      this.book.ISBN = text.replace(/[^0-9\.]+/g, "");
    }
  }
};
</script>
<style lang="css" scoped>
label {
  text-transform: capitalize;
}
button {
  margin: 8px;
  width: 30%;
  float: right;
}
form {
  overflow: hidden;
}
</style>
