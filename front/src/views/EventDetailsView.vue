<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col m-6">

        <div class="flex inline-block pl-10">
            <button class="flex items-center gap-2">
                <i class="pi pi-arrow-left"/>
                Retour aux évènements
            </button>
        </div>

        <!-- Titre -->
        <div class="text-center m-4">
            <h1 class="text-6xl">Ink Factory</h1>
        </div>

        <div v-for="index in 2" :key="index">

            <div class="flex justify-between pr-10 mt-16 pl-10">
                <div class="text-4xl">
                    <a href="#">{{ index === 2 ? "Jean Neymar le jumeau" : "Jean Neymar" }}</a>
                </div>
                <button class="tri flex items-center gap-2">
                    Trier par
                    <i class="pi pi-angle-down" style="font-size: 12px"></i>
                </button>
            </div>

            <div class="grid grid-cols-4 gap-4 justify-items-center m-8">
                <div v-for="cardIndex in 8" :key="cardIndex">
                    <CardComponent />
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>

</style>
