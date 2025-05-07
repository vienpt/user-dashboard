<script setup lang="ts">
import { Column } from '@tanstack/vue-table'
import { User } from '../../../types'
import { resolveComponent } from 'vue'

defineProps<{
  column: Column<User>
  isSortActive: boolean
}>()

const UButton = resolveComponent('UButton')
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    label="Name"
    :icon="column.getIsSorted()
      ? column.getIsSorted() === 'asc'
        ? 'i-lucide-arrow-up-narrow-wide'
        : 'i-lucide-arrow-down-wide-narrow'
      : ''"
    class="-mx-2.5 font-semibold"
    :class="{ 'hover:bg-transparent': !column.getIsSorted() && isSortActive }"
    @click="!isSortActive || column.getIsSorted() ? column.toggleSorting(column.getIsSorted() === 'asc') : null"
  />
</template> 