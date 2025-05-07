import { computed } from 'vue'
import { useUserStore } from '../../../stores/user'
import { storeToRefs } from 'pinia'
import type { User } from '../../../types'

export function useUserStats() {
  const userStore = useUserStore()
  const { users } = storeToRefs(userStore)

  const totalUsers = computed(() => users.value?.length || 0)
  const activeUsers = computed(
    () => users.value?.filter((user: User) => user.company?.name).length || 0
  )
  const totalCompanies = computed(
    () => new Set(users.value?.map((user: User) => user.company?.name)).size || 0
  )
  const usersByCity = computed(() => {
    const cities =
      users.value?.reduce(
        (acc: Record<string, number>, user: User) => {
          const city = user.address?.city
          if (city) {
            acc[city] = (acc[city] || 0) + 1
          }
          return acc
        },
        {} as Record<string, number>
      ) || {}
    return Object.entries(cities).sort((a, b) => b[1] - a[1])
  })

  const stats = computed(() => [
    {
      name: 'Total Users',
      value: totalUsers.value,
      description: 'Total number of registered users',
      icon: 'i-lucide-users',
      trend: '+12%',
      trendUp: true,
      color: 'blue',
    },
    {
      name: 'Active Users',
      value: activeUsers.value,
      description: 'Users with company information',
      icon: 'i-lucide-user-check',
      trend: '+8%',
      trendUp: true,
      color: 'green',
    },
    {
      name: 'Total Companies',
      value: totalCompanies.value,
      description: 'Unique companies represented',
      icon: 'i-lucide-building-2',
      trend: '+5%',
      trendUp: true,
      color: 'purple',
    },
    {
      name: 'Top City',
      value: usersByCity.value[0]?.[0] || 'N/A',
      description: `Most users (${usersByCity.value[0]?.[1] || 0})`,
      icon: 'i-lucide-map-pin',
      trend: 'New',
      trendUp: true,
      color: 'orange',
    },
  ])

  return {
    stats,
    totalUsers,
    activeUsers,
    totalCompanies,
    usersByCity,
  }
} 
