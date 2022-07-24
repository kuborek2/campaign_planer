<script setup>
    import ArrowIcon from '@carbon/icons-vue/es/arrow--right/32.js'
    import { useCurrentCampaignStore } from "../stores/currentCampaignStore.js"
    import { useActionStore } from "../stores/currentActionStore.js"
    import { useCampaignsStore } from "../stores/campaignsStore.js"
    import router from '@/router'

    const campaignStore = useCurrentCampaignStore();
    const campaignsStore = useCampaignsStore();
    const actionStore = useActionStore();

    const props = defineProps(['campaignId'])

    const moveToCampaignDetails = (value) => {
        actionStore.change("GET_INFO");
        campaignStore.change(value)
        router.push({ path: '/campaign' })
    }
</script>

<template>
    <div class="content">
        <div class="item">
            <h2>
                <slot name="name"></slot>
            </h2>
            <div class="details">
                <button @click="moveToCampaignDetails(parseInt(props.campaignId))">About</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: row;
}
.item {
    width: 100%;
    height: 75px;
    margin: 10px 25px 10px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border: 1px solid #E0E0E0;
    background-color: #7FD1AE;
}



</style>