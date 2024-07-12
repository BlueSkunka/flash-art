<template>
  <div class="w-60 h-60">
    <div class="w-full flex items-center justify-center" @click="goToDetailFlash">
      <Image alt="Image" preview class="object-cover">
        <template #indicatoricon @click="goToDetailFlash">
          <div class="block">
            <p class="italic my-2 opacity-75">{{ props.flash.name }}</p>
            <p class="italic my-2 opacity-75">{{ date.toLocaleDateString() }}</p>
            <p class="text-white">Voir le flash</p>
          </div>
        </template>
        <template #image>
  <!--        <img :src="props.imageFlashUrl" alt="image" />-->
          <img src="../assets/illu-tatoueur.jpg" alt="image" />
        </template>
      </Image>
    </div>
  </div>
</template>

<script setup>
import { Flash } from '@/entities/flash';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

  const router = useRouter();

  const props = defineProps({
    flash: Flash
  })

  const date = computed(() => new Date(props.flash.flashDate))

  const goToDetailFlash = () => {
    router.push('/flashs/' + props.flash._id)
  }

</script>