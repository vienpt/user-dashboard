import { useUser } from "@clerk/vue";
import { defineStore } from "pinia";
import { computed } from 'vue';


export const useAuthStore = defineStore('auth', () => {
  const clerkUser = useUser()

  const userAuth = computed(() => {
    if (clerkUser.user.value) {
      return {
        id: clerkUser.user.value.id,
        name: clerkUser.user.value.fullName,
        avatar: 'https://github.com/vienpt.png'
      }
    }

    return null
  })

  return {
    userAuth
  }
})
