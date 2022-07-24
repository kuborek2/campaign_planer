import { defineStore } from 'pinia'

export const useTownsStore = defineStore({
  id: 'towns',
  state: () => ({
    towns: []
  }),
  actions: {
    change(newTowns) {
      this.towns = newTowns;
    }
  }
})
