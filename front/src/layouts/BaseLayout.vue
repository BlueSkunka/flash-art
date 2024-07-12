<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
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
        <div v-if="!user">
          <Button outlined label="Connexion" @click="goLogin" class="mr-3"/>
          <Button label="S'inscrire" @click="goRegister"/>
        </div>
        <Button v-else label="Se déconnecter" @click="logout"/>
      </template>
    </Menubar>

    <!-- Main content -->
    <main class="flex-grow">
      <router-view></router-view>
    </main>
  <footer class="bg-zinc-900 text-white text-center py-3">
        2024 © FlashArt Association - Powered by Atomic Dev 
    </footer>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore()

const user = computed(() => authStore.user)

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

const logout = () => {
  authStore.logout()
  router.push({name: "home"});

}


const items = ref([]);

if (user.value !== null) {
  items.value = [
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
        router.push({name: "reservations"});
      }
    }
  ]
} else {
  items.value = [
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
    }
  ]
}
</script>

<style scoped>
</style>
