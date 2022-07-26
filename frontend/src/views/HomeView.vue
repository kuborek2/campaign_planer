<script setup>
  import ContentContainer from '../components/ContentContainer.vue';
  import { useTagsStore } from "../stores/tagsStore.js"
  import { useTownsStore } from "../stores/townsStore.js"
  import { onMounted } from 'vue';
  import axios from 'axios'

  const tagsStore = useTagsStore();
  const townsStore = useTownsStore();

  const apiGetTags = "https://nodejs-server-jk.herokuapp.com/api/tags"
  const apiGetTowns = "https://nodejs-server-jk.herokuapp.com/api/towns"

  onMounted(() => {
    requestTags();
    requestTowns();
  })

  const requestTags = () => {
        axios
            .get(apiGetTags)
            .then((response) => {
                tagsStore.setPredefinedTags(response.data.tags)
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }

  const requestTowns = () => {
      axios
          .get(apiGetTowns)
          .then((response) => {
              townsStore.change(response.data.towns)
          })
          .catch(function (error) {
              if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              } else if (error.request) {
                  console.log(error.request);
              } else {
                  console.log('Error', error.message);
              }
              console.log(error.config);
          })
  }

</script>

<template>
  <main>
    <ContentContainer/>
  </main>
</template>

<style>
</style>
