<script setup lang="ts">
import { onMounted, computed, ref, useTemplateRef, watch } from "vue";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import { UserColumns } from "../../features/user/column";

const userStore = useUserStore();
const { users, isFetchingUsers } = storeToRefs(userStore);

const globalFilter = ref<string>("");
const sortItems = ref(["Email", "Name", "Company"]);
const sortValue = ref("Email");

// Watch for sort value changes
watch(sortValue, (newValue) => {
  const columnId = newValue.toLowerCase();
  sorting.value = [
    {
      id: columnId,
      desc: false,
    },
  ];
});

// Enhanced filter function to handle nested properties
const filteredUsers = computed(() => {
  if (!globalFilter.value) return users.value;

  const search = globalFilter.value.toLowerCase();

  return users.value?.filter((user) => {
    // Check basic properties
    if (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.phone?.toLowerCase().includes(search)
    ) {
      return true;
    }

    // Check nested company properties
    if (user.company?.name?.toLowerCase().includes(search)) {
      return true;
    }

    // Check nested address properties
    if (
      user.address?.street?.toLowerCase().includes(search) ||
      user.address?.city?.toLowerCase().includes(search) ||
      user.address?.zipcode?.toLowerCase().includes(search)
    ) {
      return true;
    }

    return false;
  });
});

// User statistics
const totalUsers = computed(() => users.value?.length || 0);
const activeUsers = computed(
  () => users.value?.filter((user) => user.company?.name).length || 0,
);
const totalCompanies = computed(
  () => new Set(users.value?.map((user) => user.company?.name)).size || 0,
);
const usersByCity = computed(() => {
  const cities =
    users.value?.reduce(
      (acc, user) => {
        const city = user.address?.city;
        if (city) {
          acc[city] = (acc[city] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    ) || {};
  return Object.entries(cities).sort((a, b) => b[1] - a[1]);
});

const stats = computed(() => [
  {
    name: "Total Users",
    value: totalUsers.value,
    description: "Total number of registered users",
    icon: "i-lucide-users",
    trend: "+12%",
    trendUp: true,
    color: "blue"
  },
  {
    name: "Active Users",
    value: activeUsers.value,
    description: "Users with company information",
    icon: "i-lucide-user-check",
    trend: "+8%",
    trendUp: true,
    color: "green"
  },
  {
    name: "Total Companies",
    value: totalCompanies.value,
    description: "Unique companies represented",
    icon: "i-lucide-building-2",
    trend: "+5%",
    trendUp: true,
    color: "purple"
  },
  {
    name: "Top City",
    value: usersByCity.value[0]?.[0] || "N/A",
    description: `Most users (${usersByCity.value[0]?.[1] || 0})`,
    icon: "i-lucide-map-pin",
    trend: "New",
    trendUp: true,
    color: "orange"
  },
]);

const table = useTemplateRef("table");
const columns = UserColumns();
const sorting = ref([
  {
    id: "email",
    desc: false,
  },
]);

onMounted(async () => {
  await userStore.getUsers();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Stats Grid -->
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
            'from-orange-500/10 to-orange-500/5': stat.color === 'orange'
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
                  'bg-orange-500/10 text-orange-500': stat.color === 'orange'
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
                'text-orange-500': stat.color === 'orange'
              }"
            >
              <UIcon
                :name="stat.trendUp ? 'i-lucide-trending-up' : 'i-lucide-trending-down'"
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

    <!-- User Distribution -->
    <div class="grid grid-cols-1 gap-6">
      <UCard>
        <template #header>
          <div class="flex gap-3">
            <UInput
              v-model="globalFilter"
              class="max-w-sm"
              placeholder="Search..."
              icon="i-heroicons-magnifying-glass"
            />
            <USelect
              v-model="sortValue"
              placeholder="Select status"
              size="md"
              :items="sortItems"
              class="w-fit"
            >
              <template #default>
                <span class="font-semibold">Sort by: {{ sortValue }}</span>
              </template>
            </USelect>
          </div>
        </template>
        <UTable
          ref="table"
          v-model:sorting="sorting"
          sticky
          :loading="isFetchingUsers"
          :columns="columns"
          :data="filteredUsers"
          class="flex-1 max-h-[330px]"
        />
        <div class="px-4 border-t pt-2 border-accented text-sm text-muted">
          {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }}
          of
          {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s)
          selected.
        </div>
      </UCard>
    </div>
  </div>
</template>
