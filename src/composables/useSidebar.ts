import { ref } from 'vue'

export function useSidebar() {
  const isSidebarCollapsed = ref(false)
  const isMobileSidebarOpen = ref(false)

  const toggleMobileSidebar = () => {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  }

  const toggleCollapse = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  return {
    isSidebarCollapsed,
    isMobileSidebarOpen,
    toggleMobileSidebar,
    toggleCollapse
  }
} 