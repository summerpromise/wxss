"use client"

import { useState } from "react"

interface ServiceOption {
  id: string
  name: string
  description: string
  icon: string
  price: string
  time: string
  count: number
}

const services: ServiceOption[] = [
  {
    id: "standard",
    name: "快车",
    description: "标准出行",
    icon: "🚗",
    price: "¥12",
    time: "5分钟",
    count: 8,
  },
  {
    id: "robot",
    name: "机器人",
    description: "智能配送",
    icon: "🦾",
    price: "¥8",
    time: "8分钟",
    count: 3,
  },
  {
    id: "autonomous",
    name: "无人车",
    description: "未来出行",
    icon: "🤖",
    price: "¥15",
    time: "7分钟",
    count: 2,
  },
]

interface ServiceSelectorProps {
  selectedService: string
  onServiceChange: (serviceId: string) => void
}

export function ServiceSelector({ selectedService, onServiceChange }: ServiceSelectorProps) {
  const [scrollPos, setScrollPos] = useState(0)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 backdrop-blur-sm bg-white/95">
      {/* 搜索框 */}
      <div className="mb-4 flex gap-2">
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <span className="text-lg">📍</span>
          <input
            type="text"
            placeholder="北京国贸大厦"
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
            disabled
          />
        </div>
        <button className="bg-primary text-primary-foreground px-3 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition-all">
          确认
        </button>
      </div>

      {/* 服务选择 */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onServiceChange(service.id)}
            className={`
              flex-shrink-0 p-4 rounded-xl transition-all transform
              ${
                selectedService === service.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-gray-100 text-foreground hover:bg-gray-200"
              }
            `}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">{service.icon}</span>
              <div className="text-left">
                <p className="font-semibold text-sm">{service.name}</p>
                <p className="text-xs opacity-75">{service.description}</p>
                <p className="text-xs font-bold mt-1">{service.price}</p>
              </div>
              {/* 可用车数 */}
              <div className="text-xs px-2 py-1 bg-white bg-opacity-30 rounded-full">{service.count}辆</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
