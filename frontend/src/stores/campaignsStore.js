import { defineStore } from 'pinia'
import axios from 'axios'
const apiGetCampaigns = "http://localhost:3000/api/campaigns"

export const useCampaignsStore = defineStore({
  id: 'campaigns',
  state: () => ({
    campaigns: []
  }),
  actions: {
    change(newCampaigns) {
      this.campaigns = newCampaigns;
    },
    loadDataFromBackend(){
      axios
        .get(apiGetCampaigns)
        .then((response) => {
            this.campaigns = response.data.campaigns
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
  }
})
