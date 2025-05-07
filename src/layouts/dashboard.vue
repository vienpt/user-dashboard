<script setup lang="ts">
import { ref } from "vue";
import { SignedIn, SignedOut, SignInButton } from "@clerk/vue";
import { useRoute } from "vue-router";

interface DashboardProps {
  title: string;
}

const props = defineProps<DashboardProps>();

const route = useRoute();
const isSidebarCollapsed = ref(false);
const isMobileSidebarOpen = ref(false);

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const toggleCollapse = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const isActive = (path: string) => route.path === path;
</script>

<template>
  <div class="fixed inset-0 flex overflow-hidden bg-gray-50 dark:bg-gray-900">
    <!-- Desktop Sidebar -->
    <div
      id="dashboard-sidebar"
      :class="[
        'relative hidden lg:flex flex-col min-h-svh shrink-0 border-r border-default bg-white dark:bg-gray-800 transition-all duration-300',
        isSidebarCollapsed ? 'w-20' : 'w-[20rem]',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Sidebar Header -->
        <div
          class="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h1
            class="px-4 font-semibold truncate"
            :class="{ hidden: isSidebarCollapsed }"
          >
            Dashboard
          </h1>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="flex flex-col gap-2 flex-1 overflow-y-auto px-4 py-2">
          <UButton
            to="/dashboard"
            :color="isActive('/dashboard') ? 'primary' : 'neutral'"
            variant="ghost"
            class="w-full justify-start"
            :class="{ 'justify-center': isSidebarCollapsed }"
            icon="i-heroicons-home"
          >
            <span :class="{ hidden: isSidebarCollapsed }">Home</span>
          </UButton>
        </nav>

        <!-- Sidebar Footer with User Dropdown -->
        <div
          class="shrink-0 flex items-center gap-1.5 px-4 py-2 lg:border-t lg:border-default border-gray-200 dark:border-gray-700"
        >
          <SignedIn>
            <UserMenu :collapsed="isSidebarCollapsed" />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="relative flex overflow-y-auto flex-col min-w-0 min-h-svh lg:not-last:border-r lg:not-last:border-default flex-1"
    >
      <!-- Top Navigation -->
      <header
        class="h-(--ui-header-height) shrink-0 flex items-center justify-between px-4 sm:px-6 gap-1.5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center gap-1.5 min-w-0">
          <div class="lg:hidden flex-1">
            <USlideover
              side="left"
              title="Dashboard"
              :overlay="true"
              :transition="true"
              :close="{
                color: 'primary',
                variant: 'outline',
                class: 'rounded-full',
              }"
            >
              <UButton
                icon="i-heroicons-bars-3"
                color="neutral"
                variant="ghost"
                class="lg:hidden"
                @click="toggleMobileSidebar"
              />
              <template #body>
                <div class="flex flex-col h-full">
                  <!-- Sidebar Navigation -->
                  <nav class="flex flex-col gap-2 flex-1 overflow-y-auto py-2">
                    <UButton
                      to="/dashboard"
                      :color="isActive('/dashboard') ? 'primary' : 'neutral'"
                      variant="ghost"
                      class="w-full justify-start"
                      :class="{ 'justify-center': isSidebarCollapsed }"
                      icon="i-heroicons-home"
                    >
                      <span :class="{ hidden: isSidebarCollapsed }">Home</span>
                    </UButton>
                  </nav>

                  <!-- Sidebar Footer with User Dropdown -->
                  <div
                    class="shrink-0 flex gap-1.5 py-2 lg:border-t lg:border-default border-gray-200 dark:border-gray-700"
                  >
                    <SignedIn>
                      <UserMenu :collapsed="isSidebarCollapsed" />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton />
                    </SignedOut>
                  </div>
                </div>
              </template>
            </USlideover>
          </div>

          <div class="flex items-center gap-2">
            <UButton
              icon="i-heroicons-arrow-left-on-rectangle"
              color="neutral"
              variant="ghost"
              class="hidden lg:flex"
              :class="{ 'rotate-180': isSidebarCollapsed }"
              @click="toggleCollapse"
            />
            <span class="text-lg font-semibold">
              {{ props.title || "Home" }}
            </span>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>
