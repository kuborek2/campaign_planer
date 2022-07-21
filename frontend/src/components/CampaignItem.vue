<script setup>
    import ArrowIcon from '@carbon/icons-vue/es/arrow--right/32.js'
</script>

<template>
    <div class="content">
        <div class="item">
            <h2>
                <slot name="name"></slot>
            </h2>
            <div class="details">
                <button>About</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: row;
}
.item {
    width: 100%;
    height: 75px;
    margin: 10px 25px 10px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border: 1px solid #E0E0E0;
}

</style>