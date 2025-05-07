<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import StatsGrid from "../../features/user/components/StatsGrid.vue";
import UserTable from "../../features/user/components/UserTable.vue";

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

onMounted(async () => {
  if (!users.value.length) {
    await userStore.getUsers();
  }
});
</script>

<template>
  <div class="space-y-6">
    <!-- Stats Grid -->
    <StatsGrid />

    <!-- User Distribution -->
    <div class="grid grid-cols-1 gap-6">
      <UserTable />
    </div>
  </div>
</template>
