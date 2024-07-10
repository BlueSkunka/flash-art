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