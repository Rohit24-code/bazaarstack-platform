import { useAuth } from "@clerk/react"
import { useAuthStore } from "./store"
import { useEffect } from "react"
import { getMe, syncUser } from "./api"
import { setApiTokenGetter } from "@/lib/api"

export function useBootStrapAuth() {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const { setLoading, setError, clearAuth, setUser } = useAuthStore()

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
        const data = await getMe()

        setUser(data?.user)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load message"
        setError(message)
      }
    }

    run()
  }, [isLoaded, isSignedIn, clearAuth, setError, setLoading, setUser])
}
