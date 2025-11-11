"use client"

import { Home, User } from "lucide-react"

interface BottomNavProps {
  currentPage: "home" | "profile"
  onPageChange: (page: "home" | "profile") => void
}

export function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card h-16 flex items-center justify-around px-4 z-40">
      <button
        onClick={() => onPageChange("home")}
        className={`flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-lg transition-colors ${
          currentPage === "home" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Home size={24} />
        <span className="text-xs font-medium">主页</span>
      </button>

      <button
        onClick={() => onPageChange("profile")}
        className={`flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-lg transition-colors ${
          currentPage === "profile" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <User size={24} />
        <span className="text-xs font-medium">我的</span>
      </button>
    </div>
  )
}
