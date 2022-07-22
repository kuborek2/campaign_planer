import { defineStore } from 'pinia'

export const useCurrentCampaignStore = defineStore({
  id: 'currentCampaign',
  state: () => ({
    campaignId: -1
  }),
  actions: {
    change(newCampaignId) {
      this.campaignId = newCampaignId;
    }
  }
})
