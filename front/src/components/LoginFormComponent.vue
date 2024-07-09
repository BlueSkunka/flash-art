<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";

const toast = useToast();

const auth = useAuthStore()

const form = {
  email: ref(""),
  password: ref("")
}

const isPasswordValid = ref(false);
const isEmailValid = ref(false)

let urlParams = new URLSearchParams(window.location.search);
const isRegistered = urlParams.get('isRegistered')

onMounted(() => {
  if (isRegistered === '1') {
    toast.add({
      severity: 'success',
      summary: 'Compte créé',
      detail: 'Votre compte a été créé vous pouvez maintenant vous connectez',
      life: 3000
    });
  }
})

async function submit(e: Event) {
  e.preventDefault()

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
      toast.add({
        severity: 'warn',
        summary: 'Erreur',
        detail: 'Identifiant invalide',
        life: 3000
      });
    }
  }
}
</script>

<template>
  <Toast/>

  <form @submit="submit">
    <div class="flex flex-col gap-2">
      <label for="email">Email</label>
      <IconField iconPosition="left">
        <InputIcon>
          <i class="pi pi-envelope"/>
        </InputIcon>


        <InputText type="email" id="email" v-model="form.email.value" v-if="!isEmailValid" invalid/>
        <InputText type="email" id="email" v-model="form.email.value" v-else placeholder="Email"/>
      </IconField>
    </div>


    <div class="flex flex-col gap-2 mb-3">
      <label for="password">Mot de passe</label>
      <InputText type="password" id="password" v-model="form.password.value"/>
    </div>

    <Button type="submit" label="Se connecter"/>
  </form>

</template>

<style scoped>

</style>