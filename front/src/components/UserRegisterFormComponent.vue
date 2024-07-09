<script setup lang="ts">
import {ref} from "vue";
import {useToast} from "primevue/usetoast";
import axios from "axios";
import {useRouter} from "vue-router";


const router = useRouter()
const toast = useToast();

const form = {
  firstname: ref(""),
  lastname: ref(""),
  email: ref(""),
  password: ref(""),
}

const isPasswordValid = ref(false);
const isEmailValid = ref(false)
const isFirstnameValid = ref(false)
const isLastnameValid = ref(false)

const hasBeenSubmit = ref(false)

async function submit(e: Event) {
  e.preventDefault()
  hasBeenSubmit.value = true

  // validation du formulaire
  if (String(form.email.value)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
    isEmailValid.value = true
  }

  if (form.firstname.value.trim() !== '') {
    isFirstnameValid.value = true
  }

  if (form.lastname.value.trim() !== '') {
    isLastnameValid.value = true
  }

  if (form.password.value.trim() !== '') {
    isPasswordValid.value = true
  }


  // Inscription
  if (
      isEmailValid.value &&
      isPasswordValid.value &&
      isFirstnameValid.value &&
      isLastnameValid.value
  ) {
    const isRegistered = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/register",
        {
          firstname: form.firstname.value,
          lastname: form.lastname.value,
          email: form.email.value,
          password: form.password.value,
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
      <label for="email">Prénom</label>
      <InputText type="text" id="email" v-model="form.firstname.value" placeholder="Mathis"
                 v-if="!isFirstnameValid && hasBeenSubmit" invalid/>
      <InputText type="text" id="email" v-model="form.firstname.value" v-else placeholder="Mathis"/>
    </div>

    <div class="flex flex-col gap-2">
      <label for="email">Nom</label>
      <InputText type="text" id="email" v-model="form.lastname.value" placeholder="Rome"
                 v-if="!isLastnameValid && hasBeenSubmit" invalid/>
      <InputText type="text" id="email" v-model="form.lastname.value" v-else placeholder="Rome"/>
    </div>

    <div class="flex flex-col gap-2">
      <label for="email">Email</label>
      <IconField iconPosition="left">
        <InputIcon>
          <i class="pi pi-envelope"/>
        </InputIcon>


        <InputText type="email" id="email" v-model="form.email.value" placeholder="Email"
                   v-if="!isEmailValid && hasBeenSubmit" invalid/>
        <InputText type="email" id="email" v-model="form.email.value" v-else placeholder="Email"/>
      </IconField>
    </div>


    <div class="flex flex-col gap-2 mb-3">
      <label for="password">Mot de passe</label>
      <InputText type="password" id="password" v-model="form.password.value" v-if="!isEmailValid && hasBeenSubmit"
                 invalid/>
      <InputText type="password" id="password" v-model="form.password.value" v-else/>
    </div>

    <Button type="submit" label="S'inscrire"/>
  </form>

</template>

<style scoped>

</style>