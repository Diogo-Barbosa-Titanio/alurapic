<template>
  <div>
    <h1 v-meu-transform class="center">{{titulo}}</h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>
    <input type="search" class="filtro" v-on:input="filtro = $event.target.value"
           placeholder="filtre por parte do título">
    {{filtro}}
    <ul class="lista-fotos">
      <li v-for="foto of fotosComFiltro" class="lista-fotos-item">

        <meu-painel v-bind:titulo="foto.titulo">
          <imagem-reponsiva v-meu-transform:scale.animate="1.2" v-bind:url="foto.url" v-bind:titulo="foto.titulo" />
          <router-link :to="{name: 'altera', params: {id: foto._id}}">
            <meu-botao tipo="button" rotulo="ALTERAR" estilo="padrao" />
          </router-link>
          <meu-botao tipo="button" rotulo="REMOVER" @botaoAtivado="remove(foto)" :confirmacao="false" estilo="perigo" />
        </meu-painel>

      </li>
    </ul>

  </div>
</template>

<script>
  import Painel from './../shared/painel/Painel.vue';
  import ImagemResponsiva from "./../shared/imagem-responsiva/ImagemResponsiva.vue";
  import Botao from './../shared/botao/Botao.vue';
  import FotoService from "../../domain/foto/FotoService";


  export default {
    components: {
      'meu-painel': Painel,
      'imagem-reponsiva': ImagemResponsiva,
      'meu-botao': Botao
    },
    data() {
      return {
        titulo: 'Alurapic',
        fotos: [],
        filtro: '',
        mensagem: ''
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
    methods: {
       remove(foto) {

        /* this.resource.delete({id: foto._id})
                      .then(()=> {
                         let indice = this.fotos.indexOf(foto);

                         this.fotos.splice(indice, 1);

                         this.mensagem = 'Foto removida com sucesso'
                       })
                       .catch( err => {
                           console.log(err);
                           this.mensagem = 'Não foi possível remover a foto';
                       });*/

               this.service
                   .apaga(foto._id)
                   .then(()=> {
                     let indice = this.fotos.indexOf(foto);

                     this.fotos.splice(indice, 1);

                     this.mensagem = 'Foto removida com sucesso'
                   }).catch( err => {
                     console.log(err);
                     this.mensagem = err.message;
                   });

       }
    },
    created() {

      this.service = new FotoService(this.$http);
      this.service
          .lista()
          .then(fotos => this.fotos = fotos)
          .catch(error => {
            this.mensagem = error.message;
          });

    /*  this.resource = this.$resource('v1/fotos/{/id}');
      this.resource.query()
              .then(response => response.data)
              .then(fotos => this.fotos = fotos)
              .catch(error => console.log(error));*/

     /* let promise = this.$http.get('v1/fotos')
        .then(response => response.data)
        .then(fotos => this.fotos = fotos)
        .catch(error => console.log(error));*/
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
