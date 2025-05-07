<script setup lang="ts">
import { SignedIn, SignedOut, SignInButton } from "@clerk/vue";
import { useRoute } from "vue-router";

interface Props {
  isCollapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const props = defineProps<Props>();
const route = useRoute();

const isActive = (path: string) => route.path === path;
</script>

<template>
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
        @click="onToggle"
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
              :class="{ 'justify-center': isCollapsed }"
              icon="i-heroicons-home"
            >
              <span :class="{ hidden: isCollapsed }">Home</span>
            </UButton>
          </nav>

          <!-- Sidebar Footer with User Dropdown -->
          <div
            class="shrink-0 flex gap-1.5 py-2 lg:border-t lg:border-default border-gray-200 dark:border-gray-700"
          >
            <SignedIn>
              <UserMenu :collapsed="props.isCollapsed" />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </template>
    </USlideover>
  </div>
</template>
