"use client"

import { useRef, useState, useEffect } from "react"
import type React from "react"

interface DraggablePanelProps {
  children: React.ReactNode
  initialHeight?: number
  minHeight?: number
}

export function DraggablePanel({ children, initialHeight = 60, minHeight = 20 }: DraggablePanelProps) {
  const [panelHeight, setPanelHeight] = useState(initialHeight)
  const [isDragging, setIsDragging] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef(0)
  const startHeightRef = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    startYRef.current = e.clientY
    startHeightRef.current = panelHeight
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = startYRef.current - e.clientY
      const newHeight = Math.max(minHeight, Math.min(95, startHeightRef.current + (deltaY / window.innerHeight) * 100))
      setPanelHeight(newHeight)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={panelRef}
      className="absolute bottom-0 left-0 right-0 z-20 transition-all"
      style={{ height: `${panelHeight}vh` }}
    >
      <div className="bg-card rounded-t-3xl shadow-2xl h-full overflow-y-auto flex flex-col">
        <div
          onMouseDown={handleMouseDown}
          className="sticky top-0 flex justify-center pt-3 pb-2 bg-card border-b border-border rounded-t-3xl cursor-grab active:cursor-grabbing hover:bg-muted/30 transition-colors"
        >
          <div className="w-12 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 rounded-full"></div>
        </div>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
