<script setup lang="ts">
import { useUserStats } from '../composables/useUserStats'

const { stats } = useUserStats()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <UCard
      v-for="stat in stats"
      :key="stat.name"
      class="relative overflow-hidden group"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        :class="{
          'from-blue-500/10 to-blue-500/5': stat.color === 'blue',
          'from-green-500/10 to-green-500/5': stat.color === 'green',
          'from-purple-500/10 to-purple-500/5': stat.color === 'purple',
          'from-orange-500/10 to-orange-500/5': stat.color === 'orange',
        }"
      />
      <div class="relative flex flex-col">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div
              class="p-2 rounded-lg"
              :class="{
                'bg-blue-500/10 text-blue-500': stat.color === 'blue',
                'bg-green-500/10 text-green-500': stat.color === 'green',
                'bg-purple-500/10 text-purple-500': stat.color === 'purple',
                'bg-orange-500/10 text-orange-500': stat.color === 'orange',
              }"
            >
              <UIcon
                :name="stat.icon"
                class="w-5 h-5"
              />
            </div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              {{ stat.name }}
            </p>
          </div>
          <div
            class="flex items-center gap-1 text-sm"
            :class="{
              'text-blue-500': stat.color === 'blue',
              'text-green-500': stat.color === 'green',
              'text-purple-500': stat.color === 'purple',
              'text-orange-500': stat.color === 'orange',
            }"
          >
            <UIcon
              :name="
                stat.trendUp
                  ? 'i-lucide-trending-up'
                  : 'i-lucide-trending-down'
              "
              class="w-4 h-4"
            />
            <span>{{ stat.trend }}</span>
          </div>
        </div>
        <p class="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          {{ stat.value }}
        </p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {{ stat.description }}
        </p>
      </div>
    </UCard>
  </div>
</template> 