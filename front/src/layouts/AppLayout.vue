<template>
    <component :is="layout">
      <router-view>
      </router-view>
    </component>
</template>

<script lang="ts">
import {defineComponent, ref, shallowRef} from "vue";
import AdminLayout from "./AdminLayout.vue";
import BaseLayout from "./BaseLayout.vue";


export default defineComponent({
  name: "AppLayout",
  setup() {
    const admin = ref(true);
    const layout = shallowRef(admin.value? AdminLayout : BaseLayout);
    return {layout};
  }
})
</script>
