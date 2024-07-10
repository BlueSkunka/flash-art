<script setup lang="ts">
import { ref } from 'vue';

const rating = ref(4);
</script>

<template>
    <div class="flex justify-center" v-for="index in 6" :key="index">
    <div class="box">
           <div class="flex items-center gap-2">
               <Avatar label="P" class="mr-2" size="large" shape="circle" />
               <p>User un peu relou</p>    
           </div>
           <Rating v-model="rating" readonly class="mt-4 mb-2" :cancel="false" />
           <p class="font-medium">Pas ouf franchement ceux tatoueur</p>
           <p>Je me sui fais tatoué, mais c moch et j’arriv pa à l’enlever avec de la javel</p>
       </div>
   </div> 
</template>

<style>
.box {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    padding: 2rem;
    width: 60%;
    margin: 2rem 0 2rem 0;
}
</style>