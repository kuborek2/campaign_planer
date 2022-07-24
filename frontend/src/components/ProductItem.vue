<script setup>
    import ArrowIcon from '@carbon/icons-vue/es/arrow--right/32.js'
    import { useCurrentProductStore } from "../stores/currentProductStore.js"
    import { ref, onUpdated } from 'vue';

    const productStore = useCurrentProductStore();

    const props = defineProps(['productId'])

    const highlightRef = ref(false);

    productStore.$subscribe((mutation, state) => {
        if( state.productId === props.productId ){
            highlightRef.value = true
        } else {
            highlightRef.value = false
        }
    })

    onUpdated(() => {
        if( productStore.productId === props.productId ){
            highlightRef.value = true
        } else {
            highlightRef.value = false
        }
    })
    
</script>

<template>
    <div class="content">
        <div class="item" :class="{highlight: highlightRef}">
            <h2>
                <slot name="name"></slot>
            </h2>
        </div>
        <div class="button">
            <ArrowIcon @click="productStore.change(props.productId)" class="icon"/>
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
    border: 1px solid black;
    background-color: #7FD1AE;
}
.button {
    width: calc(25% - 25px);
    height: 75px;
    margin: 10px 25px 10px 0px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(127,209,174);
    background: linear-gradient(90deg, rgba(127,209,174,1) 35%, rgba(255,255,255,1) 100%);
}

.highlight {
    background-color: #7DC9FD;
}

</style>