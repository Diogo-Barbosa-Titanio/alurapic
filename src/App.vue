<template>
  <div class="container">
    <meu-menu :rotas="route"></meu-menu>
    <transition name="pagina-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {routes} from './routes';
  import Menu from "./components/shared/menu/Menu";

  export default {
    components: {
      'meu-menu': Menu
    },
    data() {
      return {
        route: routes.filter(route => route.menu)
      }
    }
  }
</script>

<style>

  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }

  .pagina-fade-enter, .pagina-fade-leave-active {
    opacity: 0;
  }

  .pagina-fade-enter-active, .pagina-fade-leave-active {
    transition: opacity 2s;
  }
</style>
