import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    id: '123',
    name: 'test user',
    email: 'testemail@email.com'
  })

  return {
    user
  }
})
