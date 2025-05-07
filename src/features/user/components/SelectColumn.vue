<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { Table, Row } from '@tanstack/vue-table'
const UCheckbox = resolveComponent('UCheckbox')

interface Props {
  table: Table<User>
  row?: Row<User>
  isHeader?: boolean
}

interface User {
  id: number
  name: string
  email: string
  company: {
    name: string
  }
  address: {
    street: string
    city: string
    zipcode: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  isHeader: false
})

const renderCheckbox = () => {
  if (props.isHeader) {
    return h(UCheckbox, {
      modelValue: props.table.getIsSomePageRowsSelected()
        ? 'indeterminate'
        : props.table.getIsAllPageRowsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
        props.table.toggleAllPageRowsSelected(!!value),
      'aria-label': 'Select all'
    })
  }

  return h(UCheckbox, {
    modelValue: props.row?.getIsSelected(),
    'onUpdate:modelValue': (value: boolean | 'indeterminate') => 
      props.row?.toggleSelected(!!value),
    'aria-label': 'Select row'
  })
}
</script>

<template>
  <div class="flex items-center justify-center">
    <component :is="renderCheckbox()" />
  </div>
</template> 