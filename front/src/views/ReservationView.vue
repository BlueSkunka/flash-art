<template>
  <Toast/>
  <h1 class="text-3xl text-center my-12">Mes réservations</h1>
  <div class="mb-20">
    <div class="w-1/2 mx-auto" v-for="(flash) in flashes" :key="flash._id">
      <ReservationComponent v-if="flash.user !== null" :flash="flash" :tatoueur-reservation="true" @cancel-book-event="handleCancelBookEvent"/>
    </div>
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
  await flashesStore.findByUser(user.value)
})

const handleCancelBookEvent = (data) => {
  if (data.isCanceled) {
    toast.add({'severity': "success", summary: "Flash canceled"})
  } else {
    toast.add({'severity': "error", summary: "Error occured"})
  }
}
</script>