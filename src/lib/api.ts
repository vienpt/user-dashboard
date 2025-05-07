import { useFetch } from '@vueuse/core'
import { useAuth } from '@clerk/vue'
import type { UseFetchOptions } from '@vueuse/core'
import { useRouter } from 'vue-router'

const BASE_URL = import.meta.env.VITE_API_URL

interface ApiOptions extends UseFetchOptions {
  requiresAuth?: boolean,
}

interface ApiError {
  message: string;
  status?: number;
}

export function useApi<T>(url: string, options: ApiOptions = {}) {
  const { requiresAuth = true, ...fetchOptions } = options
  const { getToken } = useAuth()
  const router = useRouter()

  const beforeFetch = async ({ options }: { options: RequestInit }) => {
    if (requiresAuth) {
      const token = await getToken.value()
      if (!token) {
        router.push('/')
        throw new Error('Authentication required')
      }
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return { options }
  }

  const afterFetch = ({ response, data }: { response: Response; data: T }) => {
    // Handle successful responses
    if (response.ok) {
      return { data }
    }
    
    // Handle unauthorized errors
    if (response.status === 401) {
      router.push('/')
      throw new Error('Session expired. Please login again.')
    }
    
    // Handle other error responses
    throw new Error((data as unknown as ApiError).message || 'An error occurred')
  }

  const onFetchError = ({ error }: { error: Error }) => {
    // Handle fetch errors
    console.error('API Error:', error)
    return { error }
  }

  return useFetch<T>(`${BASE_URL}${url}`, {
    ...fetchOptions,
    beforeFetch,
    afterFetch,
    onFetchError,
  })
}

// Example usage:
// const { data, error, isFetching } = useApi<User[]>('/users', { requiresAuth: true }) 
