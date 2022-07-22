<script setup>
    import ArrowIcon from '@carbon/icons-vue/es/arrow--right/32.js'
    import { useCurrentCompanyStore } from "../stores/currentCompanyStore.js"
    const companyStore = useCurrentCompanyStore();
    defineProps({
        companyId: Number
    })
</script>

<template>
    <div class="content">
        <div class="item">
            <h2>
                <slot name="name"></slot>
            </h2>
            <div class="details">
                <h4>
                    Total Budget: <slot name="budget"></slot> $
                </h4>
            </div>
        </div>
        <div class="button">
            <ArrowIcon @click="companyStore.change(companyId)" class="icon"/>
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
    display: gird;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
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

</style>