import { defineStore } from 'pinia'

export const useCompaniesStore = defineStore({
  id: 'comapnies',
  state: () => ({
    companies: []
  }),
  actions: {
    change(newCompanies) {
      this.companies = newCompanies;
    }
  }
})
