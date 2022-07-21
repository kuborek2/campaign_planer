<script setup>
</script>

<template>
    <div class="container">
        <div class="item">
            <h2>
                <slot name="name"></slot>
            </h2>
            <div class="details">
                <h4>
                    <slot name="budget"></slot>
                </h4>
            </div>
        </div>
        <div class="button">
            gfdgfd
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
}
.item {
    width: calc(75% - 25px);
    height: 75px;
    margin: 25px 0px 25px 25px;
    display: gird;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
    padding: 5px;
    border: 1px solid #E0E0E0;
}
.button {
    width: calc(25% - 25px);
    height: 75px;
    margin: 25px 25px 25px 0px;
    border: 1px solid #E0E0E0;
}
</style>