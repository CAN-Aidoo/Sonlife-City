import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-middle-blue/50 bg-morning-blue/70 px-3 py-2 text-base text-college-blue ring-offset-background backdrop-blur-sm",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-college-blue",
          "placeholder:text-persian-blue/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-picton-blue focus-visible:ring-offset-2 focus-visible:border-picton-blue/80",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:shadow-lg",
          "md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
