<template>
  <div>
    <h1 class="text-3xl text-center my-10">Mes réservations</h1>
    <div v-for="i in 3" :key="i">
      <ReservationComponent nom-flash="Nom flash" :date-reservation="new Date(2024, 6, 15).toLocaleDateString('fr-FR')" lieu-reservation="Lyon, France" class="w-1/2 mx-auto"/>
    </div>
  </div>
</template>

<script setup>
import ReservationComponent from "@/components/ReservationComponent.vue";
</script>