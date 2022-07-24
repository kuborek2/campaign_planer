<script setup>
    import { ref, computed } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useCurrentCompanyStore } from "../stores/currentCompanyStore.js"
    import { useCurrentProductStore } from "../stores/currentProductStore.js"
    import { useCurrentCampaignStore } from "../stores/currentCampaignStore.js"
    import { useCampaignsStore } from "../stores/campaignsStore.js"
    import { useCompaniesStore } from "../stores/companiesStore.js"
    import { useTownsStore } from "../stores/townsStore.js"
    import { useTagsStore } from "../stores/tagsStore.js"
    import { onMounted, watch } from 'vue'
    import TagsField from './TagsField.vue';
    import Toggle from '@vueform/toggle'
    import "@vueform/toggle/themes/default.css";
    import axios from 'axios'
    import { useActionStore } from "../stores/currentActionStore.js"
    import router from '@/router'

    const currentCampaignStore = useCurrentCampaignStore();
    const currentCompanyStore = useCurrentCompanyStore();
    const currentProductStore = useCurrentProductStore();
    const campaignsStore = useCampaignsStore();
    const companiesStore = useCompaniesStore();
    const townsStore = useTownsStore();
    const tagsStore = useTagsStore();
    let currnetCampaignData = ref({});
    let currnetCompanyData = ref({});
    let currnetProductData = ref("");
    const actionStore = useActionStore();

    const apiPostCampaignLink = "http://localhost:3000/api/campaign";

    //form refs
    const campaign_name = ref('');
    const product_name = ref('');
    const company_name = ref('');
    const bid_amount = ref(0);
    const town = ref('');
    const radius = ref(0);
    const isStatusActive = ref(true);
    const outputMessage = ref('');

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

    const collectFormData = () => {
        let result = formValidation()
        if ( result.status ){
            if( actionStore.action === "ADD_ITEM" ){
                addCampaignItemRequest(result.data);
            } else if ( actionStore.action === "PUT_ITEM" ){
                upadteCampaignItemRequest(result.data);
                campaignsStore.loadDataFromBackend();
                setTimeout(5000);
                router.push({ path: '/' });
            }
        }
    }

    const clearForm = () => {
        campaign_name.value = '';
        product_name.value = '';
        company_name.value = ''
        bid_amount.value = 0;
        town.value = '';
        radius.value = 0;
        isStatusActive.value = true;
    }

    const companyFundBalanceComputed = computed(() => {
        if ( !!company_name.value && !!bid_amount.value && bid_amount.value > 1000 && !!companiesStore.companies ){
            let result = companiesStore.companies.filter((obj) => {
                return obj.name === company_name.value
            })
            if( result.length > 0 )
                return result[0].fund_balance - bid_amount.value;
            return "Such company does noot exist"

        } else {
            return "Fill company name, and bit amount greater than 1000"
        }
    })

    const formValidation = () => {
        let necceseryData = {};
        let resultCompany = companiesStore.companies.filter((obj) => {
                return obj.name === company_name.value;
            })
        if( resultCompany.length > 0 ){
            necceseryData.company_id = resultCompany[0].company_id;

            let resultProduct = resultCompany[0].products_list.filter((obj) => {
                return obj.name === product_name.value;
            })

            if ( resultProduct.length < 1 ){
                //Popup
                outputMessage.value = "Enter valid product name"
                return { status: false }
            }

            necceseryData.product_id = resultProduct[0].product_id;

            if( bid_amount.value < 1000 || resultCompany.fund_balance > bid_amount.value ){
            //Popup
                outputMessage.value = "Enter valid bid amount"
                return { status: false }
            }
        } else {
            //Popup
            outputMessage.value = "Enter valid company name"
            return { status: false }
        }
        if( !!campaign_name.value && !!town.value && radius.value > 0 && tagsStore.tags.length > 0 ){
            outputMessage.value = ""
            return { 
                status: true,
                data: necceseryData
                }
        } else {
            outputMessage.value = "All data is mandatory including tags"
            return { status: false }
        }
    }

    const upadteCampaignItemRequest = ( data ) => {
        const objToSend = {
            "company_id": data.company_id,
            "product_id": data.product_id,
            "campaign_name": campaign_name.value,
            "keywords": tagsStore.tags,
            "bid_amount": bid_amount.value,
            "status": isStatusActive.value,
            "town": town.value,
            "radius": radius.value
        }

        console.log(objToSend)
        axios.put(apiPostCampaignLink+"/"+currentCampaignStore.campaignId, objToSend)
            .then((response) => {
                if( response.status === 200){
                    clearForm();
                    outputMessage.value = "item succefully modified"
                } else if ( response.status === 404 ){
                    outputMessage.value = "Something went wrong!!!"
                }
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
            });
    }

    const addCampaignItemRequest = ( data ) => {
        const objToSend = {
            "company_id": data.company_id,
            "product_id": data.product_id,
            "campaign_name": campaign_name.value,
            "keywords": tagsStore.tags,
            "bid_amount": bid_amount.value,
            "status": isStatusActive.value,
            "town": town.value,
            "radius": radius.value
        }

        axios.post(apiPostCampaignLink, objToSend)
            .then((response) => {
                if( response.status === 200){
                    clearForm();
                    outputMessage.value = "item succefully added"
                } else if (response.status === 404) {
                    outputMessage.value = "Something went wrong!!!"
                }
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
            });
    }

</script>

<template>
    <div class="content">
        <form class="innerBox">
            <div class="formHalf">
                <div>
                    <label>Campaign name: </label><br/>
                    &nbsp;<input type="text" v-model="campaign_name" name="campaign_name" required/>
                </div>
                <div>
                    <label>Product name: </label><br/>
                    &nbsp;<input type="text" v-model="product_name" name="product_name" required/>
                </div>
                <div>
                    <label>Company name: </label><br/>
                    &nbsp;<input type="text" v-model="company_name" name="company_name" required/>
                </div>
                <div>
                    <label>Big amount: </label><br/>
                    &nbsp;<input type="number" v-model="bid_amount" name="bid_amount" required/><br/>
                    <span class="balance"><label>Company Balance: </label> <span> {{companyFundBalanceComputed}} </span> </span>
                </div>
            </div>
            <div class="formHalf">
                <div>
                    <label>Town: </label><br/>
                    
                    &nbsp;<select v-model="town" name="town" required>
                        <option v-for="town in townsStore.towns" :value="town">{{town}}</option>
                    </select>
                </div>
                <div>
                    <label>Radius (km): </label><br/>
                    &nbsp;<input type="number" v-model="radius" name="radius" required/>
                </div>
                <div>
                    <label>Tags: </label>
                    &nbsp;<TagsField></TagsField>

                </div>
                <div>
                    <label>Status: </label> &nbsp; &nbsp;
                    <Toggle v-model="isStatusActive"/>
                </div>
            </div>
        </form>
        <div>
            <input type="Submit" @click="collectFormData()" value="Submit"/>
            <button @click="clearForm()">Clear</button>
            <span class="output-message">{{outputMessage}}</span>
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

.balance {
    display: flex;
    flex-direction: column;
}

.balance > span {
    max-width: 80%;
    margin-left: 5px;
    border: none;
}

.output-message {
    max-width: 60%;
    margin-left: 5px;
    overflow: hidden;
    color: red;
}
</style>