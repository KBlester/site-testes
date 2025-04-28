"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary" | "success";
  size?: "default" | "sm" | "lg" | "icon";
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = "default",
  size = "default",
  ...props
}, ref) => {
  return <button className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  // Variants
  variant === "default" && "bg-primary text-primary-foreground shadow hover:bg-primary/90", variant === "destructive" && "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90", variant === "outline" && "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground", variant === "secondary" && "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80", variant === "ghost" && "hover:bg-accent hover:text-accent-foreground", variant === "link" && "text-primary underline-offset-4 hover:underline", variant === "primary" && "bg-blue-600 text-white shadow hover:bg-blue-700", variant === "success" && "bg-green-600 text-white shadow hover:bg-green-700",
  // Sizes
  size === "default" && "h-9 px-4 py-2", size === "sm" && "h-8 rounded-md px-3 text-xs", size === "lg" && "h-10 rounded-md px-8", size === "icon" && "h-9 w-9", className)} ref={ref} {...props} data-unique-id="6a7c0da2-7fa1-4e09-8257-87490ca94a7c" data-loc="15:9-19:195" data-file-name="components/ui/button.tsx" />;
});
Button.displayName = "Button";
export { Button };