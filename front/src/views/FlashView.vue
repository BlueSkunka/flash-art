<template>
  <div class="container flex flex-col items-center justify-center mx-auto px-10">
    <h1 class="text-3xl text-center my-12">Les flashs</h1>
    <div class="flex flex-col items-center justify-center w-full md:w-1/2">
      <div class="flex flex-wrap gap-4 w-full">
        <MultiSelect v-model="selectedCities" :options="cities" optionLabel="name" placeholder="Lieu" class="flex-1 mb-4" />
        <MultiSelect v-model="selectedTatoueurs" :options="tatoueurs" optionLabel="name" placeholder="Tatoueur" class="flex-1 mb-4" />
        <MultiSelect v-model="selectedStyles" :options="styles" optionLabel="name" placeholder="Style" class="flex-1 mb-4" />
      </div>
      <div class="flex flex-wrap gap-4 w-full">
        <div class="flex-1 mb-4">
          <label for="price-slider" class="block mb-2">Prix:</label>
          <Slider v-model="sliderValue" :min="0" :max="1000" step="10" class="w-full mb-2" />
          <InputText v-model.number="sliderValue" class="w-full" />
        </div>
        <div class="flex-1 mb-4 flex flex-col justify-end">
          <label for="date-range" class="block mb-2">Date:</label>
          <Calendar v-model="selectedDateRange" selectionMode="range" placeholder="Sélectionner une plage de dates" :locale="localeFr" dateFormat="dd/mm/yy" class="w-full mt-auto" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 justify-items-center m-8">
      <div v-for="index in 8" :key="index">
        <CardComponent :showTitle="true" :showSubtitle="true" :showDate="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedCities = ref([]);
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);

const selectedStyles = ref([]);
const styles = ref([
    { name: 'Style 1', code: 'S1' },
    { name: 'Style 2', code: 'S2' },
    { name: 'Style 3', code: 'S3' },
]);

const selectedDateRange = ref(null);

const selectedTatoueurs = ref([]);
const tatoueurs = ref([
    { name: 'Jean Neymar', code: 'JN' },
    { name: 'Jean Peuplu', code: 'JP' },
    { name: 'Jean Merde', code: 'JM' },
    { name: 'Jean Sairien', code: 'JS' }
]);

const sliderValue = ref(0);

const localeFr = {
  firstDayOfWeek: 1,
  dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  dayNamesShort: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
  dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
  monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  monthNamesShort: ["jan", "fév", "mar", "avr", "mai", "jun", "jul", "aoû", "sep", "oct", "nov", "déc"],
  today: "Aujourd'hui",
  clear: "Effacer"
};
</script>

<style scoped>
.container {
  margin: auto;
  padding: 10px;
}

.calendar-input-container {
  display: flex;
  flex-direction: column;
  justify-content: end;
}
</style>
