<script setup>
    import { reactive, ref, defineProps, computed, onUpdated } from 'vue';
    import CampaignInfoBox from '../components/CampaignInfoBox.vue';
    import { useCurrentCampaignStore } from "../stores/currentCampaignStore.js"
    import { useActionStore } from "../stores/currentActionStore.js"
    import CampaignModifyBox from '../components/CampaignModifyBox.vue'
    import { useCampaignsStore } from "../stores/campaignsStore.js"
    import axios from 'axios'
    import router from '@/router'

    const campaignsStore = useCampaignsStore();
    const actionStore = useActionStore();
    const currentCampaignStore = useCurrentCampaignStore();
    const apiDeleteCampaignLink = "http://localhost:3000/api/campaigns/"
    const outputMessage = ref('')

    const checkLeftPanel = computed(() => {
        return actionStore.action !== "ADD_ITEM"
    })

    const checkRightPanel = computed(() => {
        return actionStore.action === "ADD_ITEM" || actionStore.action === "PUT_ITEM"
    })

    const ModifyCampaign = () => {
        actionStore.change("PUT_ITEM");
    }

    onUpdated(() => {
        outputMessage.value = ""
    })

    const DeleteCampaign = () => {
        let status = false
        axios.delete(apiDeleteCampaignLink+currentCampaignStore.campaignId)
            .then((response) => {
                if( response.status ){
                    campaignsStore.loadDataFromBackend();
                    router.push({ path: '/' });
                } else {
                    alert("Unable to delete the item");
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
    <div class="container">
        <div class="infoBox" :class="{ blur: !checkLeftPanel}"></div>
        <div class="infoBox" :class="{boxArea: !checkLeftPanel}">
            <CampaignInfoBox>
            </CampaignInfoBox>
        </div>
        <div class="modifyBox rightButtons" v-if="!checkRightPanel">
            <button @click="ModifyCampaign">Modify item</button>
            <button @click="DeleteCampaign">Delete item</button>
        </div>
        <div class="modifyBox" :class="{ blur: !checkRightPanel}">
        </div>
        <div class="modifyBox" :class="{boxArea: !checkRightPanel}">
            <CampaignModifyBox>
            </CampaignModifyBox>
        </div>
    </div>
    <p>{{outputMessage}}</p>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
    "infoBox modifyBox";
}

.infoBox{
    grid-area: infoBox;
    padding: 10px;
    height: 80%;
}

.boxArea {
    z-index: -1;
}

.modifyBox {
    grid-area: modifyBox;
    padding: 10px;
    height: 80%;
}

.blur {
    position: absolute;
    background-color: rgba(127,209,174, 0.95);

    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(8px);
    
    /* Full height */
    width: 100%;
}

.rightButtons {
    z-index: 2;
    height: 80%;
    width: 100%;
    position: absolute;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.rightButtons > button {
    margin: 15px;
    width: 150px;
    height: 50px;
    font-size: 1.3rem;
}


</style>
