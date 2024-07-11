<template>
  <Menubar :model="items" class="px-52">
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
      <Button label="Se deconnecter" @click="goLogout"/>
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
import {useAuthStore} from "@/stores/auth";


const router = useRouter();
const authStore = useAuthStore()

const goHome = () => {
  router.push('/admin');
};

const goLogin = () => {
  router.push('/login');
};

const goLogout = () => {
  authStore.logout()
  router.push({name: 'home'})
}

const items = ref([
  {
    label: 'Mes flashs',
    command: () => {
      router.push('/admin/flashs');
    }
  },
  {
    label: 'Mes réservations',
    command: () => {
      router.push('/admin/reservations');
    }
  },
  {
    label: 'Mon profil',
    command: () => {
      router.push('/admin/profil');
    }
  },
]);
</script>
