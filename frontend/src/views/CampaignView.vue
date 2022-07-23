<script setup>
    import { reactive, ref, defineProps, computed } from 'vue';
    import { storeToRefs } from "pinia";
    import CampaignInfoBox from '../components/CampaignInfoBox.vue';
    import { useCompaniesStore } from "../stores/companiesStore.js"
    import { useCampaignsStore } from "../stores/campaignsStore.js"
    import { useActionStore } from "../stores/currentActionStore.js"
    import { inject, onMounted } from 'vue'
import CampaignModifyBox from '../components/CampaignModifyBox.vue'

    const actionStore = useActionStore();
    const currentAction = storeToRefs(actionStore)

    const campaignId = ref(-1)

    const checkLeftPanel = computed(() => {
        return currentAction === "ADD_ITEM" 
    })
</script>

<template>
    <div class="container">
        <div class="infoBox" :class="{ blur: checkLeftPanel}"></div>
        <div class="infoBox infoBoxTextArea">
            <CampaignInfoBox>
            </CampaignInfoBox>
        </div>
        <div class="modifyBox">
            <CampaignModifyBox>
            </CampaignModifyBox>
        </div>
    </div>
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

.infoBoxTextArea {
    z-index: -1;
}

.modifyBox {
    grid-area: modifyBox;
    padding: 10px;
    height: 80%;
}

.blur {
    position: absolute;
    background-color: rgba(127,209,174, 0.95);;

    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(8px);
    
    /* Full height */
    width: 100%;
}


</style>
