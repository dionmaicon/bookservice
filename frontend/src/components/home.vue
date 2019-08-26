<template>
  <div class="home container">
    <h1>Livros</h1>
    <div id="nav">
      <div>
        <router-link to="/book">
          book
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
#nav {
  text-transform: capitalize;
}
.home {
  min-height: 500px;
}
h1 {
  text-align: center
}
</style>
