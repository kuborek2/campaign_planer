<script setup>
    import { useActionStore } from "../stores/currentActionStore.js"

    const actionStore = useActionStore();

    const changeAction = () => {
        actionStore.change("ADD_ITEM");
    }
</script>

<template>
    <div class="content">
        <div class="item">
            <div class="details">
                <RouterLink to="/campaign" @click="changeAction"><button>Add Campaign</button></RouterLink>
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
    align-items: center;
    justify-content: center;
    padding: 5px;
}

button {
    border: none;
    width: 150px;
    height: 50px;
    background-color: #E0E0E0;
    color: black;
}

a:hover > button {
    background-color: #E0E0E0;
    color: white;
}
</style>
