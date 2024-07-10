<script setup lang="ts">

import {Flash} from "@/entities/flash";
import {computed, ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import AddressFieldComponent from "@/components/AddressFieldComponent.vue";
import {useFlashesStore} from "@/stores/flashes";
import type {Address} from "@/entities/address";

const authStore = useAuthStore()
const flashesStore = useFlashesStore()
const tattooer = computed(() => authStore.user)

const emits = defineEmits(['form-submit-event'])

const emitFormSubmitEvent = (submitted: boolean) => {
  emits('form-submit-event', {submitted: submitted})
}

const props = defineProps({
  flash: {
    type: Flash,
    required: false
  }
})

const form = {
  place: ref<Address>(props.flash ? props.flash.place.label : undefined),
  flashDate: ref<Date>(props.flash ? props.flash.flashDate : new Date()),
  tattooer: tattooer,
  name: ref<string>(props.flash ? props.flash.name : ""),
  description: ref<string>(props.flash ? props.flash.description : ""),
  price: ref<number>(props.flash ? props.flash.price : 0),
}

const handleAddressUpdateEvent = (data) => {
  form.place.value = data.address
}

const isPlaceValid = ref(false)
const isFlashDateValid = ref(false)
const isTattooerValid = ref(false)
const isNameValid = ref(false)
const isDescriptionValid = ref(false)
const isPriceValid = ref(false)
const hasBeenSubmit = ref(false)

const submit = async (e: Event) => {
  e.preventDefault()
  hasBeenSubmit.value = true

  if (form.place.value !== null) {
    isPlaceValid.value = true
  }

  if (form.flashDate.value !== null) {
    isFlashDateValid.value = true
  }

  if (form.tattooer.value !== null) {
    isTattooerValid.value = true
  }

  if (form.name.value.trim() !== '') {
    isNameValid.value = true
  }

  if (form.description.value.trim() !== '') {
    isDescriptionValid.value = true
  }

  if (form.price.value > 0) {
    isPriceValid.value = true
  }

  if (
      isPlaceValid.value &&
      isFlashDateValid.value &&
      isTattooerValid.value &&
      isNameValid.value &&
      isDescriptionValid.value &&
      isPriceValid.value
  ) {
    if (props.flash) {

    } else {
      const isCreated = await flashesStore.create({
        place: form.place.value.label,
        flashDate: form.flashDate.value,
        tattooer: tattooer.value._id,
        name: form.name.value,
        description: form.description.value,
        price: form.price.value,
        location: {
          type: "Point",
          coordinates: [
            form.place.value?.coordinates.long,
            form.place.value?.coordinates.lat,
          ]
        },
      })

      emitFormSubmitEvent(isCreated)
    }

  }
}
</script>

<template>
  <form action="">
    <div class="flex flex-col gap-2 mb-5">
      <AddressFieldComponent :invalid="!isPlaceValid && hasBeenSubmit" @addressUpdateEvent="handleAddressUpdateEvent"/>
    </div>

    <div class="flex flex-col gap-2 mb-5">
      <label for="date">Date</label>
      <InputText type="date" id="date" v-model="form.flashDate.value" :invalid="!isFlashDateValid && hasBeenSubmit"/>
    </div>

    <div class="flex flex-col gap-2 mb-5">
      <label for="name">Nom</label>
      <InputText id="name" v-model="form.name.value" :invalid="!isNameValid && hasBeenSubmit"/>
    </div>

    <div class="flex flex-col gap-2 mb-5">
      <label for="description">Description</label>
      <Textarea id="description" v-model="form.description.value" :invalid="!isDescriptionValid && hasBeenSubmit"/>
    </div>

    <div class="flex flex-col gap-2 mb-5">
      <label for="price">Prix</label>
      <InputNumber :invalid="!isPriceValid && hasBeenSubmit" id="price" mode="currency" currency="EUR" locale="fr-FR"
                   showButtons v-model="form.price.value"/>
    </div>

    <Button label="Enregistrer" type="submit" @click="submit"/>
  </form>
</template>

<style scoped>

</style>