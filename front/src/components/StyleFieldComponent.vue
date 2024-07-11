<script setup lang="ts">
import {computed, ref} from "vue";
import {useStylesStore} from "@/stores/styles";

const stylesStore = useStylesStore()

const fetchStyles = computed(() => stylesStore.styles)

const props = defineProps({
  invalid: {
    required: true,
    type: Boolean
  },
  styles: {
    required: false,
    type: Array<Style[]>
  }
})

const styles = ref<Style[]>(props.styles ? props.styles : [])

const search = async (event) => {
  await stylesStore.findAll(event.query)
}

const emits = defineEmits(['styles-selected-event'])

const emitStylesSelectedEvent = () => {
  emits('styles-selected-event', { styles: styles.value })
}
</script>

<template>
  <label for="style">Styles</label>
  <AutoComplete :invalid="props.invalid" v-model="styles" fluid multiple @complete="search" optionLabel="name"
                :suggestions="fetchStyles" @itemSelect="emitStylesSelectedEvent"/>
</template>

<style scoped>

</style>