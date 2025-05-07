<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { useColorMode } from "@vueuse/core";
import { useAuthStore } from "../stores/auth";
import { useClerk } from "@clerk/vue";
import { storeToRefs } from "pinia";

defineProps<{
  collapsed?: boolean;
}>();

const authStore = useAuthStore();
const colorMode = useColorMode();
const clerk = useClerk();

const { userAuth } = storeToRefs(authStore);

const items: DropdownMenuItem[][] = [
  [
    {
      type: "label",
      label: userAuth.value?.name || "Guest",
      avatar: userAuth.value?.avatar
        ? {
            src: userAuth.value?.avatar,
            alt: userAuth.value?.name || "User avatar",
          }
        : undefined,
    },
  ],
  [
    {
      label: "Analytics",
      icon: "i-lucide-user",
      to: "/dashboard/analytics",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      to: "/dashboard/settings",
    },
  ],
  [
    {
      label: "Appearance",
      icon: "i-lucide-sun-moon",
      children: [
        {
          label: "Light",
          icon: "i-lucide-sun",
          type: "checkbox",
          checked: colorMode.value === "light",
          onSelect(e: globalThis.MouseEvent) {
            e.preventDefault();
            colorMode.value = "light";
          },
        },
        {
          label: "Dark",
          icon: "i-lucide-moon",
          type: "checkbox",
          checked: colorMode.value === "dark",
          onUpdateChecked(checked: boolean) {
            if (checked) {
              colorMode.value = "dark";
            }
          },
          onSelect(e: globalThis.MouseEvent) {
            e.preventDefault();
          },
        },
      ],
    },
  ],
  [
    {
      label: "GitHub repository",
      icon: "simple-icons:github",
      to: "https://github.com/vienpt/user-dashboard",
      target: "_blank",
    },
  ],
  [
    {
      label: "Log out",
      icon: "i-lucide-log-out",
      onSelect: () => clerk.value?.signOut(),
    },
  ],
];
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{
      content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)',
    }"
  >
    <UButton
      v-bind="{
        avatar: userAuth?.avatar ? {
          src: userAuth.avatar,
          alt: userAuth.name || 'User avatar'
        } : undefined,
        label: collapsed ? undefined : userAuth?.name || 'Guest',
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />
  </UDropdownMenu>
</template>
