import { defineStore } from 'pinia'

export const useTagsStore = defineStore({
  id: 'tags',
  state: () => ({
    tags: []
  }),
  actions: {
    change(newTags) {
      this.tags = newTags;
    }
  }
})
