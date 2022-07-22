<script setup>
    import { reactive, ref, defineProps } from 'vue';
    import { storeToRefs } from "pinia";
    import CampaignInfoBox from '../components/CampaignInfoBox.vue';
    import { useCompaniesStore } from "../stores/companiesStore.js"
    import { useCampaignsStore } from "../stores/campaignsStore.js"
    import { inject, onMounted } from 'vue'

    const isLeftPanelActive = ref(true)
    const campaignId = ref(-1)

</script>

<template>
    <div class="container">
        <div class="infoBox" :class="{ blur: !isLeftPanelActive }">
            <CampaignInfoBox>
            </CampaignInfoBox>
        </div>
        <div class="modifyBox">
            No
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

.modifyBox {
    grid-area: modifyBox;
    padding: 10px;
}

.blur {
    position: absolute;
    background-color: rgba(127,209,174, 0.4);;

    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(8px);
    
    /* Full height */
    width: 100%;
}


</style>
