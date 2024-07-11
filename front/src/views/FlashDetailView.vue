<template>
  <Toast/>
  <h1 class="text-3xl text-center my-12">Réservation d'un flash</h1>
  <div class="grid grid-cols-2 mb-16 w-1/2 mx-auto">
    <div class="border border-red-600 w-2/3 m-auto">
      <img src="../assets/illu-tatoueur.jpg" alt="image de flash">
    </div>
    <div>
      <h2 class="text-2xl my-3">{{ flash.name }}</h2>
      <h3 class="text-xl mb-5 font-medium">{{ flash.price }}</h3>
      <p class="text-grey-600">{{ flash.description }}</p>
      <p class="mt-5 mb-1">Créneau horaire:
        {{ date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' à ' + date.getHours() + 'h' + date.getMinutes() }}</p>
      <Button v-if="user && flash.user === undefined" @click="toBook">Réserver le créneau</Button>
      <InlineMessage severity="info" v-else-if="flash.user !== undefined">Ce créneau à déjà été réservé</InlineMessage>
      <InlineMessage severity="info" v-else>Vous devez être connecté pour réserver ce créneau</InlineMessage>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeMount, computed} from "vue";
import FlashComponent from "@/components/FlashComponent.vue";
import {Flash} from "@/entities/flash";
import {useFlashesStore} from "@/stores/flashes";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {useToast} from "primevue/usetoast";

const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()

const user = computed(() => authStore.user)
const flashId = route.params.id
const flashesStore = useFlashesStore()
const flash = computed(() => flashesStore.flash);
const date = ref(new Date())

onBeforeMount(async () => {
  await flashesStore.findOne(flashId)
  date.value = new Date(flash.value.flashDate)
})


const toBook = async () => {
  const data = {
    place: flash.value.place,
    flashDate: flash.value.flashDate,
    tattooer: flash.value.tattooer._id,
    name: flash.value.name,
    description: flash.value.description,
    price: flash.value.price,
    location: {
      type: "Point",
      coordinates: [
        flash.value.location.coordinates[0],
        flash.value.location.coordinates[1]
      ]
    },
    styles: flash.value.styles,
    user: user.value._id
  }

  const isUpdated = await flashesStore.update(data, flashId)


  if (isUpdated) {
    flash.value.user = user.value
    toast.add({severity:'info', summary: 'Le créneau a été réservé'})
  } else {
    toast.add({severity:'error', summary: 'Une erreur est survenue'})
  }
}


</script>