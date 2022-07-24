<script setup>
    import { ref } from 'vue';
    import { useCurrentCompanyStore } from "../stores/currentCompanyStore.js"
    import { useCurrentProductStore } from "../stores/currentProductStore.js"
    import { useCurrentCampaignStore } from "../stores/currentCampaignStore.js"
    import { useCampaignsStore } from "../stores/campaignsStore.js"
    import { useCompaniesStore } from "../stores/companiesStore.js"
    import { onMounted, onUpdated } from 'vue'

    const currentCampaignStore = useCurrentCampaignStore();
    const currentCompanyStore = useCurrentCompanyStore();
    const currentProductStore = useCurrentProductStore();
    const campaignsStore = useCampaignsStore();
    const companiesStore = useCompaniesStore();
    let currnetCampaignData = ref({})
    let currnetCompanyData = ref({})
    let currnetProductData = ref("")

    onMounted(()  =>  {
        loadCurrentData();
    })

    onUpdated(() => {
        loadCurrentData();
    })
    
    const loadCurrentData = () => {
        // looking for campaign
        let resultCampaign = campaignsStore.campaigns.filter(obj => {
            return obj.campaign_id === currentCampaignStore.campaignId
        })
        if( !!resultCampaign[0] )
            currnetCampaignData.value = resultCampaign[0];
        // looking for company
        let resultCompany = companiesStore.companies.filter(obj => {
            return obj.company_id === currentCompanyStore.companyId
        })
        if( !!resultCompany[0] ){
            currnetCompanyData.value = resultCompany[0];
            // looking for product
            let resultProduct = resultCompany[0].products_list.filter((obj) => {
                return obj.product_id === currentProductStore.productId
            })
            if( !!resultProduct[0] )
                currnetProductData.value = resultProduct[0];
        }
    }
</script>

<template>
    <div class="content">
        <h2>Campaign name: {{currnetCampaignData.campaign_name}}</h2>
        <div class="separator"></div>
        <br/>
        <h4>Product name: {{currnetProductData.name}}</h4>
        <h4>Company name: {{currnetCompanyData.name}}</h4>
        <h4>Big amount: {{currnetCampaignData.bid_amount}}</h4>
        <h4>Town: {{currnetCampaignData.town}}</h4>
        <h4>Radius (km): {{currnetCampaignData.radius}}</h4>
        <div class="innerBox">
            <div>
                <h4>Tags: </h4>
                <ul>
                    <li v-for="tag in currnetCampaignData.keywords">#{{tag}}</li>
                </ul>
            </div>
            <div>
                <h4>Status: </h4>
                <div class="status" :class="{active: currnetCampaignData.status}">{{currnetCampaignData.status ? "ON" : "OFF"}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 4px solid rgba(127,209,174);
    padding: 10px;
    height: 100%;
}

div > h4, div {
    margin-bottom: 10px;
}

.separator {
    width: 75%;
    height: 0px;
    border: 1px solid black;
}

.innerBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
}

.innerBox > div > h4 {
    margin-bottom: 0px;
}

.status {
    width: 50px;
    height: 25px;
    border: 2px solid black;
    border-radius: 10px;
    margin: 10px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 12px;
}

.active {
    background-color: green;
}
</style>