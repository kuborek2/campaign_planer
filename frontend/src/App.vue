<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Header from '@/components/Header.vue';
</script>

<template>
    <header>
      <Header />
    </header>
      <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div> -->


    <RouterView />
</template>


<style>

#app {
  width: 100vw;
  height: 100vh;
  display: flex !important;
  flex-direction: column;
  padding: 0 2vw !important;
}

header {
  align-self: flex-start;
  width: 100%;
  height: 100px;
  max-height: 100px;
}
</style>
