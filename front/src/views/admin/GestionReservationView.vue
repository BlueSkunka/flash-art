<template>
  <h1 class="text-center text-3xl my-10">Gestion des réservations de flashs</h1>

  <div class="w-1/2 mx-auto" v-for="(flash) in flashes">
    <ReservationComponent :lieu-reservation="flash.place" :date-reservation="new Date(flash.flashDate)" image-flash-url="" :nom-flash="flash.name" :prix-flash="flash.price" :tatoueur-reservation="true"/>
  </div>
</template>

<script setup>
import ReservationComponent from "@/components/ReservationComponent.vue";
import {useFlashesStore} from "@/stores/flashes";
import {computed, onBeforeMount} from "vue";
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore()
const flashesStore = useFlashesStore()

const user = computed(() => authStore.user)
const flashes = computed(() => flashesStore.flashes)
console.log(flashes.value)

onBeforeMount(async () => {
  await flashesStore.findByTattooer(user.value, true)
})
</script>