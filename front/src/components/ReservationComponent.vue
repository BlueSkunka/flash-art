<template>
  <Card class="my-5 border-l-8 border-gray-600">
    <template #content>
      <div class="flex">
        <div class="w-28 h-28 flex items-center justify-center">
          <Image src="../src/assets/illu-tatoueur.jpg" class="m-auto"/>
        </div>
        <div class="ml-10">
          <h2 class="mb-3 text-xl"> Réservation du flash "{{ props.nomFlash }}"</h2>
          <div class="flex gap-6">
            <div class="flex my-2">
              <i class="pi pi-calendar-clock my-auto pr-1"/>
              <p class="my-auto">{{ props.dateReservation }}</p>
            </div>
            <div class="flex my-2">
              <i class="pi pi-map-marker my-auto pr-1"/>
              <p class="my-auto">{{ props.lieuReservation }}</p>
            </div>
          </div>
        </div>
      </div>


    </template>
  </Card>
</template>

<script setup lang="ts">

const props = defineProps({
  nomFlash: String,
  imageFlashUrl: String,
  dateReservation: String,
  lieuReservation: String,
})

</script>