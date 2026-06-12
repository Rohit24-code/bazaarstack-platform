import { useAuth } from "@clerk/react"
import { useAuthStore } from "./store"
import { useEffect } from "react"
import { getMe } from "./api"
import { setApiTokenGetter } from "@/lib/api"
import { useSyncUserMutation } from "./hooks/useAuthApi"
import { useQueryClient } from "@tanstack/react-query"

export function useBootStrapAuth() {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const { setLoading, setError, clearAuth, setUser } = useAuthStore()
  
  const { mutateAsync: syncUser } = useSyncUserMutation()
  const queryClient = useQueryClient()

  useEffect(() => {
    setApiTokenGetter(async () => {
      let token = await getToken()
      return token ?? null
    })
  }, [getToken])

  useEffect(() => {
    async function run() {
      if (!isLoaded) return

      if (!isSignedIn) {
        clearAuth()
        return
      }

      try {
        setLoading()
        await syncUser()
        
        const data = await queryClient.fetchQuery({
          queryKey: ["auth", "me"],
          queryFn: () => getMe()
        })

        setUser(data?.user)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load message"
        setError(message)
      }
    }

    run()
  }, [isLoaded, isSignedIn, clearAuth, setError, setLoading, setUser, syncUser, queryClient])
}
