<script setup lang="ts">

import LoginFormComponent from "@/components/LoginFormComponent.vue";
import RegisterFormComponent from "@/components/UserRegisterFormComponent.vue";
import Role from "@/enums/role";
</script>

<template>
  <section class="container mx-auto py-10">
    <h1 class="text-3xl font-bold mb-5">
      Se connecter
    </h1>

    <LoginFormComponent :role="Role.TATTOOER"/>
  </section>
</template>

<style scoped>

</style>