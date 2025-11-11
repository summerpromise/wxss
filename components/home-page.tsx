"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowRight,
  Clock,
  Users,
  Zap,
  Car,
  Wind,
  Asterisk as Steering,
  Bot as Robot,
  Bolt,
  MapPin,
} from "lucide-react"
import { DraggablePanel } from "@/components/draggable-panel"

interface Service {
  id: string
  icon: React.ReactNode
  name: string
  description: string
}

const mainServices: Service[] = [
  { id: "taxi", icon: <Car className="w-6 h-6" />, name: "快车", description: "快速出行" },
  { id: "wind", icon: <Wind className="w-6 h-6" />, name: "顺风车", description: "共享出行" },
  { id: "driver", icon: <Steering className="w-6 h-6" />, name: "代驾", description: "专业服务" },
  { id: "robot", icon: <Robot className="w-6 h-6" />, name: "机器人", description: "智能配送" },
  { id: "autonomous", icon: <Bolt className="w-6 h-6" />, name: "无人车", description: "未来出行" },
]

interface HomePageProps {
  onServiceSelect: (serviceId: string) => void
}

export function HomePage({ onServiceSelect }: HomePageProps) {
  const [startLocation] = useState("上海市浦东新区")
  const [destination, setDestination] = useState("")

  return (
    <DraggablePanel initialHeight={60}>
      <div className="px-4 pb-6">
        {/* 位置信息 */}
        <div className="space-y-3 mb-6 pt-2">
          <div className="flex gap-3 items-center">
            <div className="w-5 h-5 rounded-full bg-primary/60 flex-shrink-0"></div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">上车地点</p>
              <p className="font-semibold text-foreground">{startLocation}</p>
            </div>
          </div>

          {/* 目的地输入 */}
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="flex gap-2 items-center bg-muted rounded-lg px-3 py-3 border border-border">
                <MapPin className="w-4 h-4 text-accent" />
                <input
                  type="text"
                  placeholder="你想去哪儿？"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm font-medium placeholder-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* 快速选项 */}
          <div className="flex gap-2 text-xs">
            <button className="flex items-center gap-1 px-3 py-2 bg-muted rounded-full hover:bg-muted/80 transition-colors border border-border/50">
              <Clock className="w-4 h-4" />
              预约
            </button>
            <button className="flex items-center gap-1 px-3 py-2 bg-muted rounded-full hover:bg-muted/80 transition-colors border border-border/50">
              <Users className="w-4 h-4" />
              帮人叫车
            </button>
            <button className="flex items-center gap-1 px-3 py-2 bg-muted rounded-full hover:bg-muted/80 transition-colors border border-border/50">
              <Zap className="w-4 h-4" />
              接送机
            </button>
          </div>
        </div>

        {/* 促销条 */}
        <div className="mb-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-3 text-accent border border-accent/30 flex items-center justify-between glow-accent">
          <div>
            <p className="text-xs font-semibold">新用户专属</p>
            <p className="text-sm font-medium">首单享受霓虹优惠</p>
          </div>
          <ArrowRight className="w-5 h-5" />
        </div>

        {/* 服务网格 */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">出行服务</h3>
          <div className="grid grid-cols-5 gap-3 overflow-x-auto hide-scrollbar">
            {mainServices.map((service) => (
              <button
                key={service.id}
                onClick={() => onServiceSelect(service.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors group flex-shrink-0"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all group-hover:glow-primary">
                  {service.icon}
                </div>
                <p className="text-xs font-medium text-center leading-tight">{service.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 福利提示 */}
        <div className="bg-muted/50 rounded-lg p-3 border border-border text-center">
          <p className="text-xs">
            <span className="font-bold text-primary">新用户专属福利</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">首单优惠 • 倒计时 01:39:05</p>
        </div>
      </div>
    </DraggablePanel>
  )
}
