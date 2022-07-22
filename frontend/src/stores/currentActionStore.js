import { defineStore } from 'pinia'

export const useCompaniesStore = defineStore({
  id: 'action',
  state: () => ({
        action: ""
  }),
  actions: {
    change(newAction) {
        const avaibleActions = ["GET_INFO", "ADD_ITEM", "PUT_ITEM"]
        if( avaibleActions.includes(newAction) )
        this.action = newAction;
    }
  }
})
