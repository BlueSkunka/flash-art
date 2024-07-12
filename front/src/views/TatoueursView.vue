<script setup lang="ts">
import {computed, ref} from 'vue';
import {useTattooersStore} from "@/stores/tattooers";
import {useStylesStore} from "@/stores/styles";
import { url } from 'inspector';

const tattooersStore = useTattooersStore()
const stylesStore = useStylesStore()

const value = ref('Tous');
const options = computed(() => stylesStore.styles)
const tattooers = computed(() => tattooersStore.tattooers)
const isLoadingTattoers = computed(() => tattooersStore.isLoading)
const isLoadingStyles = computed(() => stylesStore.isLoading)

const filterTattooers = async (style: string|null = null) => {
  value.value = style
  await tattooersStore.findAll(style)
}

const fetchData = async () => {
  await stylesStore.findAll()
  await tattooersStore.findAll()
}

fetchData()

</script>

<template>
  <section v-if="isLoadingTattoers && isLoadingStyles">
    <ProgressSpinner/>
  </section>
  <section v-else>
    <div class="flex flex-col m-6">

      <!-- Titre -->
      <div class="text-center">
        <h1 class="text-3xl my-12">Les tatoueurs</h1>
        <div class="button-group">
          <button
              key="Tous"
              :class="['custom-button', { 'selected': 'Tous' === value }]"
              @click="filterTattooers"
          >Tous
          </button>
          <button
              v-for="option in options"
              :key="option.name"
              :class="['custom-button', { 'selected': option.name === value }]"
              @click="filterTattooers(option.name)"
          >
            {{ option.name }}
          </button>
        </div>
      </div>


        <div class="grid grid-cols-4 gap-4 justify-items-center m-8" v-if="!isLoadingTattoers">
          <div v-if="tattooers.length > 0" v-for="(tattooer, index) in tattooers" :key="index" >
            <CardComponent :showTitle="true" :showSubtitle="false" :showMultiple="true" :subtitle="tattooer.surname" :showDate="false"
                           :styles="tattooer.styles" :title="tattooer.surname" :description="tattooer.description" :url="'/tatoueurs/'+ tattooer._id"/>
          </div>
          <div v-else>
            <p class="text-center"><b>Aucun résultat</b></p>
          </div>
        </div>
        <ProgressSpinner v-else/>

    </div>
  </section>
    
</template>

<style>
.button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    width: auto;
    justify-content: center;
    margin: 50px 0 10px 0;
  }
  
  .custom-button {
    padding: 0.5rem 1rem;
    background-color: transparent;
    color: #333;
    cursor: pointer;
    border-radius: 10px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .tri:hover, .custom-button:hover {
    background-color: rgb(248, 248, 248);
  }
  
  .custom-button.selected {
    background-color: rgb(236, 236, 236);
    font-weight: 700;
    border-radius: 10px;
  }
  
  .custom-button:focus {
    outline: none;
  }

  .tri {
    border: 0;
    outline: 0;
    cursor: pointer;
    color: rgb(60, 66, 87);
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    padding: 4px 8px;
    display: inline-block;
    min-height: 28px;
    transition: background-color .24s,box-shadow .24s;
    :hover {
        box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 3px 9px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
    }
    padding: 8px;
  }
</style>