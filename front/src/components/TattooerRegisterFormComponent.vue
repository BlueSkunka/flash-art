<script setup lang="ts">
import {computed, ref} from "vue";
import {useToast} from "primevue/usetoast";
import axios from "axios";
import {useRouter} from "vue-router";
import {useStylesStore} from "@/stores/styles";
import {Address} from "@/entities/address";


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
  place: ref<Address | null>(null),
  links: ref<Link[]>([]),
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
                {
                  long: item.geometry.coordinates[0],
                  lat: item.geometry.coordinates[1]
                },
                item.properties.label
            )

            dataAddress.push(address)
          })

          return dataAddress
        })
        .catch(error => console.log(error))
  }
}

function addLink() {
  form.links.value.push({
    name: "",
    url: ""
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

  if (form.description.value.trim() !== '') {
    isDescriptionValid.value = true
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
      isStylesValid.value &&
      isDescriptionValid.value
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
          description: form.description.value,
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

    <div class="flex flex-col gap-2 mt-5">
      <label for="lastname">Nom</label>
      <InputText type="text" id="lastname" v-model="form.lastname.value" placeholder="Rome"
                 v-if="!isLastnameValid && hasBeenSubmit" invalid/>
      <InputText type="text" id="lastname" v-model="form.lastname.value" v-else placeholder="Rome"/>
    </div>

    <div class="flex flex-col gap-2 mt-5">
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

    <div class="flex flex-col gap-2 mt-5">
      <label for="password">Mot de passe</label>
      <Password inputId="password" v-model="form.password.value" v-if="!isPasswordValid && hasBeenSubmit"
                 invalid/>
      <Password inputId="password" v-model="form.password.value" v-else/>
    </div>

    <div class="flex flex-col gap-2 mt-5">
      <label for="surname">Nom d'artiste</label>
      <InputText type="text" id="surname" v-model="form.surname.value" placeholder="Rome"
                 v-if="!isSurnameValid && hasBeenSubmit" invalid/>
      <InputText type="text" id="surname" v-model="form.surname.value" v-else placeholder="Rome"/>
    </div>

    <div class="flex flex-col gap-2 mt-5">
      <label for="address">Adresse</label>
      <AutoComplete inputClass="w-full" inputId="address" v-model="form.place.value" @complete="findAddress" optionLabel="label"
                    :suggestions="addresses" v-if="!isPlaceValid && hasBeenSubmit" invalid/>

      <AutoComplete inputClass="w-full" inputId="address" v-model="form.place.value" @complete="findAddress"
                    optionLabel="label"
                    :suggestions="addresses" v-else/>
      <small>Renseigner au moins 4 caractères</small>
    </div>

    <div class="flex flex-col gap-2 mt-5">
      <label for="email">Liens</label>
      <Message severity="error" v-if="!isLinksValid && hasBeenSubmit">Vous devez renseigner au moins un lien</Message>
      <ul class="flex flex-col gap-5">
        <li v-for="(link, index) in form.links.value">
          <Panel :header="'Lien' + (index + 1)" :toggleable="true">
            <template #icons>
              <button type="button" class="p-panel-header-icon p-link mr-2" @click="deleteLink(index)">
                <span class="pi pi-trash"></span>
              </button>
            </template>
            <div class="flex flex-col gap-2">
              <label :for="'linkName' + (index + 1)">Nom du lien</label>
              <InputText type="text" :id="'linkName' + (index + 1)" v-model="link.name" placeholder="Instagram"/>
            </div>
            <div class="flex flex-col gap-2 mt-3">
              <label :for="'linkUrl' + (index + 1)">Url</label>
              <InputText type="text" :id="'linkUrl' + (index + 1)" v-model="link.url" placeholder="Instagram"/>
            </div>
          </Panel>
        </li>
      </ul>
      <Button label="Ajouter un lien" @click="addLink" class="w-fit"/>
    </div>

    <div class="flex flex-col gap-2 mt-5">
      <label for="style">Styles</label>
      <AutoComplete v-model="form.styles.value" fluid multiple @complete="search" optionLabel="name"
                    :suggestions="styles"/>
    </div>

    <div class="flex flex-col gap-2 mt-5">
      <label for="description">Description</label>
      <Textarea type="text" id="description" v-model="form.description.value"
                v-if="!isDescriptionValid && hasBeenSubmit" invalid/>
      <Textarea type="text" id="surname" v-model="form.description.value" v-else/>
    </div>

    <Button type="submit" label="S'inscrire" class="mt-5"/>
  </form>

</template>

<style scoped>

</style>