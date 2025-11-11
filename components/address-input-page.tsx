"use client"

import { useState } from "react"
import { ChevronLeft, MapPin } from "lucide-react"
import { DraggablePanel } from "@/components/draggable-panel"

interface AddressInputPageProps {
  selectedService: string
  onAddressConfirm: (data: any) => void
  onBack: () => void
}

const calculateDistance = (start: string, end: string): { distance: number; price: number; time: number } => {
  const baseDistance = 5 + Math.random() * 20
  const basePrice = 15 + baseDistance * 2
  const baseTime = Math.ceil(baseDistance * 2 + Math.random() * 5)

  return {
    distance: Number.parseFloat(baseDistance.toFixed(1)),
    price: Math.round(basePrice),
    time: baseTime,
  }
}

const serviceMultiplier: Record<string, { priceMulti: number; description: string }> = {
  taxi: { priceMulti: 1, description: "快速出行" },
  wind: { priceMulti: 0.7, description: "共享出行" },
  driver: { priceMulti: 1.5, description: "专业代驾" },
  robot: { priceMulti: 0.5, description: "智能配送" },
  autonomous: { priceMulti: 1.3, description: "无人驾驶" },
}

export function AddressInputPage({ selectedService, onAddressConfirm, onBack }: AddressInputPageProps) {
  const [startAddress, setStartAddress] = useState("")
  const [endAddress, setEndAddress] = useState("")
  const [distance, setDistance] = useState<number | null>(null)
  const [price, setPrice] = useState<number | null>(null)
  const [time, setTime] = useState<number | null>(null)

  const serviceName =
    {
      taxi: "快车",
      wind: "顺风车",
      driver: "代驾",
      robot: "机器人",
      autonomous: "无人车",
    }[selectedService] || "打车"

  const handleAddressChange = () => {
    if (startAddress && endAddress) {
      const { distance: d, price: p, time: t } = calculateDistance(startAddress, endAddress)
      const multiplier = serviceMultiplier[selectedService]?.priceMulti || 1

      setDistance(d)
      setPrice(Math.round(p * multiplier))
      setTime(t)
    }
  }

  const handleConfirm = () => {
    if (distance !== null && price !== null && time !== null) {
      onAddressConfirm({
        service: selectedService,
        startAddress,
        endAddress,
        distance,
        price,
        time,
      })
    }
  }

  return (
    <DraggablePanel initialHeight={75}>
      <div className="px-4 pb-6">
        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-medium hover:opacity-80 transition-opacity mb-6 mt-2"
        >
          <ChevronLeft className="w-5 h-5" />
          返回
        </button>

        {/* 地址输入 */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold text-foreground">选择出行地点</h3>

          {/* 出发地 */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">上车地址</label>
            <div className="flex gap-2 items-center bg-muted/50 rounded-lg px-3 py-3 border border-border/50 focus-within:border-primary transition-colors">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <input
                type="text"
                placeholder="输入上车地址"
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                onBlur={handleAddressChange}
                className="flex-1 bg-transparent outline-none text-sm font-medium placeholder-muted-foreground"
              />
            </div>
          </div>

          {/* 目的地 */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">目的地地址</label>
            <div className="flex gap-2 items-center bg-muted/50 rounded-lg px-3 py-3 border border-border/50 focus-within:border-accent transition-colors">
              <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
              <input
                type="text"
                placeholder="输入目的地"
                value={endAddress}
                onChange={(e) => setEndAddress(e.target.value)}
                onBlur={handleAddressChange}
                className="flex-1 bg-transparent outline-none text-sm font-medium placeholder-muted-foreground"
              />
            </div>
          </div>
        </div>

        {/* 计算结果 */}
        {distance !== null && (
          <div className="mb-6 p-4 bg-muted/30 rounded-xl border border-border space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary glow-primary">{price}</p>
                <p className="text-xs text-muted-foreground">预估价格 ¥</p>
              </div>
              <div className="text-center border-l border-r border-border">
                <p className="text-2xl font-bold text-accent">{time}</p>
                <p className="text-xs text-muted-foreground">预估时间 分</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{distance}</p>
                <p className="text-xs text-muted-foreground">距离 km</p>
              </div>
            </div>

            <div className="h-px bg-border"></div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{serviceName}</span>
              <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full border border-primary/30">
                {serviceMultiplier[selectedService]?.description || "出行"}
              </span>
            </div>
          </div>
        )}

        {/* 确认按钮 */}
        <button
          onClick={handleConfirm}
          disabled={!distance}
          className="w-full py-4 rounded-xl font-bold text-accent-foreground text-lg bg-accent hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg glow-accent mb-4"
        >
          确认行程信息
        </button>

        {/* 提示 */}
        <div className="text-center text-xs text-muted-foreground">
          {!distance && "请输入上车地址和目的地来获取价格估算"}
        </div>
      </div>
    </DraggablePanel>
  )
}
