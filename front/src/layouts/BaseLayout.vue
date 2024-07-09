<template>
  <Menubar :model="items" class="px-52">
    <template #start>
      <div class="mr-10" @click="goHome">
        <h1>Logo</h1>
      </div>
    </template>
    <template #item="{ item, props }">
      <a v-ripple class="flex items-center" v-bind="props.action">
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
    <template #end>
      <Button label="Connexion" @click="goLogin"/>
    </template>
  </Menubar>

  <main>
    <router-view></router-view>
  </main>

  <footer>

  </footer>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";


const router = useRouter();

const goHome = () => {
  router.push('/');
};

const goLogin = () => {
  router.push('/login');
};

const items = ref([
  {
    label: 'Les tatoueurs',
    command: () => {
      router.push('/tatoueurs');
    }
  },
  {
    label: 'Les flashs',
    command: () => {
      router.push('/flashs');
    }
  },
  {
    label: 'Mes réservations',
    command: () => {
      router.push('/reservations');
    }
  },
]);
</script>
