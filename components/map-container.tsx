"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, ZoomIn, ZoomOut } from "lucide-react"

interface Vehicle {
  id: string
  lat: number
  lng: number
  type: "taxi" | "robot" | "autonomous"
  available: boolean
}

declare global {
  interface Window {
    L: any
  }
}

export function MapContainer() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const vehicleMarkers = useRef<Map<string, any>>(new Map())
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    if (!window.L) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      document.head.appendChild(link)

      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
      script.onload = () => initMap()
      document.head.appendChild(script)
    } else {
      initMap()
    }
  }, [])

  const initMap = () => {
    if (!mapContainer.current || map.current) return

    map.current = window.L.map(mapContainer.current).setView([31.23, 121.47], 13)

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map.current)

    if (mapContainer.current) {
      mapContainer.current.style.filter = "brightness(0.9) contrast(1.1)"
    }

    const zoomIn = document.querySelector("[data-zoom-in]") as HTMLButtonElement
    const zoomOut = document.querySelector("[data-zoom-out]") as HTMLButtonElement
    const locate = document.querySelector("[data-locate]") as HTMLButtonElement

    if (zoomIn) zoomIn.onclick = () => map.current.zoomIn()
    if (zoomOut) zoomOut.onclick = () => map.current.zoomOut()
    if (locate) locate.onclick = () => map.current.setView([31.23, 121.47], 13)

    addVehicleMarkers()
  }

  const addVehicleMarkers = () => {
    const mockVehicles: Vehicle[] = [
      { id: "1", lat: 31.23, lng: 121.47, type: "taxi", available: true },
      { id: "2", lat: 31.24, lng: 121.48, type: "taxi", available: true },
      { id: "3", lat: 31.22, lng: 121.46, type: "robot", available: false },
      { id: "4", lat: 31.25, lng: 121.49, type: "autonomous", available: true },
      { id: "5", lat: 31.21, lng: 121.45, type: "taxi", available: true },
      { id: "6", lat: 31.26, lng: 121.5, type: "robot", available: true },
      { id: "7", lat: 31.2, lng: 121.44, type: "taxi", available: true },
      { id: "8", lat: 31.23, lng: 121.47, type: "autonomous", available: true },
    ]
    setVehicles(mockVehicles)

    mockVehicles.forEach((vehicle) => {
      const iconColor = !vehicle.available
        ? "#999aaa"
        : vehicle.type === "autonomous"
          ? "#00d4ff"
          : vehicle.type === "robot"
            ? "#00ff88"
            : "#00d4ff"

      const iconSvg = `
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="12" fill="${iconColor}" opacity="${vehicle.available ? "1" : "0.5"}"/>
          <text x="14" y="18" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0a0e27">
            ${vehicle.type === "autonomous" ? "无" : vehicle.type === "robot" ? "机" : "车"}
          </text>
        </svg>
      `

      const marker = window.L.marker([vehicle.lat, vehicle.lng], {
        icon: window.L.divIcon({
          html: iconSvg,
          className: "vehicle-marker",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        }),
      })
        .bindPopup(
          `<div class="text-xs">
            <p class="font-semibold">${vehicle.type === "autonomous" ? "无人车" : vehicle.type === "robot" ? "机器人" : "快车"}</p>
            <p class="text-muted-foreground">${vehicle.available ? "可用" : "忙碌"}</p>
          </div>`,
        )
        .addTo(map.current)

      vehicleMarkers.current.set(vehicle.id, marker)
    })
  }

  return (
    <div className="flex-1 relative bg-muted overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />

      {/* 当前位置标记 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none">
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center border-4 border-primary/20 shadow-lg glow-primary animate-pulse">
          <div className="w-2 h-2 bg-background rounded-full"></div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-20">
        <button
          data-zoom-in
          className="w-10 h-10 bg-card rounded-lg shadow-lg flex items-center justify-center hover:bg-muted transition-colors text-primary border border-border hover:glow-primary"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button
          data-zoom-out
          className="w-10 h-10 bg-card rounded-lg shadow-lg flex items-center justify-center hover:bg-muted transition-colors text-primary border border-border hover:glow-primary"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>

      {/* 当前位置按钮 */}
      <div className="absolute left-4 bottom-4 z-20">
        <button
          data-locate
          className="w-10 h-10 bg-card rounded-lg shadow-lg flex items-center justify-center hover:bg-muted transition-colors text-primary border border-border hover:glow-primary"
        >
          <MapPin className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
