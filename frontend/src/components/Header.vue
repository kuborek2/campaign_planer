<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="container">
        <div class="title">
            <RouterLink  to="/"><span>Campaign planer</span></RouterLink>
        </div>
        <div class="separator"/>
        <div class="nav">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.container {
    padding: 0 2vw;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 250px auto 350px;
    grid-template-rows: auto;
    max-height: 100px;
    overflow: hidden;
    background-color: #E0E0E0;
}

.title {
    font-size: 32px;
    height: 100%;
    text-align: center;
    line-height: 100px;
}

.nav {
    height: 100%;
    line-height: 100px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.container > a {
    align-self: flex-end;
    font-size: 50px;
}



</style>