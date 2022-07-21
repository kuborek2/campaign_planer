<script setup>
    import CompanyItem from "./CompanyItem.vue";
    import ProductItem from "./ProductItem.vue";
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
    ]
</script>

<template>
    <div class="container">
        <div class="companies" >
            <CompanyItem v-for="company in companies" v-bind:key="company.company_id">
                <template #name>
                    {{ company.name }}
                </template>
                <template #budget>
                    {{ company.fund_balance }}
                </template>
            </CompanyItem>
        </div>
        <div class="products" v-for="product in companies.products_list" v-bind:key="product.product_id">
            <ProductItem>
                <template #name>
                    {{ product.name }}
                </template>
            </ProductItem>
        </div>
        <div class="campaigns">
            gfd
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