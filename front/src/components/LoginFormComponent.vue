<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useToast} from "primevue/usetoast";

const toast = useToast();

const auth = useAuthStore()

const form = {
  email: ref(""),
  password: ref("")
}

const isPasswordValid = ref(false);
const isEmailValid = ref(false)

async function submit() {

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

  if (isEmailValid.value && isPasswordValid.value) {
    const isLogged = await auth.login(form.email.value, form.password.value)

    if (false === isLogged) {
      toast.add({severity: 'warn', summary: 'Erreur', detail: 'Identifiant invalide'});
    }
  }
}
</script>

<template>
  <Toast/>

  <div class="flex flex-col gap-2">
    <label for="email">Email</label>
    <IconField iconPosition="left">
      <InputIcon>
        <i class="pi pi-envelope"/>
      </InputIcon>


      <InputText id="email" v-model="form.email.value" v-if="!isEmailValid" invalid/>
      <InputText id="email" v-model="form.email.value" v-else placeholder="Email"/>
    </IconField>
  </div>


  <div class="flex flex-col gap-2 mb-3">
    <label for="password">Mot de passe</label>
    <Password inputId="password" toggleMask v-model="form.password.value"/>
  </div>

  <Button label="Se connecter" @click="submit"/>
</template>

<style scoped>

</style>