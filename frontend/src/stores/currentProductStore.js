import { defineStore } from 'pinia'

export const useCurrentProductStore = defineStore({
  id: 'currentProduct',
  state: () => ({
    productId: -1
  }),
  getters: {
    getCompanyId: (state) => state.productId
  },
  actions: {
    change(newProductId) {
      this.productId = newProductId;
    }
  }
})
