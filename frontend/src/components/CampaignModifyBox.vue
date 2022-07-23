<script setup>
    import { ref } from 'vue';
    import { useCurrentCompanyStore } from "../stores/currentCompanyStore.js"
    import { useCurrentProductStore } from "../stores/currentProductStore.js"
    import { useCurrentCampaignStore } from "../stores/currentCampaignStore.js"
    import { useCampaignsStore } from "../stores/campaignsStore.js"
    import { useCompaniesStore } from "../stores/companiesStore.js"
    import { onMounted } from 'vue'
    import TagsField from './TagsField.vue';

    const currentCampaignStore = useCurrentCampaignStore();
    const currentCompanyStore = useCurrentCompanyStore();
    const currentProductStore = useCurrentProductStore();
    const campaignsStore = useCampaignsStore();
    const companiesStore = useCompaniesStore();
    let currnetCampaignData = ref({});
    let currnetCompanyData = ref({});
    let currnetProductData = ref("");

    //form refs
    const campaign_name = ref('');
    const product_name = ref('');
    const company_name = ref('');
    const bid_amount = ref(0);
    const town = ref('');
    const radius = ref(0);

    onMounted(()  =>  {
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

    const getTags = (value) => {
        console.log(value)
        if( !!value )
            tags.value = value;
    }

    const collectFormData = () => {
        console.log(campaign_name);
        console.log(product_name);
        console.log(company_name);
        console.log(bid_amount);
        console.log(town);
        console.log(radius);
    }
</script>

<template>
    <div class="content">
        <form class="innerBox">
            <div class="formHalf">
                <div>
                    <label>Campaign name: </label><br/>
                    &nbsp;<input type="text" v-model="campaign_name" name="campaign_name"/>
                </div>
                <div>
                    <label>Product name: </label><br/>
                    &nbsp;<input type="text" v-model="product_name" name="product_name"/>
                </div>
                <div>
                    <label>Company name: </label><br/>
                    &nbsp;<input type="text" v-model="company_name" name="company_name"/>
                </div>
                <div>
                    <label>Big amount: </label><br/>
                    &nbsp;<input type="text" v-model="bid_amount" name="bid_amount"/>
                </div>
            </div>
            <div class="formHalf">
                <div>
                    <label>Town: </label><br/>
                    
                    &nbsp;<select v-model="town" name="town">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div>
                    <label>Radius (km): </label><br/>
                    &nbsp;<input type="text" v-model="radius" name="radius"/>
                </div>
                <div>
                    <label>Tags: </label>
                    &nbsp;<TagsField></TagsField>

                </div>
                <div>
                    <div>
                        <h4>Status: </h4>
                        <div class="status" :class="{active: currnetCampaignData.status}">{{currnetCampaignData.status ? "ON" : "OFF"}}</div>
                    </div>
                </div>
            </div>
        </form>
        <div>
            <button @click="collectFormData()">Submit</button>
            <button>Clear</button>
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

div > form > input {
    margin-bottom: 10px;
}

.innerBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    height: 100%;
}
.formHalf {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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