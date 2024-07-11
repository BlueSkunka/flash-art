<template>
  <div class="flex flex-col">
    <Menubar :model="items" class="px-52 bg-zinc-900 m-0 rounded-none text-white border-0">
      <template #start>
        <button class="mr-10" @click="goHome">
          <h1>Logo</h1>
        </button>
      </template>
      <template #item="{ item, props }">
        <a v-ripple class="flex items-center" v-bind="props.action">
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <Button outlined label="Connexion" @click="goLogin" class="mr-3"/>
        <Button label="S'inscrire" @click="goRegister"/>
      </template>
    </Menubar>
  </div>

  <main class="flex-grow">
    <router-view></router-view>
  </main>

  <footer class="bg-zinc-900 text-white text-center py-3">
    <small>ici un footer</small>
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
  router.push({name: "login"});
};

const goRegister = () => {
  router.push({name: "register"});
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
