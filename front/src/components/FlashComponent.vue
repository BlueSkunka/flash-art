<template>
  <div class="w-52 h-52 flex items-center justify-center">
    <Image alt="Image" preview @click="GoToDetailFlash" class="">
      <template #indicatoricon>
        <div class="block">
          <p class="italic my-2 opacity-75">{{ props.nomFlash }}</p>
          <p class="text-white">Voir le flash</p>
        </div>
      </template>
      <template #image>
<!--        <img :src="props.imageFlashUrl" alt="image" />-->
        <img src="../assets/illu-tatoueur.jpg" alt="image" />
      </template>
    </Image>
  </div>
</template>

<script setup>
  const props = defineProps({
    imageFlashUrl: String,
    nomFlash: String,
  })

  const GoToDetailFlash = () => {
    //la route vers le flash
  }

</script>