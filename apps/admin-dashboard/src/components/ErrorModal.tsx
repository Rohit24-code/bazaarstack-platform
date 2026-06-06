import { useErrorStore } from "@/components/useErrorStore"
import { AlertCircle } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"

export function ErrorModal() {
  const { isOpen, errorMessage, isSuccess, closeError } = useErrorStore()

  useEffect(() => {
    if (isOpen && isSuccess) {
      toast.success("Success", {
        description: errorMessage,
      })
      closeError()
    }
  }, [isOpen, isSuccess, errorMessage, closeError])

  if (!isOpen || isSuccess) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-lg sm:max-w-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-destructive" />

            <h2 className={`text-xl font-semibold text-destructive`}>
              {"Error"}
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">{errorMessage}</p>

          <div className="flex justify-end">
            <button
              onClick={closeError}
              className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
