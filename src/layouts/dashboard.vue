<script setup lang="ts">
import { ref } from "vue";
import { SignedIn, SignedOut, SignInButton } from "@clerk/vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const isActive = (path: string) => route.path === path;
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <div
      id="dashboard-sidebar"
      :class="[
        'relative hidden lg:flex flex-col min-h-svh min-w-16 shrink-0 border-r border-default bg-white dark:bg-gray-800',
        isSidebarOpen ? 'w-[20rem]' : 'w-0',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Sidebar Header -->
        <div
          class="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h1 class="px-4 font-semibold">Dashboard</h1>
          <UButton
            icon="i-heroicons-x-mark"
            color="neutral"
            variant="ghost"
            class="lg:hidden"
            @click="toggleSidebar"
          />
        </div>

        <!-- Sidebar Navigation -->
        <nav class="flex flex-col gap-2 flex-1 overflow-y-auto px-4 py-2">
          <UButton
            to="/dashboard"
            :color="isActive('/dashboard') ? 'primary' : 'neutral'"
            variant="ghost"
            class="w-full justify-start"
            icon="i-heroicons-home"
          >
            Home
          </UButton>
        </nav>

        <!-- Sidebar Footer with User Dropdown -->
        <div
          class="shrink-0 flex items-center gap-1.5 px-4 py-2 lg:border-t lg:border-default border-gray-200 dark:border-gray-700"
        >
          <SignedIn>
            <UserMenu />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="relative flex flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default flex-1"
    >
      <!-- Top Navigation -->
      <header
        class="h-(--ui-header-height) shrink-0 flex items-center justify-between px-4 sm:px-6 gap-1.5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-1.5 min-w-0">
          <UButton
            icon="i-heroicons-bars-3"
            color="neutral"
            variant="ghost"
            class="lg:hidden"
            @click="toggleSidebar"
          />
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
