<template>
  <nav>
    <ul>
      <li v-for="rota of rotas">
        <router-link v-bind:to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "Menu",
    props: ['rotas']
  }
</script>

<style scoped>

</style>
