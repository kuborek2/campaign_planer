<script setup>
    import CompanyItem from "./CompanyItem.vue";
    import ProductItem from "./ProductItem.vue";
    import CampaignItem from "./CampaignItem.vue";
    import { reactive, computed } from "vue";
    import { useCurrentCompanyStore } from "../stores/currentCompanyStore.js"
    import { useCurrentProductStore } from "../stores/currentProductStore.js"
    const companyStore = useCurrentCompanyStore();
    const productStore = useCurrentProductStore();
    const data = reactive({
        campaigns: [
            {
                campaign_id: 1,
                company_id: 1,
                product_id: 1,
                campaign_name: "Gates for everyone",
                keywords: [
                    "one for each",
                    "limited offer"
                ],
                bid_amount: 25000,
                status: true,
                town: "Tarnow",
                radius: "10"
            },
            {
                campaign_id: 2,
                company_id: 1,
                product_id: 3,
                campaign_name: "Get them while they last",
                keywords: [
                    "rare",
                    "one for each",
                    "limited offer"
                ],
                bid_amount: 25000,
                status: false,
                town: "Tarnow",
                radius: "10"
            },
            {
                campaign_id: 3,
                company_id: 3,
                product_id: 1,
                campaign_name: "Let the shine power your ship",
                keywords: [
                    "electricity",
                    "green technology",
                ],
                bid_amount: 25000,
                status: true,
                town: "Tarnow",
                radius: "10"
            }
        ]
    });

    const computedCampaigns = computed(() => {
        return data.campaigns.company_id === companyStore.companyId
            && data.campaigns.product_id === productStore.productId > 0 ? true : false
    })
    const companies = 
    [
        {
            company_id: 1,
            name: 'Domain of Man',
            fund_balance: 100000,
            products_list: [
                {
                    product_id: 1,
                    name: 'gate'
                },
                {
                    product_id: 2,
                    name: 'exploration ship'
                },
                {
                    product_id: 3,
                    name: 'artifacts'
                }
            ]
        },
        {
            company_id: 2,
            name: 'Hegemony',
            fund_balance: 200000,
            products_list: [
                {
                    product_id: 1,
                    name: 'toothbrash'
                },
                {
                    product_id: 2,
                    name: 'ore'
                },
                {
                    product_id: 3,
                    name: 'food'
                }
            ]
        },
    ];
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
                    :product-id="product.product_id"
                    >
                    <template #name>
                        {{ product.name }}
                    </template>
                </ProductItem>
            </template>
        </div>
        <div class="campaigns">
            <CampaignItem 
                v-for="campaign in computedCampaigns"
                v-bind:key="campaign.campaign_id"
                :id="campaign.campaign_id"

                >
                <template #name>
                    {{campaign.campaign_name}}
                </template>
            </CampaignItem>
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