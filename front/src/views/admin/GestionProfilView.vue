<script setup lang="ts">
import {computed, onBeforeMount, onMounted, onUpdated, ref, watch} from "vue";
import {useToast} from "primevue/usetoast";
import axios from "axios";
import {useRouter} from "vue-router";
import {useStylesStore} from "@/stores/styles";
import {Address} from "@/entities/address";
import {useAuthStore} from "@/stores/auth";

const router = useRouter()
const toast = useToast();

const stylesStore = useStylesStore()
const userStore = useAuthStore()
const modificationInfo = ref(false);
const modificationTatoueur = ref(false);
const user = computed(() => userStore.user)

onBeforeMount(() => {
  fetchData();
})

const form = {
  firstname: ref(user.value?.firstname),
  lastname: ref(user.value?.lastname),
  email: ref(user.value?.email),
  password: ref(user.value?.password),
  surname: ref(user.value?.surname),
  place: ref<Address | null>(user.value?.place),
  links: ref<Link[]>(user.value?.links),
  styles: ref(user.value?.styles),
}

const newUrl = ref('');
const newReseau = ref('');

// const test = [
//   { _id: '668f85240349ed61a0c4def9', name: 'Celtique' },
//   { _id: '668f85240349ed61a0c4deea', name: 'Japanese (Irezumi)' }
// ]
const selectedStyles = ref([]);

const isPasswordValid = ref(false);
const isEmailValid = ref(false)
const isFirstnameValid = ref(false)
const isLastnameValid = ref(false)
const isSurnameValid = ref(false)
const isPlaceValid = ref(false)
const isLinksValid = ref(false)
const isStylesValid = ref(false)

const localStyle = ref([])
const userStyle = ref([])

const hasBeenSubmit = ref(false)

const ajoutReseau = ref(false);

const fetchData = async () => {
  await stylesStore.findAll()
  washing();
}

const washing = () => {
  localStyle.value = stylesStore.styles.map((style) => {
    return {
      _id: style._id,
      name: style.name
    }
  })
  userStyle.value = user.value?.styles.map((style) => {
    return {
      _id: style._id,
      name: style.name
    }
  })
  for (let i of userStyle.value) {
    selectedStyles.value.push(i)
  }
}

const addReseau = () => {
  ajoutReseau.value = true;
}

const cancelReseau = () => {
  ajoutReseau.value = false;
}

const search = async (event) => {
  await stylesStore.findAll(event.query)
}

const addresses = ref<Address[]>([])

function addLink() {
  ajoutReseau.value = false;
  form.links.value.push({
    name: newReseau.value,
    url: newUrl.value
  })
}

function deleteLink(index: number) {
  form.links.value.splice(index, 1)
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

  if (form.place.value !== null && form.place.value.label.trim() !== '') {
    isPlaceValid.value = true
  }

  if (form.links.value.length > 0) {
    isLinksValid.value = true
  }

  if (form.styles.value.filter((item, index) => form.links.value.indexOf(item) !== index).length > 0) {
    isStylesValid.value = true
  }

  // Inscription
  if (
      isFirstnameValid.value &&
      isLastnameValid.value &&
      isEmailValid.value &&
      isPasswordValid.value &&
      isSurnameValid.value &&
      isPlaceValid.value &&
      isLinksValid.value &&
      isStylesValid.value
  ) {
    const isRegistered = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/tattooers/register",
        {
          firstname: form.firstname.value,
          lastname: form.lastname.value,
          email: form.email.value,
          password: form.password.value,
          surname: form.surname.value,
          place: form.place.value?.label,
          links: form.links.value,
          styles: form.styles.value,
          location: {
            type: "Point",
            coordinates: [
              form.place.value?.coordinates.long,
              form.place.value?.coordinates.lat,
            ]
          },
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
          } else {
            console.log(error)
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

watch(
    [form.firstname, form.lastname, form.email, form.place],
    () => {
      modificationInfo.value = true;
    })
watch(
    [form.surname, form.styles],
    () => {
      modificationTatoueur.value = true;
    })
</script>

<template>
  <div class="container mx-auto px-32">
    <h1 class="text-3xl my-10 text-center">Gestion de mon profil</h1>

    <h2 class="text-2xl my-6">Mes informations</h2>

    <div class="container mx-auto px-60">
      <div class="flex flex-col gap-6 w-full sm:w-auto">
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-auto">
            <label for="lastname" class="block font-semibold mb-2">Nom</label>
            <InputText id="lastname" class="w-full" v-model="form.lastname.value"/>
          </div>
          <div class="flex-auto">
            <label for="firstname" class="block font-semibold mb-2">Prénom</label>
            <InputText id="firstname" class="w-full" v-model="form.firstname.value"/>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-1">
            <div class="flex-auto">
              <label for="mail" class="block font-semibold mb-2">Mail</label>
              <InputText id="mail" class="w-full" v-model="form.email.value"/>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex-auto">
              <label for="password" class="block font-semibold mb-2">Mot de passe</label>
              <InputText disabled id="password" class="w-full" type="password" value="password"/>
            </div>
          </div>
        </div>
        <div class="flex-auto">
          <label for="city" class="block font-semibold mb-2">Adresse</label>
          <InputText id="city" class="w-full" v-model="form.place.value"/>
        </div>
        <div class="mt-8 mb-10">
          <Button v-if="modificationInfo" label="Valider les modifications" severity="success" class="w-full" @click="submit"/>
        </div>
      </div>
    </div>


    <h2 class="text-2xl my-6">Mon profil visible</h2>
    <div class="container mx-auto px-60">
      <div class="flex flex-col gap-6 w-full sm:w-auto">
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-auto">
            <label for="pseudo" class="block font-semibold mb-2">Nom d'artiste</label>
            <InputText id="pseudo" class="w-full" v-model="form.surname.value"/>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <div class="flex-auto">
            <label for="styles" class="block font-semibold mb-2">Styles</label>
            <MultiSelect id="styles" v-model="selectedStyles" display="chip" :options="localStyle" optionLabel="name"
                         filter placeholder="Sélectionner des styles"
                         :maxSelectedLabels="10" class="w-full"/>
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
      <div class="mt-8 mb-10">
        <Button v-if="modificationTatoueur" label="Valider les modifications" severity="success" class="w-full" @click="submit"/>
      </div>
    </div>

    <h2 class="text-2xl my-6">Mes réseaux</h2>
    <div class="container mx-auto px-60">
      <div class="flex justify-end">
        <Button :disabled="ajoutReseau" label="Ajouter un réseau" icon="pi pi-plus" @click="addReseau"/>
      </div>
      <div v-for="link in form.links.value" :key="link">
        <div class="flex gap-4 mb-4 mt-2">
          <div class="flex flex-col sm:flex-row sm:items-center gap-6 w-54">
            <div class="flex-auto">
              <label for="pseudo" class="block font-semibold mb-2">Réseau</label>
              <InputText id="pseudo" class="w-full" v-model="link.name"/>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-6 w-full">
            <div class="flex-auto">
              <label for="pseudo" class="block font-semibold mb-2">URL</label>
              <InputText id="pseudo" class="w-full" v-model="link.url"/>
            </div>
          </div>
        </div>
        <div v-if="ajoutReseau">
          <div class="flex gap-4 my-4">
            <div class="flex flex-col sm:flex-row sm:items-center gap-6 w-54">
              <div class="flex-auto">
                <label for="pseudo" class="block font-semibold mb-2">Réseau</label>
                <InputText id="pseudo" class="w-full" v-model="newReseau" placeholder="Nom du réseau"/>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-6 w-full">
              <div class="flex-auto">
                <label for="pseudo" class="block font-semibold mb-2">URL</label>
                <InputText id="pseudo" class="w-full" v-model="newUrl" placeholder="Lien du réseau"/>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-end gap-6">
              <Button icon="pi pi-check" severity="success" @click="addLink"/>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-end gap-6">
              <Button icon="pi pi-times" severity="secondary" @click="cancelReseau"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>