<script setup lang="ts">
import { ref } from "vue";

const stats = ref([
  {
    name: "Total Users",
    value: "12,345",
    change: "+12%",
    changeType: "positive",
  },
  {
    name: "Active Projects",
    value: "24",
    change: "+4%",
    changeType: "positive",
  },
  { name: "Revenue", value: "$45,678", change: "-2%", changeType: "negative" },
  { name: "Tasks", value: "89", change: "+8%", changeType: "positive" },
]);
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <UCard v-for="stat in stats" :key="stat.name" class="relative">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ stat.name }}
            </p>
            <p
              class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              {{ stat.value }}
            </p>
          </div>
          <div
            :class="[
              'rounded-full px-2 py-1 text-xs font-medium',
              stat.changeType === 'positive'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
            ]"
          >
            {{ stat.change }}
          </div>
        </div>
      </UCard>
    </div>

    <!-- Recent Activity -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <UButton color="primary" variant="ghost" size="sm">
            View All
          </UButton>
        </div>
      </template>

      <div class="space-y-4">
        <div v-for="i in 5" :key="i" class="flex items-center space-x-4">
          <UAvatar
            :src="`https://i.pravatar.cc/150?u=${i}`"
            :alt="`User ${i}`"
            size="sm"
          />
          <div class="flex-1 min-w-0">
            <p
              class="text-sm font-medium text-gray-900 dark:text-white truncate"
            >
              User {{ i }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Completed task #{{ i }}
            </p>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ i }}h ago
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
