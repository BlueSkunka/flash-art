<template>
    <component :is="layout">
      <router-view>
      </router-view>
    </component>
</template>

<script lang="ts">
import {computed, defineComponent, ref, shallowRef, watch} from "vue";
import AdminLayout from "./AdminLayout.vue";
import BaseLayout from "./BaseLayout.vue";
import {useAuthStore} from "@/stores/auth";
import Role from "@/enums/role";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "AppLayout",
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const user = computed(() => authStore.user)

    let isAdmin = false

    if (user.value) {
      if (user.value.role === Role.TATTOOER) {
        isAdmin = true
      }
    }

    const layout = shallowRef(isAdmin ? AdminLayout : BaseLayout);

    router.afterEach((to) => {
      layout.value = to.meta.layout
    })

    return {layout};
  }
})
</script>
