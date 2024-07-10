<script setup lang="ts">
import {ref} from 'vue';

const liked = ref(false);

const toggleLike = () => {
  liked.value = !liked.value;
};

const rating = ref(4);

const props = defineProps<{
  showTitle: boolean;
  showSubtitle: boolean;
  showMultiple: boolean;
  title: string
  subtitle: string
  styles: Style[]
}>();

const value1 = ref('20/07/2024');

</script>

<template>
    <Card style="width: 20rem; overflow: hidden; margin-bottom: 5rem;">
      <template #header>
        <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
      </template>
      <template #title v-if="showTitle">{{ props.title }}
        <div class="text-xl font-normal">150 €</div>
      </template>
      <template #subtitle v-if="showSubtitle">
        {{ subtitle }}
        <Rating v-model="rating" readonly class="mt-4" :cancel="false" />
      </template>
      <template #content>
        <div class="flex items-center justify-between">
          <div class="flex gap-4">
            <Tag :value="style.name" v-for="style in styles"></Tag>
          </div>
          <button class="like-button" @click="toggleLike">
            <i v-if="liked" class="pi pi-heart-fill filled"></i>
            <i v-else class="pi pi-heart"></i>
          </button>
        </div>
        <div class="flex justify-between border-2 rounded p-3 items-center my-4">
          <div>20/07/2024</div>
          <i class="pi pi-calendar" />
        </div>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1 pt-0">
          <Button :label="showMultiple ? 'Voir les flashs' : 'Voir le flash'" class="w-full" />
        </div>
      </template>
    </Card>
  </template>
  
  <style scoped>
  .like-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 2rem;
    color: #ccc;
    transition: color 0.3s;
  }
  
  .like-button:hover {
    color: #f44336;
  }
  
  .filled {
    color: #f44336;
  }
  </style>
  