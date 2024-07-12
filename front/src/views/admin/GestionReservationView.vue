<template>
  <h1 class="text-center text-3xl my-10">Gestion des réservations de flashs</h1>

  <div class="w-1/2 mx-auto" v-for="(flash) in flashes" :key="flash._id">
    <ReservationComponent :tatoueur-reservation="true" :flash="flash" @cancel-book-event="handleCancelBookEvent"/>
  </div>
</template>

<script setup>
import ReservationComponent from "@/components/ReservationComponent.vue";
import {useFlashesStore} from "@/stores/flashes";
import {computed, onBeforeMount} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useToast} from "primevue/usetoast";

const toast = useToast()
const authStore = useAuthStore()
const flashesStore = useFlashesStore()

const user = computed(() => authStore.user)
const flashes = computed(() => flashesStore.flashes)

onBeforeMount(async () => {
  await flashesStore.findByTattooer(user.value, true)
})

const handleCancelBookEvent = (ev) => {
  if (ev.isCanceled) {
    toast.add({'severity': "", summary: "Flash canceled"})
  } else {
    toast.add({'severity': "error", summary: "Error occured"})
  }
}
</script>