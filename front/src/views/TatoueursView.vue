<script setup lang="ts">
import { ref } from 'vue';

const value = ref('Style 1');
const options = ref(
    [
        'Style 1',
        'Style 2', 
        'Style 3', 
        'Petit moyen style 1', 
        'Moyen style 1', 
        'Géant style tendance 1',
        'Petit moyen style 2',
        'Style 4',
        'Style 5',
        'Géant style tendance 2',
        'Moyen style 2', 
        'Style 6',
        'Style 7',
        'Moyen style 3  ',
        'Petit moyen Style 3'
    ]);
</script>

<template>
    <div class="flex flex-col m-6">

        <!-- Titre -->
        <div class="text-center m-4">
            <h1 class="text-6xl">Les tatoueurs</h1>
            <div class="flex justify-end pr-6">
                <button class="tri flex items-center gap-2">
                    Trier par
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </button>
            </div>
            <div class="button-group">
                <button
                    v-for="option in options"
                    :key="option"
                    :class="['custom-button', { 'selected': option === value }]"
                    @click="value = option"
                >
                {{ option }}
                </button>
            </div>
        </div>
    

    
        <div class="grid grid-cols-4 gap-4 justify-items-center m-8">
            <div v-for="index in 8" :key="index">
                <CardComponent />
            </div>
        </div>
    </div>
    
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