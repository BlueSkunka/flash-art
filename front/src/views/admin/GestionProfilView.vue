<script setup lang="ts">
  import {computed, onBeforeMount, ref, watch} from "vue";
  import {useToast} from "primevue/usetoast";
  import axios from "axios";
  import {useStylesStore} from "@/stores/styles";
  import {Address} from "@/entities/address";
  import {useAuthStore} from "@/stores/auth";
  import AddressFieldComponent from "@/components/AddressFieldComponent.vue";

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

  const validationStates = ref({
    isEmailValid: false,
    isFirstnameValid: false,
    isLastnameValid: false,
    isSurnameValid: false,
    isPlaceValid: false,
    isLinksValid: false,
    isStylesValid: false
  });

  // new data
  const newUrl = ref('');
  const newReseau = ref('');

  const addReseau = () => {
    ajoutReseau.value = true;
  }
  const cancelReseau = () => {
    ajoutReseau.value = false;
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

  // styles
  const selectedStyles = ref([]);
  const localStyle = ref([])
  const userStyle = ref([])

  // boolean button
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

  const search = async (event) => {
    await stylesStore.findAll(event.query)
  }


  async function deleteLink(index: number) {
    form.links.value.splice(index, 1);
    submit()
  }

  const handleAddressUpdateEvent = (data) => {
    form.place.value = data.address.label
    form.location.value = {
      type: 'Point', coordinates: data.address.coordinates }
  }


  async function submit() {
    validationStates.value.isFirstnameValid = form.firstname.value.trim() !== '';
    validationStates.value.isLastnameValid = form.lastname.value.trim() !== '';
    validationStates.value.isSurnameValid = form.surname.value.trim() !== '';
    validationStates.value.isPlaceValid = form.place.value && form.place.value.label && form.place.value.label.trim() !== '';
    validationStates.value.isLinksValid = form.links.value.length > 0;
    validationStates.value.isStylesValid = selectedStyles.value.length > 0;

    if (
        validationStates.value.isFirstnameValid &&
        validationStates.value.isLastnameValid &&
        validationStates.value.isSurnameValid &&
        validationStates.value.isPlaceValid &&
        validationStates.value.isLinksValid &&
        validationStates.value.isStylesValid
    ) {
      await axios.put(
          import.meta.env.VITE_BACKEND_URL + "/user",
          {
            firstname: form.firstname.value,
            lastname: form.lastname.value,
            surname: form.surname.value,
            place: form.place.value?.label,
            links: form.links.value,
            styles: selectedStyles.value,
            location: form.location.value,
          }
      )
          .then(response => {
            return response.status === 201
          })
          .catch(error => {
            if (error.response.status === 500) {
              toast.add({
                severity: 'error',
                summary: 'Statut 500',
                detail: 'Un erreur est survenue en back',
                life: 3000
              });
            } else {
              console.log(error)
            }
          })
      } else {
        toast.add({
          severity: 'error',
          summary: 'Formulaire invalide',
          detail: 'Certains champs sont pas bons...',
          life: 3000
        });
      }
    }

    watch(
        [form.firstname, form.lastname, form.email, form.place],
        () => {
          modificationInfo.value = true;
        }
    );
    watch(
        [form.surname, selectedStyles],
        () => {
          modificationTatoueur.value = true;
        }
    );
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
          <AddressFieldComponent :address="form.place.value" :invalid="!isPlaceValid && hasBeenSubmit" @addressUpdateEvent="handleAddressUpdateEvent"/>
        </div>
        <div class="mt-8 mb-10">
          <Button v-if="modificationInfo" label="Valider les modifications" severity="success" class="w-full"
                  @click="submit"/>
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
          <AutoComplete id="styles" multiple :suggestions="localStyle" field="name" v-model="selectedStyles"
                        @complete="search"/>
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
          <label for="links" class="block font-semibold mt-6">Mes liens</label>
          <div v-for="(link, index) in form.links.value" :key="index">
            <div class="flex items-center gap-2 justify-between my-2">
              <span>{{ link.name }}</span>
              <span>{{ link.url }}</span>
              <Button icon="pi pi-trash" label="Supprimer" severity="danger" @click="deleteLink(index)"/>
            </div>
          </div>
        </div>
        <div class="mt-8 mb-10">
          <Button v-if="modificationTatoueur" label="Valider les modifications" severity="success" class="w-full"
                  @click="submit"/>
        </div>
      </div>
    </div>
  </div>
</template>
