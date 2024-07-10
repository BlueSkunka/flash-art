<template>
  <h1 class="text-center text-3xl my-10">Gestion des réservations de flashs</h1>

  <div class="w-1/2 mx-auto" v-for="i in 3" :key="i">
    <ReservationComponent lieu-reservation="Lieu" date-reservation="Date" image-flash-url="" nom-flash="Nom de flash" :prix-flash="500"/>
  </div>
</template>

<script setup>
import ReservationComponent from "@/components/ReservationComponent.vue";
</script>