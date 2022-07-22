import { defineStore } from 'pinia'

export const useCampaignsStore = defineStore({
  id: 'campaigns',
  state: () => ({
    campaigns: []
  }),
  actions: {
    change(newCampaigns) {
      this.campaigns = newCampaigns;
    }
  }
})
