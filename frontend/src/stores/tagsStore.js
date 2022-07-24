import { defineStore } from 'pinia'

export const useTagsStore = defineStore({
  id: 'tags',
  state: () => ({
    predefinedTags: [],
    tags: []
  }),
  actions: {
    change(newTags) {
      this.tags = newTags;
    },
    setPredefinedTags(newPredefinedTags){
      this.predefinedTags = newPredefinedTags;
    }
  }
})
