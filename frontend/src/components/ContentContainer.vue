<script setup>
    import CompanyItem from "./CompanyItem.vue";
    import ProductItem from "./ProductItem.vue";
    import CampaignItem from "./CampaignItem.vue";
    import { storeToRefs } from "pinia";
    import { useCurrentCompanyStore } from "../stores/currentCompanyStore.js"
    import { useCurrentProductStore } from "../stores/currentProductStore.js"
    import { useCompaniesStore } from "../stores/companiesStore.js"
    import { useCampaignsStore } from "../stores/campaignsStore.js"
    import AddCampaignItem from "./AddCampaignItem.vue";
    import { inject, onMounted } from 'vue'
    import axios from 'axios'

    // Stores
    const companyStore = useCurrentCompanyStore();
    const productStore = useCurrentProductStore();
    const companiesStore = useCompaniesStore();
    const campaignsStore = useCampaignsStore();
    const apiGetCompanies = "http://localhost:3000/api/companies"
    const apiGetCampaigns = "http://localhost:3000/api/campaigns"
    const { companies } = storeToRefs(companiesStore);
    const { campaigns } = storeToRefs(campaignsStore);

    onMounted(() => {
        requestCompanies();
        requestCampaigns();
    })

    //** Data requests */
    const requestCompanies = () => {
        axios
            .get(apiGetCompanies)
            .then((response) => {
                companiesStore.change(response.data.companies)
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }

    const requestCampaigns = () => {
        axios
            .get(apiGetCampaigns)
            .then((response) => {
                campaignsStore.change(response.data.campaigns)
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

</script>

<template>
    <div class="container">
        <div class="companies" >
            <CompanyItem v-for="company in companies" v-bind:key="company.company_id" :company-id="company.company_id">
                <template #name>
                    {{ company.name }}
                </template>
                <template #budget>
                    {{ company.fund_balance }}
                </template>
            </CompanyItem>
        </div>
        <div class="products">
            <template v-for="company in companies">
                <ProductItem 
                    v-for="product in company.products_list" 
                    v-bind:key="product.product_id" 
                    :id="company.company_id" 
                    v-if="companyStore.companyId === company.company_id"
                    :product-id="product.product_id">
                    <template #name>
                        {{ product.name }}
                    </template>
                </ProductItem>
            </template>
        </div>
        <div class="campaigns">
            <template v-for="campaign in campaigns">
                <CampaignItem 
                    v-if="companyStore.companyId === campaign.company_id && productStore.productId === campaign.product_id"
                    v-bind:key="campaign.campaign_id"
                    :id="campaign.campaign_id"
                    :campaign-id="campaign.campaign_id"
                    >
                    <template #name>
                        {{campaign.campaign_name}}
                    </template>
                </CampaignItem>
            </template>
            <AddCampaignItem/>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
    "companies products campaigns";
}

.companies {
    grid-area: companies;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.products {
    grid-area: products;
}

.campaigns {
    grid-area: campaigns;
}
</style>