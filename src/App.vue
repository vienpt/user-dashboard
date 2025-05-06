<script setup lang="ts">
import { SignedIn, SignedOut } from "@clerk/vue";
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import DashboardLayout from './layouts/dashboard.vue';

const route = useRoute();
const isDashboardRoute = computed(() => route.path.startsWith('/dashboard'));
</script>

<template>
  <UApp>
    <SignedIn>
      <template v-if="isDashboardRoute">
        <DashboardLayout>
          <RouterView />
        </DashboardLayout>
      </template>
      <template v-else>
        <RouterView />
      </template>
    </SignedIn>
    <SignedOut>
      <RouterView />
    </SignedOut>
  </UApp>
</template>
