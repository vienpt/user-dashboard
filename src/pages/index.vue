<script setup lang="ts">
import { SignedIn, SignedOut, SignInButton } from "@clerk/vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold">Your App</h1>
          </div>
          <div class="flex items-center">
            <SignedIn>
              <UButton
                to="/dashboard"
                color="primary"
                variant="solid"
              >
                Go to Dashboard
              </UButton>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <UButton
                  color="primary"
                  variant="solid"
                >
                  Sign In
                </UButton>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Welcome to Your Dashboard
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            A modern dashboard template built with Vue 3, Nuxt UI, and Clerk authentication.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <SignedOut>
              <SignInButton>
                <UButton
                  size="lg"
                  color="primary"
                  variant="solid"
                >
                  Get Started
                </UButton>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UButton
                to="/dashboard"
                size="lg"
                color="primary"
                variant="solid"
              >
                Go to Dashboard
              </UButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
