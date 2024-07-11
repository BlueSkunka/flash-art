<script setup lang="ts">
import {ref} from "vue";
import {Address} from "@/entities/address";
import axios from "axios";


const props = defineProps({
  invalid: {
    required: true,
    type: Boolean
  },
  address: {
    required: false,
    type: Address
  }
})

const address = ref<Address>(props.address ? props.address : new Address(""))


const emits = defineEmits(['address-update-event'])
const emitAddressUpdateEvent = () => {
  emits('address-update-event', { address: address.value })
}

const addresses = ref<Address[]>([])

async function findAddress(event) {
  if (event.query.length > 3) {
    const url = new URL("https://api-adresse.data.gouv.fr/search/")
    url.searchParams.set("q", event.query)

    addresses.value = await axios.get(url.href)
        .then(response => {
          const data = response.data
          const dataAddress: Address[] = []
          data.features.forEach((item: any) => {
            const address = new Address(
                item.properties.label,
                {
                  long: item.geometry.coordinates[0],
                  lat: item.geometry.coordinates[1]
                }
            )

            dataAddress.push(address)
          })

          return dataAddress
        })
        .catch(error => console.log(error))
  }
}
</script>

<template>
  <label for="address">Adresse</label>
  <AutoComplete inputClass="w-full" inputId="address" v-model="address" @complete="findAddress" optionLabel="label"
                :suggestions="addresses" :invalid="invalid" @itemSelect="emitAddressUpdateEvent"/>
  <small>Renseigner au moins 4 caractères</small>
</template>

<style scoped>

</style>