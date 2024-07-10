<script setup lang="ts">
import CommentComponent from '@/components/CommentComponent.vue';
import CardComponent from '@/components/CardComponent.vue';
import { ref } from 'vue';

const rating = ref(4);

const scrollToAvis = () => {
    const avisElement = document.getElementById('avis');
    if (avisElement) {
        avisElement.scrollIntoView({ behavior: 'smooth' });
    }   
}

const totalAvis = ref(6)
</script>

<template>
    <div class="flex flex-col mx-32">
        <div class="flex gap-20 justify-center items-center m-6 mx-auto my-20" style="width: 75%;">
            <div class="bg-gray-400" style="width: 500px; height: 300px;">
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex justify-between items-center ">
                    <p class="text-4xl">Jean Neymar</p>
                    <div class="flex gap-2 items-center">
                        <Rating v-model="rating" readonly class="mt-4 mb-2" :cancel="false"/> 
                       <p>({{ totalAvis }})</p> 
                    </div>
                </div>
                <div class="icons flex gap-3 text-3xl">
                    <i class="pi pi-instagram" />
                    <i class="pi pi-facebook" />
                    <i class="pi pi-pinterest" />
                    <i class="pi pi-tiktok" />
                    <i class="pi pi-twitter" />
                </div>
                <p>Description lorem ipsum dahjk dhfkjhdf Description lorem ipsum dahjk dhfkjhdf Description lorem ipsum dahjk dhfkjhdf</p>
                <div class="voir-avis-btn flex items-center justify-between">
                    <i class="pi pi-angle-down"></i>
                    <button class="text-xl" @click="scrollToAvis">Voir les avis</button>
                </div>

            </div>
        </div>

        <!-- Titre -->
        <div class="text-center m-4">
            <h1 class="text-4xl">Flashs de Jean Neymar</h1>
            <div class="flex justify-end pr-6">
                <button class="tri flex items-center gap-2">
                    Trier par
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-3 gap-2 justify-items-center m-8">
            <div v-for="index in 9" :key="index">
                <CardComponent :showTitle="false" :showSubtitle="false" :showMultiple="false"/>
            </div>
        </div>

        <!-- Avis -->
        <div class="text-center m-4" id="avis">
            <h1 class="text-3xl">Avis de Jean Neymar</h1>
        </div>
        <CommentComponent />
    </div>
</template>

<style scoped>
.centered-container {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
}

.voir-avis-btn {
    max-width: 160px;
    padding: 8px 16px; 
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

</style>