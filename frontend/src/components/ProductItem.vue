<script setup>
    import ArrowIcon from '@carbon/icons-vue/es/arrow--right/32.js'
    import { useCurrentProductStore } from "../stores/currentProductStore.js"
    const productStore = useCurrentProductStore();
        defineProps({
        productId: Number
    })
</script>

<template>
    <div class="content">
        <div class="item">
            <h2>
                <slot name="name"></slot>
            </h2>
        </div>
        <div class="button">
            <ArrowIcon @click="productStore.change(productId)" class="icon"/>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: row;
}
.item {
    width: calc(75% - 25px);
    height: 75px;
    margin: 10px 0px 10px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 5px;
    border: 1px solid #E0E0E0;
}
.button {
    width: calc(25% - 25px);
    height: 75px;
    margin: 10px 25px 10px 0px;
    border: 1px solid #E0E0E0;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>