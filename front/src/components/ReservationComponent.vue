<template>
  <Card class="my-5 border-l-8 border-gray-600">
    <template #content>
      <div class="flex justify-between">
        <div class="flex">
          <div class="w-28 h-28 flex items-center justify-center">
            <Image src="../src/assets/illu-tatoueur.jpg" class="m-auto"/>
          </div>
          <div class="ml-10">
            <h2 class="mb-3 text-xl"> Flash "{{ props.nomFlash }}"</h2>
            <div class="flex gap-6" v-if="tatoueurReservation">
              <div class="flex my-2">
                <i class="pi pi-user my-auto pr-1"/>
                <p class="my-auto">{{ user.nom }}</p>
              </div>
              <div class="flex my-2">
                <i class="pi pi-at my-auto pr-1"/>
                <p class="my-auto">{{ user.mail }}</p>
              </div>
            </div>
            <div class="flex gap-6">
              <div class="flex my-2">
                <i class="pi pi-calendar-clock my-auto pr-1"/>
                <p class="my-auto">{{ props.dateReservation }}</p>
              </div>
              <div class="flex my-2">
                <i class="pi pi-map-marker my-auto pr-1"/>
                <p class="my-auto">{{ props.lieuReservation }}</p>
              </div>
              <div class="flex my-2">
                <i class="pi pi-wallet my-auto pr-1"/>
                <p class="my-auto">{{ props.prixFlash }} €</p>
              </div>
            </div>
          </div>
        </div>
        <div class="my-auto">
          <Button label="Annuler la réservation" severity="danger" @click="cancelReservation"/>
        </div>
      </div>


    </template>
  </Card>
</template>

<script setup lang="ts">

const props = defineProps({
  nomFlash: {
    type: String,
    required: true
  },
  prixFlash : {
    type: Number,
    required: true
  },
  imageFlashUrl: {
    type: String,
    required: true
  },
  dateReservation: {
    type: String,
    required: true
  },
  lieuReservation: {
    type: String,
    required: true
  },
  tatoueurReservation : {
    type: Boolean,
  },
})

const user = { nom: "Dark Bernadette", mail: "dark_bernadette@gmail.com" };

const cancelReservation = () => {
  //TODO: Annuler la réservation
}

</script>