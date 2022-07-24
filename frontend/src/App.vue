<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <header>
      <Header />
    </header>
    <RouterView />
    <Footer/>
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
  margin-bottom: 25px;
}
</style>

