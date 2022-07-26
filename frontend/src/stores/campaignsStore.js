import { defineStore } from 'pinia'
import axios from 'axios'
const apiGetCampaigns = "https://nodejs-server-jk.herokuapp.com/api/campaigns"

export const useCampaignsStore = defineStore({
  id: 'campaigns',
  state: () => ({
    campaigns: []
  }),
  actions: {
    change(newCampaigns) {
      this.campaigns = newCampaigns;
    },
    pushItem(item){
      this.campaigns.push(item);
    },
    swapItem(index, item){
      this.campaigns[index] = item;
    },
    deleteItem(campaign_id){
      this.campaigns = arr.filter((ele) => { 
        return ele.campaign_id !== campaign_id; 
    });
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
