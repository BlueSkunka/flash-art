<script setup lang="ts">

import LoginFormComponent from "@/components/LoginFormComponent.vue";
import RegisterFormComponent from "@/components/UserRegisterFormComponent.vue";
import Role from "@/enums/role";
</script>

<template>
  <section class="container mx-auto flex flex-col items-center justify-center mt-40">
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-5">
        Se connecter
      </h1>
    </div>

    <LoginFormComponent :role="Role.TATTOOER"/>
  </section>
</template>

<style scoped>

</style>