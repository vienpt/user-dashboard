<script setup lang="ts">
interface Props {
  title: string;
  isSidebarCollapsed: boolean;
  onToggleCollapse: () => void;
}

defineProps<Props>();
</script>

<template>
  <header
    class="h-(--ui-header-height) shrink-0 flex items-center justify-between px-4 sm:px-6 gap-1.5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
  >
    <div class="flex items-center gap-1.5 min-w-0">
      <slot name="mobile-sidebar" />

      <div class="flex items-center gap-2">
        <UButton
          icon="i-heroicons-arrow-left-on-rectangle"
          color="neutral"
          variant="ghost"
          class="hidden lg:flex"
          :class="{ 'rotate-180': isSidebarCollapsed }"
          @click="onToggleCollapse"
        />
        <span class="text-lg font-semibold">
          {{ title || "Home" }}
        </span>
      </div>
    </div>
  </header>
</template> 