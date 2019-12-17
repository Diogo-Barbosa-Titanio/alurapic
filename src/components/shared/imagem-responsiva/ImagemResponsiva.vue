<template>
  <img v-bind:src="url" v-bind:alt="titulo" class="imagem-responsiva">
</template>

<script>
  export default {
    name: "ImagemResponsiva",
    props: ['url','titulo']
  }
</script>

<style scoped>

  .imagem-responsiva {
    width: 100%;
  }

</style>
