<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="container">
        <h3 class="title">
            <RouterLink to="/">Campaign planer</RouterLink>
        </h3>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </div>
</template>

<style>
.container {
    width: 100%;
    height: 150px;
}
</style>