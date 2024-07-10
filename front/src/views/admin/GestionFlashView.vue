<script setup>

import {useFlashesStore} from "@/stores/flashes";
import {computed} from "vue";
import {useAuthStore} from "@/stores/auth";

const flashesStore = useFlashesStore()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const flashes = computed(() => flashesStore.flashes)
const isLoading = computed(() => flashesStore.isLoading)

const fetchData = async () => {
  await flashesStore.findByTattooer(user.value)
}

fetchData()

</script>

<template>
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
              <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
            </div>
          </template>

          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="name" header="Nom" sortable style="min-width: 16rem"></Column>
          <Column field="place" header="Place" sortable style="min-width: 16rem"></Column>
          <Column header="Image">
            <template #body="slotProps">
              <Image
                  src="https://images.unsplash.com/photo-1550300627-4ca6dccfd257?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Image" width="250" preview/>
            </template>
          </Column>
          <Column field="description" header="Description" sortable style="min-width: 10rem"></Column>
          <Column :exportable="false" style="min-width: 12rem">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)"/>
              <Button icon="pi pi-trash" outlined rounded severity="danger"
                      @click="confirmDeleteProduct(slotProps.data)"/>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>