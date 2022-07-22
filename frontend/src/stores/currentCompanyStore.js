import { defineStore } from 'pinia'

export const useCurrentCompanyStore = defineStore({
  id: 'currentComapny',
  state: () => ({
    companyId: -1
  }),
  getters: {
    getCompanyId: (state) => state.companyId
  },
  actions: {
    change(newCompanyId) {
      this.companyId = newCompanyId;
    }
  }
})
