import { ref, computed, watch } from 'vue'
import { useUserStore } from '../../../stores/user'
import { storeToRefs } from 'pinia'
import { UserColumns } from '../column'

export function useUserTable() {
  const userStore = useUserStore()
  const { users, isFetchingUsers } = storeToRefs(userStore)

  const globalFilter = ref<string>('')
  const sortItems = ref(['Email', 'Name', 'Company'])
  const sortValue = ref('Email')
  const sorting = ref([
    {
      id: 'email',
      desc: false,
    },
  ])

  // Watch for sort value changes
  watch(sortValue, (newValue) => {
    const columnId = newValue.toLowerCase()
    sorting.value = [
      {
        id: columnId,
        desc: false,
      },
    ]
  })

  // Enhanced filter function to handle nested properties
  const filteredUsers = computed(() => {
    if (!globalFilter.value) return users.value

    const search = globalFilter.value.toLowerCase()

    return users.value?.filter((user) => {
      // Check basic properties
      if (
        user.name?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.phone?.toLowerCase().includes(search)
      ) {
        return true
      }

      // Check nested company properties
      if (user.company?.name?.toLowerCase().includes(search)) {
        return true
      }

      // Check nested address properties
      if (
        user.address?.street?.toLowerCase().includes(search) ||
        user.address?.city?.toLowerCase().includes(search) ||
        user.address?.zipcode?.toLowerCase().includes(search)
      ) {
        return true
      }

      return false
    })
  })

  return {
    globalFilter,
    sortItems,
    sortValue,
    sorting,
    filteredUsers,
    isFetchingUsers,
    columns: UserColumns(),
  }
} 
