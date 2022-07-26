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
    import { inject, onMounted, reactive } from 'vue'
    import axios from 'axios'

    // Stores
    const companyStore = useCurrentCompanyStore();
    const productStore = useCurrentProductStore();
    const companiesStore = useCompaniesStore();
    const campaignsStore = useCampaignsStore();
    const { companies } = storeToRefs(companiesStore);
    const { campaigns } = storeToRefs(campaignsStore);

    onMounted(() => {
        requestCompanies();
        requestCampaigns();
    })

    //** Data requests */
    const requestCompanies = () => {
        companiesStore.loadDataFromBackend();
    }

    const requestCampaigns = () => {
        campaignsStore.loadDataFromBackend();
    }

</script>

<template>
    <div class="container">
        <div class="companies" >
            <h1 class="list-title">Sellers list:</h1>
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
            <h1 class="list-title">Products list:</h1>
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
            <h1 class="list-title">Camapigns List list:</h1>
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

.list-title{
    display: block;
    margin: auto;
    width: fit-content;
}
</style>