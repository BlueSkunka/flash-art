<script setup lang="ts">
import CommentComponent from '@/components/CommentComponent.vue';
import CardComponent from '@/components/CardComponent.vue';
import {computed, onMounted, ref} from 'vue';
import { useRoute} from "vue-router";
import {useTattooersStore} from "@/stores/tattooers";
import {Network} from "@/enums/network";
import {useFlashesStore} from "@/stores/flashes";
import {useOpinionStore} from "@/stores/opinions";
import FlashComponent from "@/components/FlashComponent.vue";

const route = useRoute()
const tattooerStore = useTattooersStore()
const flashStore = useFlashesStore()
const opinionStore = useOpinionStore()

const tattooer = computed(() => tattooerStore.tattooer)
const flashes = computed(() => flashStore.flashes)
const opinions = computed(() => opinionStore.opinions)
const avgRating = computed(() => opinionStore.average);

onMounted(() => {
  const id = route.params.id

  if (typeof id === "string") {
    tattooerStore.findOne(id)
  }
})

const getNetwork = (name: string) => {
  if (name === Network.FACEBOOK.name) return Network.FACEBOOK.icon
  if (name === Network.INSTAGRAM.name) return Network.INSTAGRAM.icon
  if (name === Network.X.name) return Network.X.icon
  if (name === Network.PINTEREST.name) return Network.PINTEREST.icon
  if (name === Network.TIKTOK.name) return Network.TIKTOK.icon

  return 'pi pi-globe'
}


const scrollToAvis = () => {
    const avisElement = document.getElementById('avis');
    if (avisElement) {
        avisElement.scrollIntoView({ behavior: 'smooth' });
    }
}

</script>

<template>
    <div class="flex flex-col mx-32">
        <div class="flex gap-20 justify-center items-center m-6 mx-auto my-20" style="width: 75%;">
            <div class="bg-gray-400" style="width: 500px; height: 300px;">
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex justify-between items-center ">
                    <p class="text-4xl">{{ tattooer?.surname }}</p>
                    <div class="flex gap-2 items-center">
                        <Rating v-model="avgRating" readonly class="mt-4 mb-2" :cancel="false"/>
                       <p>({{ tattooer?.opinions?.length }})</p>
                    </div>
                </div>
                <div class="icons flex gap-3 text-3xl">
                  <a v-for="link in tattooer?.links" href="{{link.url}}" >
                    <i class="{{getNetwork(link.name)}}" />
                  </a>
                </div>
                <p>{{tattooer?.description}}</p>
                <div class="voir-avis-btn flex items-center justify-between">
                    <i class="pi pi-angle-down"></i>
                    <button class="text-xl" @click="scrollToAvis">Voir les avis</button>
                </div>

            </div>
        </div>

        <!-- Titre -->
        <div class="text-center m-4">
            <h1 class="text-4xl">Mes prochains flashs</h1>
        </div>

        <div class="grid grid-cols-3 gap-2 justify-items-center m-8">
            <div v-for="flash in flashes">
              <FlashComponent :flash="flash"/>
            </div>
        </div>

        <!-- Avis -->
        <div class="text-center m-4" id="avis">
            <h1 class="text-3xl">Ils m'ont laissé un avis</h1>
        </div>

        <div class="flex justify-center">
          <CommentComponent v-for="opinion in opinions" :opinion="opinion" />
        </div>
    </div>
</template>

<style scoped>
.centered-container {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
}

.voir-avis-btn {
    max-width: 160px;
    padding: 8px 16px; 
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

</style>