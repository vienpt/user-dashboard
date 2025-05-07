<script setup lang="ts">
import { SignedIn, SignedOut, SignInButton } from "@clerk/vue";
import { useRoute } from "vue-router";

interface Props {
  isCollapsed: boolean;
}

const props = defineProps<Props>();
const route = useRoute();

const isActive = (path: string) => route.path === path;
</script>

<template>
  <div
    id="dashboard-sidebar"
    :class="[
      'relative hidden lg:flex flex-col min-h-svh shrink-0 border-r border-default bg-white dark:bg-gray-800 transition-all duration-300',
      props.isCollapsed ? 'w-20' : 'w-[20rem]',
    ]"
  >
    <div class="flex flex-col h-full">
      <!-- Sidebar Header -->
      <div
        class="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700"
      >
        <h1
          class="px-4 font-semibold truncate"
          :class="{ hidden: isCollapsed }"
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
          :class="{ 'justify-center': isCollapsed }"
          icon="i-heroicons-home"
        >
          <span :class="{ hidden: isCollapsed }">Home</span>
        </UButton>
      </nav>

      <!-- Sidebar Footer with User Dropdown -->
      <div
        class="shrink-0 flex items-center gap-1.5 px-4 py-2 lg:border-t lg:border-default border-gray-200 dark:border-gray-700"
      >
        <SignedIn>
          <UserMenu :collapsed="isCollapsed" />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  </div>
</template> 