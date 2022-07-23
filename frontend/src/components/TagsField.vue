<template>
  <div class="tags-input-container">
    <div class="tag" v-for="(tag, index) in tags" :key="'tag'+index">
      <span >{{ tag }}</span>
      <span @click="removeTag(index)"><img class="icon" src="../assets/subtract--alt.svg"></span>
    </div>
    <input v-model="tagValue" @keyup.enter="addTag">
  </div>
</template>

<script setup>
    import { ref, onUpdated } from 'vue';
    import { useTagsStore } from "../stores/tagsStore.js"

    const tagValue = ref('')
    const tags = ref([])
    const activeTag = ref(null)
    const tagsStore = useTagsStore();

    const addTag = () => {
        if(!tagValue == '')
        tags.value.push(tagValue.value);
        tagsStore.change(tags.value);
        tagValue.value = '';
    }

    const removeTag = (index) => {
        tags.value.splice(index, 1);
    }
</script>

<style lang="scss" scoped>
  .tags-input-container {
    width: 75%;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    
    input {
      width: 100%;
      padding: 0;
      margin: 0;
      border: 0;
      outline: none;
      background-color: transparent;
      font-size: 1rem;
    }
    .icon {
        height: 1.3rem;
    }
    .tag {
      float: left;
      padding: 3px 5px;
      display: flex;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background-color: #57c340;
        border-radius: 5px;
      } 
      span:first-child {
        margin-right: 8px;
      }  
      svg {
        color: #666;
        &:hover {
          color: #333;
        }
      }     
    }
  }
</style>