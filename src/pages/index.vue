<script setup lang="ts">
import { SignedOut, SignIn, useUser } from "@clerk/vue";
import { useRouter } from "vue-router";

const router = useRouter();
const clerkUser = useUser();

if (clerkUser.user.value) {
  router.push("/dashboard");
}
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div class="flex justify-center items-center h-screen">
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  </div>
</template>
