<script lang="ts" setup>
import { User } from '../../../types';

interface UserNameAvatar {
  user: User;
}

const props = defineProps<UserNameAvatar>();
</script>

<template>
  <div class="flex items-center space-x-4">
    <UAvatar
      :src="`https://i.pravatar.cc/150?u=${props.user.id}`"
      :alt="props.user.name"
      size="sm"
    />
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
        {{ props.user.name }}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
        {{ props.user.email }}
      </p>
    </div>
  </div>
</template>
