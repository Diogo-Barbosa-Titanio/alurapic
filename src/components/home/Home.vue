<template>
  <div>
    <h1 class="center">{{titulo}}</h1>
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value"
           placeholder="filtre por parte do título">
    {{filtro}}
    <ul class="lista-fotos">
      <li v-for="foto of fotosComFiltro" class="lista-fotos-item">

        <meu-painel v-bind:titulo="foto.titulo">
          <imagem-reponsiva v-bind:url="foto.url" v-bind:titulo="foto.titulo"></imagem-reponsiva>
        </meu-painel>

      </li>
    </ul>

  </div>
</template>

<script>
  import Painel from './../shared/painel/Painel.vue';
  import ImagemResponsiva from "./../shared/imagem-responsiva/ImagemResponsiva.vue";

  export default {
    components: {
      'meu-painel': Painel,
      'imagem-reponsiva': ImagemResponsiva
    },
    data() {
      return {
        titulo: 'Alurapic',
        fotos: [],
        filtro: ''
      }
    },
    computed: {
      fotosComFiltro() {
        if (this.filtro) {

          let exp = new RegExp(this.filtro.trim(), 'i');
          return this.fotos.filter(foto => exp.test(foto.titulo));

        } else {
          return this.fotos;
        }
      }
    },
    created() {
      let promise = this.$http.get('http://localhost:3000/v1/fotos')
        .then(response => response.data)
        .then(fotos => this.fotos = fotos)
        .catch(error => console.log(error));
    }
  }
</script>

<style>
  .titulo {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }

</style>
