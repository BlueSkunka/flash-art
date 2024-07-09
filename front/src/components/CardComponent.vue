<template>
    <Card style="width: 20rem; overflow: hidden; margin-bottom: 5rem;">
      <template #header>
        <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
      </template>
      <template #title v-if="showTitle">Jean Neymar</template>
      <template #subtitle v-if="showSubtitle">
        Lyon, France
        <Rating v-model="rating" readonly class="mt-4" :cancel="false" />
      </template>
      <template #content>
        <div class="flex items-center justify-between">
          <div class="flex gap-4">
            <Tag value="Style 1"></Tag>
            <Tag value="Petit moyen style 1"></Tag>
          </div>
          <button class="like-button" @click="toggleLike">
            <i v-if="liked" class="pi pi-heart-fill filled"></i>
            <i v-else class="pi pi-heart"></i>
          </button>
        </div>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1 pt-0">
          <Button :label="showMultiple ? 'Voir les flashs' : 'Voir le flash'" class="w-full" />
        </div>
      </template>
    </Card>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const liked = ref(false);
  
  const toggleLike = () => {
    liked.value = !liked.value;
  };
  
  const rating = ref(4);
  
  const props = defineProps<{
    showTitle: boolean;
    showSubtitle: boolean;
    showMultiple: boolean;
  }>();
  </script>
  
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
  