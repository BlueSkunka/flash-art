<script setup lang="ts">
import {Opinion} from "@/entities/opinion";

const props = defineProps<{
  opinion: Opinion
}>()
</script>

<template>
    <div class="box">
           <div class="flex items-center gap-2">
               <Avatar label="P" class="mr-2" size="large" shape="circle" />
               <p>{{props?.opinion.user.fullname()}}</p>
           </div>
           <Rating v-model="props.opinion.rate" readonly class="mt-4 mb-2" :cancel="false" />
           <p>{{props.opinion.commentary}}l</p>
            <p>Le {{props.opinion.createdAt.toDateString()}}</p>
       </div>
</template>

<style>
.box {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
    padding: 2rem;
    width: 60%;
    margin: 2rem 0 2rem 0;
}
</style>