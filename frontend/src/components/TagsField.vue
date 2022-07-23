<template>
  <div class="tags-input-container">
    <div>
        <div class="tag" v-for="(tag, index) in tags" :key="'tag'+index">
        <span >{{ tag }}</span>
        <span @click="removeTag(index)"><img class="icon" src="../assets/subtract--alt.svg"></span>
        </div>
    </div>
    <!-- <input v-model="tagValue" @keyup.enter="addTag"> -->
    <SimpleTypeahead
        placeholder="Start writing..."
        :items="['One','Two','Three']"
        :minInputLength="1"
        ref="tagValue"
        @selectItem="addTag"
    >
    </SimpleTypeahead>
  </div>

</template>

<script setup>
    import { ref } from 'vue';
    import { useTagsStore } from "../stores/tagsStore.js"
    import SimpleTypeahead from 'vue3-simple-typeahead';
    import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'; //Optional default CSS

    const tagValue = ref('')
    const tags = ref([])
    const tagsStore = useTagsStore();

    const addTag = () => {
        if(!tagValue.value.input == '')
        tags.value.push(tagValue.value.input);
        tagsStore.change(tags.value);
        tagValue.value.input = '';
    }

    const removeTag = (index) => {
        tags.value.splice(index, 1);
    }

</script>

<style lang="scss" scoped>
  .tags-input-container {
    display: flex;
    flex-direction: column;
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