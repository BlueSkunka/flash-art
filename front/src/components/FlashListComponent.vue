<script setup lang="ts">
import {useFlashesStore} from "@/stores/flashes";
import {computed, ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import FlashFormComponent from "@/components/FlashFormComponent.vue";
import type {Flash} from "@/entities/flash";

const flashesStore = useFlashesStore()
const authStore = useAuthStore()
const confirm = useConfirm()
const toast = useToast()

const user = computed(() => authStore.user)
const flashes = computed(() => flashesStore.flashes)
const isLoading = computed(() => flashesStore.isLoading)
const flash = ref<Flash | null>(null)

const deleteFlash = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Do you want to delete this record?',
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {
      const isDeleted = await flashesStore.remove(event.data)

      if (isDeleted) {
        toast.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000});
      } else {
        toast.add({severity: 'error', summary: 'Error', detail: 'An error occured', life: 3000});
      }

    },
    reject: () => {
      toast.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
    }
  });
};

const visibleForm = ref(false)
const showOrHideForm = () => {
  visibleForm.value = !visibleForm.value
}

const newFlash = (event) => {
  flash.value = null
  showOrHideForm()
}

const editFlash = (event) => {
  flash.value = event.data
  showOrHideForm()
}

const handleFormSubmitEvent = (data) => {
  visibleForm.value = false

  if (data.submitted) {
    toast.add({severity: 'info', summary: 'Element registered', detail: 'Record registered', life: 3000});
  }
}

const fetchData = async () => {
  await flashesStore.findByTattooer(user.value)
}

fetchData()

</script>

<template>
  <ConfirmPopup/>
  <Toast/>

  <div class="container mx-auto px-40">
    <h1 class="text-3xl text-center my-10">Gestion de mes flashs</h1>

    <div>
      <div class="card">
        <DataTable
            :value="flashes"
            dataKey="id"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tattooers"
        >
          <template #header>
            <div class="flex flex-wrap gap-2 items-center justify-between">
              <h4 class="m-0">Mes flashs</h4>
              <Dialog v-model:visible="visibleForm" modal header="Formulaire de flash" :style="{ width: '25rem' }">
                <FlashFormComponent :flash="flash" @formSubmitEvent="handleFormSubmitEvent"/>
              </Dialog>

              <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="newFlash"/>
            </div>
          </template>

          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="name" header="Nom" sortable style="min-width: 16rem"></Column>
          <Column field="place" header="Place" sortable style="min-width: 16rem"></Column>
          <Column header="Image">
            <template #body>
              <Image
                  src="https://images.unsplash.com/photo-1550300627-4ca6dccfd257?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Image" width="250" preview/>
            </template>
          </Column>
          <Column field="description" header="Description" sortable style="min-width: 10rem"></Column>
          <Column :exportable="false" style="min-width: 12rem">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editFlash(slotProps)" />
              <Button icon="pi pi-trash" outlined rounded severity="danger"
                      @click="deleteFlash(slotProps)"/>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>