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
</template>

<script setup>

import { ref } from "vue";
const selectedCity = ref();
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);

</script>