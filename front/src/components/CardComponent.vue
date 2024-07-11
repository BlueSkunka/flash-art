<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from 'vue';

const router = useRouter();
const liked = ref(false);

const toggleLike = () => {
  liked.value = !liked.value;
};

const rating = ref(4);

const props = defineProps<{
  showTitle: boolean;
  showSubtitle: boolean;
  showMultiple: boolean;
  showDate: boolean;
  _id: string
  title: string
  subtitle: string
  description: string
  styles: Style[]
}>();

</script>

<template>
  <router-link :to="{name: 'tattoer_detail', params: {id: _id}}">
    <Card style="width: 20rem; overflow: hidden; margin-bottom: 5rem;">
      <template #header>
        <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
      </template>
      <template #title v-if="showTitle">{{ props.title }}
        <div class="text-xl font-normal">{{ props.description }}</div>
      </template>
      <template #subtitle v-if="showSubtitle">
        {{ subtitle }}
        <Rating v-model="rating" readonly class="mt-4" :cancel="false" />
      </template>
      <template #content>
        <div class="flex items-center justify-between">
          <div class="flex gap-4">
            <Tag severity="warning" :value="style.name" v-for="style in styles"></Tag>
          </div>
          <button class="like-button" @click="toggleLike">
            <i v-if="liked" class="pi pi-heart-fill filled"></i>
            <i v-else class="pi pi-heart"></i>
          </button>
        </div>
      </template>
    </Card>
  </router-link>
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
  