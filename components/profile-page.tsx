"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ProfilePage() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 检查本地存储和系统偏好
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme === "dark" || (savedTheme === null && prefersDark)
    setIsDark(shouldBeDark)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  if (!mounted) return null

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-4 pt-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-foreground">个人设置</h1>

        {/* 主题切换卡片 */}
        <div className="bg-card rounded-lg p-6 mb-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">深色模式</h2>
              <p className="text-sm text-muted-foreground">{isDark ? "已启用" : "已禁用"}</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                isDark ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isDark ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 快速预览 */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">主题预览</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {isDark ? <Moon size={20} className="text-primary" /> : <Sun size={20} className="text-primary" />}
              <span className="text-sm text-muted-foreground">
                当前主题：{isDark ? "夜间模式（科技感）" : "白天模式（简约淡色）"}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted rounded">
              切换主题后会自动保存到本地存储
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
