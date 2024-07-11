<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

const navigateCustomer = () => {
  router.push("/login/customer")
}

const navigateTattooer = () => {
  router.push("/login/tattooer")
}
</script>

<template>
  <section class="container mx-auto py-10">
    <h1 class="text-2xl font-bold mb-5 text-center">Qui êtes vous ?</h1>
    <Splitter style="height: 300px" class="mb-8">
      <SplitterPanel class="flex items-center justify-center">
        <div>
          <h2 class="text-2xl font-bold uppercase text-center mb-5">Un client</h2>
          <Button label="Se connecter en tant que client" @click="navigateCustomer"/>
        </div>
      </SplitterPanel>
      <SplitterPanel class="flex items-center justify-center">
        <div>
          <h2 class="text-2xl font-bold uppercase text-center mb-5">Un tatoueur</h2>
          <Button label="Se connecter en tant que tatoueur" @click="navigateTattooer"/>
        </div>
      </SplitterPanel>
    </Splitter>
  </section>
</template>

<style scoped>

</style>