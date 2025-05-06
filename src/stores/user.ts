import { defineStore } from "pinia";
import {  ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: '123',
    name: 'Vien Pham',
    email: 'pthevien@gmail.com',
    avatar: {
      src: 'https://github.com/vienpt.png',
      alt: 'Vien Pham'
    }
  })

  return {
    user
  }
})
