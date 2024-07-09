<script setup lang="ts">
import {computed, ref} from "vue";
import {useToast} from "primevue/usetoast";
import axios from "axios";
import {useRouter} from "vue-router";
import {useStylesStore} from "@/stores/styles";


const router = useRouter()
const toast = useToast();

const stylesStore = useStylesStore()

const styles: Style[] = computed(() => stylesStore.styles)

const form = {
  firstname: ref(""),
  lastname: ref(""),
  email: ref(""),
  password: ref(""),
  surname: ref(""),
  place: ref(""),
  links: ref([]),
  styles: ref<string[]>([]),
  description: ref(""),
}

const isPasswordValid = ref(false);
const isEmailValid = ref(false)
const isFirstnameValid = ref(false)
const isLastnameValid = ref(false)
const isSurnameValid = ref(false)
const isPlaceValid = ref(false)
const isLinksValid = ref(false)
const isStylesValid = ref(false)
const isDescriptionValid = ref(false)

const hasBeenSubmit = ref(false)

const search = async (event) => {
  await stylesStore.findAll(event.query)

  console.log(styles.value)
}

async function submit(e: Event) {
  e.preventDefault()
  hasBeenSubmit.value = true

  if (form.firstname.value.trim() !== '') {
    isFirstnameValid.value = true
  }

  if (form.lastname.value.trim() !== '') {
    isLastnameValid.value = true
  }

  // validation du formulaire
  if (String(form.email.value)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
    isEmailValid.value = true
  }

  if (form.password.value.trim() !== '') {
    isPasswordValid.value = true
  }

  if (form.surname.value.trim() !== '') {
    isSurnameValid.value = true
  }

  if (form.place.value.trim() !== '') {
    isPlaceValid.value = true
  }

  if (form.links.value.filter((item, index) => form.links.value.indexOf(item) !== index).length > 0) {
    isLinksValid.value = true
  }

  if (form.styles.value.filter((item, index) => form.links.value.indexOf(item) !== index).length > 0) {
    isStylesValid.value = true
  }

  if (form.description.value.trim() !== '') {
    isStylesValid.value = true
  }


  // Inscription
  if (
      isEmailValid.value &&
      isPasswordValid.value &&
      isFirstnameValid.value &&
      isLastnameValid.value
  ) {
    const isRegistered = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/tattooers/register",
        {
          firstname: form.firstname.value,
          lastname: form.lastname.value,
          email: form.email.value,
          password: form.password.value,
          surname: form.surname.value,
          place: form.place.value,
          links: form.links.value,
          styles: form.styles.value,
          description: form.description.value,
        }
    )
        .then(response => {
          return response.status === 201
        })
        .catch(error => {
          if (error.response.status === 409) {
            toast.add({
              severity: 'error',
              summary: 'Compte existant',
              detail: 'Un compte avec cette adresse existe déjà !',
              life: 3000
            });
          }
        })

    if (isRegistered) {
      router.push({name: 'login', query: {isRegistered: '1'}})
    }
  } else {
    toast.add({
      severity: 'error',
      summary: 'Formulaire invalide',
      detail: 'Le formulaire est invalide merci de remplir tous les champs et d\'avoir un mail valide',
      life: 3000
    });
  }
}
</script>

<template>
  <Toast/>

  <form @submit="submit">
    <div class="flex flex-col gap-2">
      <label for="firstname">Prénom</label>
      <InputText type="text" id="firstname" v-model="form.firstname.value" placeholder="Mathis"
                 v-if="!isFirstnameValid && hasBeenSubmit" invalid/>
      <InputText type="text" id="firstname" v-model="form.firstname.value" v-else placeholder="Mathis"/>
    </div>

    <div class="flex flex-col gap-2">
      <label for="lastname">Nom</label>
      <InputText type="text" id="lastname" v-model="form.lastname.value" placeholder="Rome"
                 v-if="!isLastnameValid && hasBeenSubmit" invalid/>
      <InputText type="text" id="lastname" v-model="form.lastname.value" v-else placeholder="Rome"/>
    </div>

    <div class="flex flex-col gap-2">
      <label for="email">Email</label>
      <IconField iconPosition="left">
        <InputIcon>
          <i class="pi pi-envelope"/>
        </InputIcon>


        <InputText type="email" id="email" v-model="form.email.value" placeholder="john.doe@gmail.com"
                   v-if="!isEmailValid && hasBeenSubmit" invalid/>
        <InputText type="email" id="email" v-model="form.email.value" v-else placeholder="john.doe@gmail.com"/>
      </IconField>
    </div>

    <div class="flex flex-col gap-2 mb-3">
      <label for="password">Mot de passe</label>
      <InputText type="password" id="password" v-model="form.password.value" v-if="!isEmailValid && hasBeenSubmit"
                 invalid/>
      <InputText type="password" id="password" v-model="form.password.value" v-else/>
    </div>

    <div class="flex flex-col gap-2">
      <label for="surname">Nom d'artiste</label>
      <InputText type="text" id="surname" v-model="form.surname.value" placeholder="Rome"
                 v-if="!isSurnameValid && hasBeenSubmit" invalid/>
      <InputText type="text" id="surname" v-model="form.surname.value" v-else placeholder="Rome"/>
    </div>

    <div class="flex flex-col gap-2">
      <label for="address">Adresse</label>
      <InputText type="text" id="address" v-model="form.place.value" placeholder="53 Cours Albert Thomas, 69003, Lyon"
                 v-if="!isPlaceValid && hasBeenSubmit" invalid/>
      <InputText type="text" id="address" v-model="form.place.value" v-else
                 placeholder="53 Cours Albert Thomas, 69003, Lyon"/>
    </div>

    <div class="flex flex-col gap-2">
      <label for="email">Liens</label>

    </div>

    <div class="flex flex-col gap-2">
      <label for="style">Styles</label>
      <AutoComplete v-model="form.styles.value" fluid multiple @complete="search" optionLabel="name" :suggestions="styles"/>
    </div>

    <Button type="submit" label="S'inscrire"/>
  </form>

</template>

<style scoped>

</style>