<script setup lang="ts">
import {computed, onBeforeMount, ref, watch} from "vue";
import {useToast} from "primevue/usetoast";
import axios from "axios";
import {useRouter} from "vue-router";
import {useStylesStore} from "@/stores/styles";
import {Address} from "@/entities/address";
import {useAuthStore} from "@/stores/auth";
import AddressFieldComponent from "@/components/AddressFieldComponent.vue";

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
  firstname: ref(user.value?.firstname || ''),
  lastname: ref(user.value?.lastname || ''),
  email: ref(user.value?.email || ''),
  password: ref(user.value?.password || ''),
  surname: ref(user.value?.surname || ''),
  description: ref(user.value?.description || ''),
  place: ref<Address>(user.value?.place || new Address('')),
  links: ref(user.value?.links || []),
  styles: ref(user.value?.styles || []),
  location: ref(user.value?.location || new Address(null)),
}

const newUrl = ref('');
const newReseau = ref('');

const selectedStyles = ref([]);

const validationStates = ref({
  isEmailValid: false,
  isFirstnameValid: false,
  isLastnameValid: false,
  isSurnameValid: false,
  isPlaceValid: false,
  isLinksValid: false,
  isStylesValid: false
});

const localStyle = ref([])
const userStyle = ref([])

const hasBeenSubmit = ref(false)

const ajoutReseau = ref(false);

const fetchData = async () => {
  await stylesStore.findAll()
  washing();
  console.log(localStyle.value)
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

  console.log(localStyle.value)
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

function addLink() {
  ajoutReseau.value = false;
  form.links.value.push({
    name: newReseau.value,
    url: newUrl.value
  })
  newReseau.value = "";
  newUrl.value = "";

  submit();
}

async function deleteLink(index: number) {
  // try {
    form.links.value.splice(index, 1);
    // await saveChanges();

  //   toast.add({
  //     severity: 'success',
  //     summary: 'Lien supprimé',
  //     detail: 'Le lien a été supprimé avec succès.',
  //     life: 3000
  //   });
  // } catch (error) {
  //   // Handle errors if deletion or saving fails
  //   toast.add({
  //     severity: 'error',
  //     summary: 'Erreur',
  //     detail: 'Une erreur est survenue lors de la suppression du lien.',
  //     life: 3000
  //   });
  //   console.error(error);
  // }
}

// async function saveChanges() {
//   try {
//     await axios.put(`${import.meta.env.VITE_BACKEND_URL}/tattooers/${user.value.id}`, {
//       links: form.links.value,
//     });
//   } catch (error) {
//     // Handle error if backend save fails
//     console.error('Failed to save changes to backend:', error);
//     throw error;
//   }
// }

async function submit() {
  hasBeenSubmit.value = true

  validationStates.value.isFirstnameValid = form.firstname.value.trim() !== '';
  validationStates.value.isLastnameValid = form.lastname.value.trim() !== '';
  validationStates.value.isEmailValid = String(form.email.value).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  validationStates.value.isSurnameValid = form.surname.value.trim() !== '';
  validationStates.value.isPlaceValid = form.place.value && form.place.value.label && form.place.value.label.trim() !== '';
  validationStates.value.isLinksValid = form.links.value.length > 0;
  validationStates.value.isStylesValid = selectedStyles.value.length > 0;

  // Inscription
  if (
      validationStates.value.isFirstnameValid &&
      validationStates.value.isLastnameValid &&
      validationStates.value.isEmailValid &&
      validationStates.value.isSurnameValid &&
      validationStates.value.isPlaceValid &&
      validationStates.value.isLinksValid &&
      validationStates.value.isStylesValid
  ) {
    const isRegistered = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/tattooers/register",
        {
          firstname: form.firstname.value,
          lastname: form.lastname.value,
          email: form.email.value,
          surname: form.surname.value,
          place: form.place.value?.label,
          links: form.links.value,
          styles: selectedStyles.value,
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
    }
)
watch(
    [form.surname, selectedStyles],
    () => {
      modificationTatoueur.value = true;
    }
)

const handleAddressUpdate = (event: any) => {
  form.place.value = event.address.label;
  form.location.value = {
    type: "Point",
    coordinates : [event.address.coordinates.long, event.address.coordinates.lat]
  }
  console.log(form)
  validationStates.value.isPlaceValid = true;
}

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
          <AddressFieldComponent class="w-full" :show-label="false" :invalid="!validationStates.isPlaceValid" :address="form.place.value" @address-update-event="handleAddressUpdate"/>
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
        <div>
          <label for="description" class="block font-semibold mb-2">À propos de moi</label>
          <Textarea id="description" class="w-full" v-model="form.description.value" rows="5"/>
        </div>
        <div>
          <label for="styles" class="block font-semibold mb-2">Styles</label>
          <AutoComplete id="styles" multiple :suggestions="localStyle" field="name" v-model="selectedStyles" @complete="search"/>
        </div>
        <div>
          <label for="links" class="block font-semibold mb-2">Liens</label>
          <Button :disabled="ajoutReseau" icon="pi pi-plus" label="Ajouter un réseau" @click="addReseau"/>
          <div v-if="ajoutReseau" class="flex items-center gap-2 my-4">
            <InputText placeholder="Nom du réseau" v-model="newReseau"/>
            <InputText class="w-full" placeholder="Lien du réseau" v-model="newUrl"/>
            <Button icon="pi pi-check" class="" severity="success" @click="addLink"/>
            <Button icon="pi pi-times" class="" severity="secondary" @click="cancelReseau"/>
          </div>
          <div v-for="(link, index) in form.links.value" :key="index" class="mt-8">
            <div class="flex items-center gap-2">
              <span>{{ link.name }}</span>
              <Button icon="pi pi-trash" label="Supprimer" severity="danger" @click="deleteLink(index)"/>
            </div>
          </div>
        </div>
        <div class="mt-8 mb-10">
          <Button v-if="modificationTatoueur" label="Valider les modifications" severity="success" class="w-full" @click="submit"/>
        </div>
      </div>
    </div>
  </div>
</template>
