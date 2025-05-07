<script setup lang="ts">
import { useSidebar } from '../composables/useSidebar';

interface DashboardProps {
  title: string;
}

const props = defineProps<DashboardProps>();
const { isSidebarCollapsed, isMobileSidebarOpen, toggleMobileSidebar, toggleCollapse } = useSidebar();
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <!-- Desktop Sidebar -->
    <DesktopSidebar :is-collapsed="isSidebarCollapsed" />

    <!-- Main Content -->
    <div
      class="relative flex overflow-y-auto flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default flex-1"
    >
      <!-- Top Navigation -->
      <TopNavigation
        :title="props.title"
        :is-sidebar-collapsed="isSidebarCollapsed"
        :on-toggle-collapse="toggleCollapse"
      >
        <template #mobile-sidebar>
          <MobileSidebar
            :is-collapsed="isSidebarCollapsed"
            :is-open="isMobileSidebarOpen"
            :on-toggle="toggleMobileSidebar"
          />
        </template>
      </TopNavigation>

      <!-- Page Content -->
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
