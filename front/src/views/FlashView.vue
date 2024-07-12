<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useTattooersStore } from "@/stores/tattooers";
import { useStylesStore } from "@/stores/styles";
import { useFlashesStore } from '@/stores/flashes';
import { Flash } from '@/entities/flash';
import {Address} from "@/entities/address";
import {useAuthStore} from "@/stores/auth";
import StyleFieldComponent from "@/components/StyleFieldComponent.vue";
import AddressFieldComponent from '@/components/AddressFieldComponent.vue';
import FlashComponent from '@/components/FlashComponent.vue';

const tattooersStore = useTattooersStore();
const stylesStore = useStylesStore();
const flashesStore = useFlashesStore();

const value = ref('Tous');
const options = computed(() => stylesStore.styles);
const tattooers = computed(() => tattooersStore.tattooers);
const flashes = computed(() => flashesStore.flashes);
const isLoadingTattoers = computed(() => tattooersStore.isLoading);
const isLoadingStyles = computed(() => stylesStore.isLoading);
const isLoadingFlashes = computed(() => flashesStore.isLoading);

const filterTattooers = async (style: string | null = null) => {
  value.value = style;
  await tattooersStore.findAll(style);
};


const fetchData = async () => {
  await stylesStore.findAll();
  await tattooersStore.findAll();
  await flashesStore.findAll();
};

fetchData();

const selectedCities = ref([]);
const selectedStyles = ref([]);
const selectedDateRange = ref(null);
const selectedTatoueurs = ref([]);

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

const nameTattooers = computed(() => {
  return tattooers.value.map(tattooer => ({
    name: `${tattooer.lastname} ${tattooer.firstname}`,
    code: tattooer._id
  }));
});

const places = computed(() => {
  const placesSet = new Set(tattooers.value.map(tattooer => tattooer.place));
  return Array.from(placesSet).map(place => ({ name: place, code: place }));
});


const authStore = useAuthStore()

const tattooer = computed(() => authStore.user)

const props = defineProps({
  flash: {
    type: Object,
    required: false
  }
})

const form = {
  place: ref<Address>(props.flash ? new Address(props.flash.place) : new Address('')),
  flashDate: ref<Date>(props.flash ? new Date(props.flash.flashDate) : new Date()),
  tattooer: tattooer,
  name: ref<string>(props.flash ? props.flash.name : ""),
  description: ref<string>(props.flash ? props.flash.description : ""),
  minPrice: ref<number>(props.flash ? props.flash.price : 0),
  maxPrice: ref<number>(props.flash ? props.flash.price : 0),
  styles: ref<Style[]>(props.flash ? props.flash.styles : []),
}

const submit = async (e: Event) => {
  e.preventDefault()

  await flashesStore.findAll(
    form.place.value,
    form.flashDate.value,
    form.tattooer.value,
    form.name.value,
    form.description.value,
    form.minPrice.value,
    form.maxPrice.value,
    form.styles.value
  )
  }

  const handleAddressUpdateEvent = (data) => {
  form.place.value = data.address
}

const handleStylesSelectedEvent = (data) => {
  form.styles.value = data.styles
}

</script>


<template>
  <section v-if="isLoadingTattoers && isLoadingStyles && isLoadingFlashes">
    <ProgressSpinner/>
  </section>
  <section v-else>
      <div class="container flex flex-col items-center justify-center mx-auto px-10">
      <h1 class="text-3xl text-center my-12">Les flashs</h1>
      <div class="flex flex-col items-center justify-center w-full px-20">
        <form>
          <div class="flex flex-wrap gap-4 items-center">
            <div class="flex flex-col">
              <AddressFieldComponent :invalid="false" :address="form.place.value" @addressUpdateEvent="handleAddressUpdateEvent" />
            </div>
            <!-- <StyleFieldComponent :styles="form.styles.value" :invalid="false" @stylesSelectedEvent="handleStylesSelectedEvent" />
            <MultiSelect v-model="selectedTatoueurs" :options="nameTattooers" optionLabel="name" placeholder="Tatoueur" class="flex-1 mb-4" inputId="tattooer"/> -->
            <Button label="Filtrer" type="submit" @click="submit" class="h-12" />
          </div>
          <!-- <div class="flex flex-wrap gap-4 w-full">
            <div class="flex-1 mb-4">
              <label for="minPrice" class="block mb-2">Min prix :</label>
              <InputText class="w-full" inputId="minPrice"/>
            </div>
            <div class="flex-1 mb-4">
              <label for="maxPrice" class="block mb-2">Max prix :</label>
              <InputText class="w-full" inputId="maxPrice"/>
            </div>
            <div class="flex-1 mb-4 flex flex-col justify-end">
              <label for="date-range" class="block mb-2">Date:</label>
              <Calendar v-model="selectedDateRange" selectionMode="range" placeholder="Sélectionner une plage de dates" :locale="localeFr" dateFormat="dd/mm/yy" class="w-full mt-auto" inputId="flashDate"/>
            </div>
          </div> -->
        </form>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-12 gap-4 justify-items-center m-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 md:gap-6" v-if="!isLoadingFlashes">
        <div v-if="flashes.length > 0" v-for="(flash, index) in flashes" :key="index" >
            <FlashComponent :flash="flash" />
          </div>
        <div v-else>
            <p class="text-center"><b>Aucun résultat</b></p>
        </div>
      </div>
      <ProgressSpinner v-else/>
    </div>
  </section>


</template>

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
