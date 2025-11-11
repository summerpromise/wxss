"use client"

interface OrderPanelProps {
  selectedService: string
  onOrderClick: () => void
}

export function OrderPanel({ selectedService, onOrderClick }: OrderPanelProps) {
  const serviceNames: Record<string, string> = {
    standard: "快车",
    robot: "机器人",
    autonomous: "无人车",
  }

  const getServiceColor = (service: string) => {
    const colors: Record<string, string> = {
      standard: "bg-red-500",
      robot: "bg-purple-500",
      autonomous: "bg-blue-500",
    }
    return colors[service] || "bg-red-500"
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div className="bg-white rounded-t-3xl shadow-2xl p-6 border-t border-border">
        {/* 顶部拖动条 */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* 上车点和目的地 */}
        <div className="mb-6 space-y-3">
          {/* 上车点 */}
          <div className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 mt-1"></div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">上车地点</p>
              <p className="font-semibold text-foreground">北京国贸大厦</p>
              <p className="text-xs text-muted-foreground">东三环中路1号</p>
            </div>
          </div>

          {/* 竖线连接 */}
          <div className="flex gap-3">
            <div className="w-0.5 h-8 bg-gray-300 ml-2.5"></div>
          </div>

          {/* 目的地 */}
          <div className="flex gap-3 items-start">
            <div className="w-5 h-5 rounded-full bg-red-500 flex-shrink-0 mt-1"></div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">目的地</p>
              <p className="font-semibold text-foreground">北京首都国际机场</p>
              <p className="text-xs text-muted-foreground">朝阳区顺义区</p>
            </div>
          </div>
        </div>

        {/* 价格和时间信息 */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">¥45</p>
            <p className="text-xs text-muted-foreground">预估价格</p>
          </div>
          <div className="text-center border-l border-r border-border">
            <p className="text-2xl font-bold text-foreground">22分钟</p>
            <p className="text-xs text-muted-foreground">预估时间</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">15.2km</p>
            <p className="text-xs text-muted-foreground">距离</p>
          </div>
        </div>

        {/* 选中的服务类型 */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-3">
          <span className="text-2xl">
            {selectedService === "standard" && "🚗"}
            {selectedService === "robot" && "🦾"}
            {selectedService === "autonomous" && "🤖"}
          </span>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{serviceNames[selectedService]}</p>
            <p className="text-xs text-muted-foreground">提供专业、安全的出行服务</p>
          </div>
          <button className="text-primary text-sm font-semibold hover:underline">更换</button>
        </div>

        {/* 下单按钮 */}
        <button
          onClick={onOrderClick}
          className={`
            w-full py-4 rounded-xl font-bold text-white text-lg
            transition-all transform hover:scale-105 active:scale-95
            ${getServiceColor(selectedService)} shadow-lg
          `}
        >
          立即下单
        </button>

        {/* 其他选项 */}
        <div className="flex gap-3 mt-4 justify-center">
          <button className="flex-1 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-gray-50 transition-colors">
            分享行程
          </button>
          <button className="flex-1 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-gray-50 transition-colors">
            添加停靠点
          </button>
        </div>
      </div>
    </div>
  )
}
