<script setup lang="ts">
import { useUserTable } from '../composables/useUserTable'
import { useTemplateRef } from 'vue'

const {
  globalFilter,
  sortItems,
  sortValue,
  sorting,
  filteredUsers,
  isFetchingUsers,
  columns,
} = useUserTable()

const table = useTemplateRef('table')
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex gap-3">
        <UInput
          v-model="globalFilter"
          class="max-w-sm"
          placeholder="Search..."
          icon="i-heroicons-magnifying-glass"
        />
        <USelect
          v-model="sortValue"
          placeholder="Select status"
          size="md"
          :items="sortItems"
          class="w-fit"
        >
          <template #default>
            <span class="font-semibold">Sort by: {{ sortValue }}</span>
          </template>
        </USelect>
      </div>
    </template>
    <UTable
      ref="table"
      v-model:sorting="sorting"
      sticky
      :loading="isFetchingUsers"
      :columns="columns"
      :data="filteredUsers"
      class="flex-1 max-h-[330px]"
    />
    <div class="px-4 border-t pt-2 border-accented text-sm text-muted">
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }}
      of
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s)
      selected.
    </div>
  </UCard>
</template> 