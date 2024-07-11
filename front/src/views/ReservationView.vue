<template>
  <h1 class="text-3xl text-center my-12">Mes réservations</h1>
  <div class="mb-20">
    <div v-for="i in 3" :key="i">
      <ReservationComponent nom-flash="Nom flash" :date-reservation="new Date(2024, 6, 15).toLocaleDateString('fr-FR')" lieu-reservation="Lyon, France" image-flash-url="" :prix-flash="250" class="w-1/2 mx-auto" />
    </div>
  </div>
</template>

<script setup>
import ReservationComponent from "@/components/ReservationComponent.vue";
</script>