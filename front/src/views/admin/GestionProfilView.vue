<template>
  <div class="container mx-auto px-32">
    <h1 class="text-3xl my-10 text-center">Gestion de mon profil</h1>

    <h2 class="text-2xl my-6">Mes informations</h2>

    <div class="container mx-auto px-60">
      <div class="flex flex-col gap-6 w-full sm:w-auto">
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-auto">
            <div class="flex-auto my-6">
              <label for="lastname" class="block font-semibold mb-2">Nom</label>
              <InputText id="lastname" class="w-full" v-model="user.lastname"/>
            </div>
            <label for="firstname" class="block font-semibold mb-2">Prénom</label>
            <InputText id="firstname" class="w-full" v-model="user.firstname"/>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-1">
            <div class="flex-auto">
              <label for="mail" class="block font-semibold mb-2">Mail</label>
              <InputText id="mail" class="w-full" v-model="user.email"/>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex-auto">
              <label for="password" class="block font-semibold mb-2">Mot de passe</label>
              <InputText id="password" class="w-full" v-model="user.password"/>
            </div>
          </div>
        </div>
        <div class="flex-auto">
          <label for="city" class="block font-semibold mb-2">Ville</label>
          <InputText id="city" class="w-full"/>
        </div>
      </div>
    </div>


    <h2 class="text-2xl my-6">Mon profil visible</h2>
    <div class="container mx-auto px-60">
      <div class="flex flex-col gap-6 w-full sm:w-auto">
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-auto">
            <label for="pseudo" class="block font-semibold mb-2">Nom d'artiste</label>
<!--            <InputText id="pseudo" class="w-full" v-model="user.surname"/>-->
          </div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-auto">
            <label for="pseudo" class="block font-semibold mb-2">Lieu du shop</label>
<!--            <InputText id="pseudo" class="w-full" v-model="user.place"/>-->
          </div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-auto">
            <label for="styles" class="block font-semibold mb-2">Styles</label>
            <MultiSelect id="styles" v-model="selectedStyles" display="chip" :options="styles" optionLabel="styles"
                         filter placeholder="Sélectionner des styles"
                         :maxSelectedLabels="10" class="w-full"/>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-auto">
            <label for="description" class="block font-semibold mb-2">A propos de moi</label>
<!--            <Textarea v-model="user.description" rows="5" cols="30" class="w-full"/>-->
          </div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-auto">
            <label for="avatar" class="block font-semibold mb-2">Photo de profil</label>
            <FileUpload id="avatar" mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload
                        @uploader="customBase64Uploader"/>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-2xl my-6">Mes réseaux</h2>
    <div class="container mx-auto px-60">
      <div v-for="i in 5" :key="i">
        <div class="flex flex-col sm:flex-row sm:items-center gap-6 w-1/3">
          <div class="flex-auto">
            <label for="pseudo" class="block font-semibold mb-2">Réseau</label>
<!--            <InputText id="pseudo" class="w-full" v-model="user.links.name"/>-->
          </div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6 w-1/3">
          <div class="flex-auto">
            <label for="pseudo" class="block font-semibold mb-2">URL</label>
<!--            <InputText id="pseudo" class="w-full" v-model="user.links.url"/>-->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useStylesStore} from "@/stores/styles";
import {useAuthStore} from "@/stores/auth";
import axios from "axios";
import {Address} from "@/entities/address";

const selectedStyles = ref();
const stylesStore = useStylesStore();
const styles = ref();

const userStore = useAuthStore();
const user = computed(() => userStore.user)

console.log(user.value)

onMounted(() => {
  getStyles();
})

const getStyles = async () => {
  try {
    styles.value = await stylesStore.findAll();
    console.log(styles.value);
  } catch (e) {
    console.error(e)
  }
}

console.log(user.value.email)

// const getAdress = async () => {
//     const url = new URL("https://api-adresse.data.gouv.fr/reverse/?lon=" + user + "&lat=" + +"\")
//     url.searchParams.set("q", event.query)
//
//     addresses.value = await axios.get(url.href)
//         .then(response => {
//           const data = response.data
//           const dataAddress: Address[] = []
//           data.features.forEach((item: any) => {
//             const address = new Address(
//                 {
//                   long: item.geometry.coordinates[0],
//                   lat: item.geometry.coordinates[1]
//                 },
//                 item.properties.label
//             )
//
//             dataAddress.push(address)
//           })
//
//           return dataAddress
//         })
//         .catch(error => console.log(error))
// }

const customBase64Uploader = async (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    const base64data = reader.result;
  };
};
</script>