import { defineStore } from "pinia";
import { ref } from "vue";
import { User } from "../types";
import { useApi } from "../lib/api";

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const isFetchingUsers = ref(false)

  async function getUsers() {
    try {
      isFetchingUsers.value = true
      const { data } = await useApi<User[]>('/users', { requiresAuth: true }).get().json();

      if (data.value) {
        users.value = data.value
      }
    } catch (error) {
      console.error('Failed to fetch users ', error)
      throw error
    } finally {
      isFetchingUsers.value = false
    }
  }

  return {
    users,
    isFetchingUsers,
    getUsers
  }
})
