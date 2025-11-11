"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, Share2, Plus, Car, Wind, Asterisk as Steering, Bot as Robot, Bolt } from "lucide-react"
import { DraggablePanel } from "@/components/draggable-panel"

interface OrderPageProps {
  orderData: {
    service: string
    startAddress: string
    endAddress: string
    distance: number
    price: number
    time: number
  }
  onBack: () => void
  onBackToHome: () => void
}

const serviceInfo: Record<string, { name: string; icon: React.ReactNode; description: string }> = {
  taxi: { name: "快车", icon: <Car className="w-5 h-5" />, description: "快速专业出行" },
  wind: { name: "顺风车", icon: <Wind className="w-5 h-5" />, description: "共享经济出行" },
  driver: { name: "代驾", icon: <Steering className="w-5 h-5" />, description: "专业代驾司机" },
  robot: { name: "机器人", icon: <Robot className="w-5 h-5" />, description: "智能配送机器人" },
  autonomous: { name: "无人车", icon: <Bolt className="w-5 h-5" />, description: "自动驾驶车辆" },
}

export function OrderPage({ orderData, onBack, onBackToHome }: OrderPageProps) {
  const [passengers, setPassengers] = useState(1)
  const service = serviceInfo[orderData.service] || serviceInfo.taxi

  return (
    <DraggablePanel initialHeight={80}>
      <div className="px-4 pb-6">
        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-medium hover:opacity-80 transition-opacity mb-6 mt-2"
        >
          <ChevronLeft className="w-5 h-5" />
          修改行程
        </button>

        {/* 出发地和目的地 */}
        <div className="mb-6 space-y-3 p-4 bg-muted/20 rounded-xl border border-border/50">
          {/* 出发地 */}
          <div className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-primary/60 flex-shrink-0 mt-1"></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">上车地点</p>
              <p className="font-semibold text-foreground truncate">{orderData.startAddress}</p>
            </div>
          </div>

          {/* 竖线连接 */}
          <div className="flex gap-3">
            <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-accent ml-2.5"></div>
          </div>

          {/* 目的地 */}
          <div className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-accent flex-shrink-0 mt-1"></div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">目的地</p>
              <p className="font-semibold text-foreground truncate">{orderData.endAddress}</p>
            </div>
          </div>
        </div>

        {/* 价格、时间、距离信息 */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl border border-border/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary glow-primary">¥{orderData.price}</p>
            <p className="text-xs text-muted-foreground mt-1">预估价格</p>
          </div>
          <div className="text-center border-l border-r border-border/50">
            <p className="text-2xl font-bold text-accent">{orderData.time}</p>
            <p className="text-xs text-muted-foreground mt-1">预估时间</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{orderData.distance}</p>
            <p className="text-xs text-muted-foreground mt-1">距离 km</p>
          </div>
        </div>

        {/* 选中的服务类型 */}
        <div className="mb-6 p-4 bg-muted/20 rounded-lg border border-border/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary glow-primary">
            {service.icon}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{service.name}</p>
            <p className="text-xs text-muted-foreground">{service.description}</p>
          </div>
          <button
            onClick={onBack}
            className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors"
          >
            更换
          </button>
        </div>

        {/* 乘客数选择 */}
        <div className="mb-6 p-3 bg-muted/20 rounded-lg border border-border/50 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">乘客数</p>
            <p className="text-xs text-muted-foreground">需要乘车的乘客数量</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPassengers(Math.max(1, passengers - 1))}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-border hover:text-primary transition-colors"
            >
              −
            </button>
            <span className="w-8 text-center font-semibold text-primary">{passengers}</span>
            <button
              onClick={() => setPassengers(passengers + 1)}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-border hover:text-primary transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* 立即下单按钮 */}
        <button className="w-full py-4 rounded-xl font-bold text-accent-foreground text-lg bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 transition-all transform hover:scale-105 active:scale-95 shadow-lg glow-accent mb-4">
          立即下单
        </button>

        {/* 其他选项 */}
        <div className="flex gap-3">
          <button className="flex-1 py-3 border border-border/50 rounded-lg font-medium text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            分享行程
          </button>
          <button className="flex-1 py-3 border border-border/50 rounded-lg font-medium text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            添加停靠点
          </button>
        </div>
      </div>
    </DraggablePanel>
  )
}
