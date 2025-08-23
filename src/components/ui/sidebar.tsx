import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sidebarVariants = cva(
  "flex h-full w-full flex-col overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        ghost: "bg-transparent",
      },
      size: {
        default: "w-64",
        sm: "w-48",
        lg: "w-80",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface SidebarContextValue {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function SidebarProvider({
  children,
  defaultCollapsed = false,
  collapsedWidth = 56,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
  collapsedWidth?: number
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  const toggle = React.useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggle }}>
      <div
        className="flex h-screen w-full"
        style={
          {
            "--sidebar-width": collapsed ? `${collapsedWidth}px` : "16rem",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sidebarVariants> {
  asChild?: boolean
  collapsible?: boolean
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, variant, size, asChild = false, collapsible, ...props }, ref) => {
    const { collapsed } = useSidebar()
    const Comp = asChild ? Slot : "aside"

    return (
      <Comp
        ref={ref}
        className={cn(
          sidebarVariants({ variant, size }),
          collapsed && collapsible && "w-14",
          className
        )}
        data-collapsed={collapsed}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-1 flex-col gap-2 p-2", className)}
      {...props}
    />
  )
)
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
  }
>(({ className, open, onOpenChange, defaultOpen, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen ?? true)
  const finalOpen = open ?? isOpen

  React.useEffect(() => {
    if (onOpenChange) {
      onOpenChange(finalOpen)
    }
  }, [finalOpen, onOpenChange])

  return (
    <div
      ref={ref}
      className={cn("space-y-1", className)}
      data-open={finalOpen}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-3 py-2 text-xs font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { toggle } = useSidebar()

  return (
    <button
      ref={ref}
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "h-10 w-10 hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
}