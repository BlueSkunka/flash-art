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
}

const isPasswordValid = ref(false);
const isEmailValid = ref(false)
const isFirstnameValid = ref(false)
const isLastnameValid = ref(false)
const isSurnameValid = ref(false)
const isPlaceValid = ref(false)
const isLinksValid = ref(false)
const isStylesValid = ref(false)

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
</script>

<template>
  <div class="container mx-auto px-32">
  <h1 class="text-3xl my-10 text-center">Gestion de mon profil</h1>

  <h2 class="text-2xl my-6">Mes informations</h2>
  
  <div class="container mx-auto px-60">
      <div class="flex flex-col gap-6 w-full sm:w-auto">
          <div class="flex flex-col sm:flex-row sm:items-center gap-6">
              <div class="flex-auto">
                  <label for="firstname" class="block font-semibold mb-2">Nom</label>
                  <InputText id="firstname" class="w-full" />
              </div>
              <div class="flex-auto">
                  <label for="lastname" class="block font-semibold mb-2">Prénom</label>
                  <InputText id="lastname" class="w-full" />
              </div>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-6">
              <div class="flex-1">
                <div class="flex-auto">
                    <label for="mail" class="block font-semibold mb-2">Mail</label>
                    <InputText id="mail" class="w-full" />
                </div>
              </div>
              <div class="flex-1">
                <div class="flex-auto">
                    <label for="password" class="block font-semibold mb-2">Mot de passe</label>
                    <InputText id="password" class="w-full" />
                </div>
              </div>
          </div>
          <div class="flex-auto">
              <label for="city" class="block font-semibold mb-2">Ville</label>
              <InputText id="city" class="w-full" />
          </div>
      </div>
  </div>


  <h2 class="text-2xl my-6">Mon profil visible</h2>
  <div class="container mx-auto px-60">
    <div class="flex flex-col gap-6 w-full sm:w-auto">
          <div class="flex flex-col sm:flex-row sm:items-center gap-6">
              <div class="flex-auto">
                  <label for="pseudo" class="block font-semibold mb-2">Nom d'artiste</label>
                  <InputText id="pseudo" class="w-full" />
              </div>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-6">
              <div class="flex-auto">
                  <label for="styles" class="block font-semibold mb-2">Styles</label>
                  <MultiSelect id="styles" v-model="selectedStyles" display="chip" :options="styles" optionLabel="styles" filter placeholder="Sélectionner des styles"
                  :maxSelectedLabels="10" class="w-full" />
              </div>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center gap-6">
              <div class="flex-auto">
                  <label for="avatar" class="block font-semibold mb-2">Photo de profil</label>
                  <FileUpload id="avatar" mode="basic" name="demo[]" url="/api/upload" accept="image/*" customUpload @uploader="customBase64Uploader" />
              </div>
          </div>
    </div>
  </div>

  <h2 class="text-2xl my-6">Mes réseaux</h2>
  <div class="container mx-auto px-60">

  </div>

</div>
</template>

<script setup>
import { ref } from "vue";

const selectedStyles = ref();
const styles = ref([
    { name: 'Style 1', code: 'STY1' },
    { name: 'Style 2', code: 'STY2' },
    { name: 'Style 3', code: 'STY3' },
    { name: 'Style 4', code: 'STY4' },
    { name: 'Style 5', code: 'STY5' }
]);

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