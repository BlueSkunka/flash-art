<template>
  <div class="bg-gray-300 py-24">
    <div class="w-1/3 mx-auto">
      <h1 class="text-center text-3xl">Un tatoueur ? Un flash ? Une idée ?</h1>
      <InputGroup class="my-12">
        <!-- TODO recherche globale -->
        <InputText placeholder="Rechercher ce qui vous plaît"/>
        <Button icon="pi pi-search"/>
      </InputGroup>
    </div>
  </div>

    <div class="bg-[url('illu-tatoueur.jpg')] bg-cover my-5 bg-opacity-50">
      <div class="bg-black py-24 opacity-75">
        <div class="w-3/4 mx-auto text-white">
          <h1 class="text-center text-3xl mb-12">Des artistes de grande renomée</h1>
          <h2 class="text-2xl my-5">Nom du tatoueur</h2>
          <h3 class="text-xl w-2/3">Description du tatoueur "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</h3>
          <Button class="mt-4" label="Voir les créations" />
          <!-- TODO affichage de tout les tatoueurs un par un -->
        </div>
      </div>
    </div>


  <div class="bg-gray-300 py-24">
    <div class="w-3/4 mx-auto flex justify-around">
      <div>
        <h1 class="text-center text-3xl">Un tatoueur près de chez vous</h1>
        <!-- TODO rechercher une ville -->
        <div class="mt-48">
          <h2 class="text-2xl mb-6">Trouvez un tatoueur en guest ou proche de chez vous</h2>
          <InputGroup>
            <InputText placeholder="Keyword"/>
            <Button icon="pi pi-search"/>
          </InputGroup>
        </div>
      </div>
      <div class="w-1/3">
        <img src="../assets/drapeau-france.png" alt="photo de la france"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccueilView',
};
</script>
