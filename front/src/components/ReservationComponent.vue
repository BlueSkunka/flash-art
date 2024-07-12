<template>
  <Card class="my-5 border-l-8 border-gray-600">
    <template #content>
      <div class="flex justify-between">
        <div class="flex">
          <div class="w-28 h-28 flex items-center justify-center">
            <Image src="../src/assets/illu-tatoueur.jpg" class="m-auto"/>
          </div>
          <div class="ml-10">
            <h2 class="mb-3 text-xl"> Flash "{{ flash.name }}"</h2>
            <div class="flex gap-6" v-if="tatoueurReservation">
              <div class="flex my-2">
                <i class="pi pi-user my-auto pr-1"/>
                <p class="my-auto">{{ flash.user.firstname + ' ' + flash.user.lastname }}</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="flex my-2">
                <i class="pi pi-calendar-clock my-auto pr-1"/>
                <p class="my-auto">{{ flash.flashDate }}</p>
              </div>
              <div class="flex my-2">
                <i class="pi pi-map-marker my-auto pr-1"/>
                <p class="my-auto">{{ flash.place }}</p>
              </div>
              <div class="flex my-2">
                <i class="pi pi-wallet my-auto pr-1"/>
                <p class="my-auto">{{ flash.price }} €</p>
              </div>
            </div>
          </div>
        </div>
        <div class="my-auto">
          <Button label="Annuler la réservation" severity="danger" @click="cancelBook"/>
        </div>
      </div>


    </template>
  </Card>
</template>

<script setup lang="ts">

import {useFlashesStore} from "@/stores/flashes";
import {Flash} from "@/entities/flash";

const props = defineProps({
  flash: {
    type: Object,
    required: true
  },
  tatoueurReservation : {
    type: Boolean,
  },
})

const user = { nom: "Dark Bernadette", mail: "dark_bernadette@gmail.com" };
const flashesStore = useFlashesStore()

const emits = defineEmits(['cancel-book-event'])

const cancelBook = async () => {
  const data = {
    place: props.flash.place,
    flashDate: props.flash.flashDate,
    tattooer: props.flash.tattooer._id,
    name: props.flash.name,
    description: props.flash.description,
    price: props.flash.price,
    location: {
      type: "Point",
      coordinates: [
        props.flash.location.coordinates[0],
        props.flash.location.coordinates[1]
      ]
    },
    styles: props.flash.styles,
    user: null
  }

  const isUpdated = await flashesStore.update(data, props.flash._id)

  emits('cancel-book-event', {isCanceked: isUpdated})
}

</script>