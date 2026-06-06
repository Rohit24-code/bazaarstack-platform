import { cn } from "@/lib/utils"

export const styles = {
  dialogContent: cn(
    "grid h-[85vh] w-[75vw] overflow-hidden p-0 sm:max-w-7xl sm:grid-cols-4"
  ),
  sidebar: cn(
    "hidden flex-col overflow-hidden border-r bg-muted/50 sm:col-span-1 sm:flex"
  ),
  sidebarHeader: cn("border-b p-4"),
  searchInput: cn(
    "w-full rounded-md border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
  ),
  sidebarContent: cn("flex-1 space-y-2 overflow-y-auto p-3"),
  sidebarTitle: cn(
    "px-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
  ),
  recentChatItem: cn(
    "w-full truncate rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
  ),
  mainChatArea: cn("flex flex-col overflow-hidden bg-background sm:col-span-3"),
  chatBody: cn("flex-1 overflow-y-auto p-6"),
  messageContainer: cn("mb-6 flex"),
  aiMessage: cn(
    "max-w-[85%] rounded-2xl rounded-tl-none bg-primary/10 px-5 py-3.5 text-sm text-foreground shadow-sm"
  ),
  userMessage: cn(
    "ml-auto max-w-[85%] rounded-2xl rounded-tr-none bg-primary px-5 py-3.5 text-sm text-primary-foreground shadow-sm"
  ),
  inputArea: cn("border-t bg-background p-4 sm:p-6"),
  textArea: cn(
    "max-h-32 min-h-14 w-full resize-none rounded-xl border bg-muted/50 px-4 py-3.5 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
  ),
}
