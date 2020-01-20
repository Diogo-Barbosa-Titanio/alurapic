<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado" v-text="foto.titulo"></h2>
    <h3 v-if="foto._id" class="centralizado">Alterando</h3>
    <h3 v-else class="centralizado">Incluíndo</h3>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="titulo">TÍTULO</label>
        <validation-provider rules="required" v-slot="{ errors }">
          <input name="titulo" v-validate id="titulo" type="text" autocomplete="off" v-model="foto.titulo">
          <span>{{ errors[0] }}</span>
        </validation-provider>
      </div>

      <div class="controle">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="foto.url">
        <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo" />
      </div>

      <div class="controle">
        <label for="descricao">DESCRIÇÃO</label>
        <textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/>
        <router-link :to="{name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
  import Botao from '../shared/botao/Botao.vue';
  import Foto from '../../domain/foto/Foto';
  import FotoService from "../../domain/foto/FotoService";
  import { ValidationProvider, extend } from 'vee-validate';
  import { required } from 'vee-validate/dist/rules';


  extend('required', {
    ...required,
    message: 'This field is required'
  });

  export default {

    components: {

      'imagem-responsiva': ImagemResponsiva,
      'meu-botao': Botao,
      'validation-provider': ValidationProvider
    },

    data() {
        return {
            foto: new Foto(),
            id: this.$route.params.id
        }
    },

    methods: {
      grava() {

        this.service
            .cadastra(this.foto)
            .then(()=> {

              if(this.id) {
                this.$router.push({name: 'home'});
              }

              this.foto = new Foto

             })
            .catch( err => console.log(err));

        /*this.$http
          .post('v1/fotos',this.foto)
          .then(()=> this.foto = new Foto)
          .catch( err => console.log(err));*/
      }
    },

    created() {
      this.service = new FotoService(this.$http);

      if(this.id) {
          this.service
              .busca(this.id)
              .then(foto => this.foto = foto);
      }
    }


  }

</script>
<style scoped>

  .centralizado {
    text-align: center;
  }
  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

  .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .centralizado {
    text-align: center;
  }

</style>
