<template>
  <h1 class="text-3xl text-center my-12">Réservation d'un flash</h1>
  <div class="grid grid-cols-2 mb-16 w-1/2 mx-auto">
    <div class="border border-red-600 w-2/3 m-auto">
      <img src="../assets/illu-tatoueur.jpg" alt="image de flash">
      <!-- TODO remplir les infos avec le flash sélectionné-->
    </div>
    <div>
      <h2 class="text-2xl my-3">Nom du flash</h2>
      <h3 class="text-xl mb-5 font-medium">000 €</h3>
      <p class="text-grey-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      <p class="my-5">Lieu de tatouage: dtc</p>
      <p class="mt-5 mb-1">Créneau horaire:</p>
      <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Sélectionner un creaneau" class="w-full md:w-[18rem]" />
    </div>
  </div>
  <h1 class="text-3xl text-center my-12">Les autres flash de Jean Neymar</h1>
  <div  key="index" class="flex flex-wrap w-10/12 mx-auto gap-5">
<!--    <div v-for="index in 15">-->
<!--      <FlashComponent image-flash-url="" nom-flash="Papillon tout mignon"  />-->
<!--    </div>-->
    <Carousel :value="flashs" :numVisible="5" :numScroll="1" circular :autoplayInterval="3000">
      <template #item="slotProps">
        <FlashComponent image-flash-url="" nom-flash="Papillon tout mignon"  />
        <!-- TODO envoyer les props (doc carousel) -->
      </template>
    </Carousel>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";
import FlashComponent from "@/components/FlashComponent.vue";
const selectedCity = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);
const flashs = ref();

onMounted(() => {
  //récupération des flashs
})


</script>