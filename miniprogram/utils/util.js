// utils/util.js - 通用工具函数

/**
 * 格式化时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 计算两点之间的距离（模拟）
 */
const calculateDistance = (start, end) => {
  const baseDistance = 5 + Math.random() * 20
  const basePrice = 15 + baseDistance * 2
  const baseTime = Math.ceil(baseDistance * 2 + Math.random() * 5)

  return {
    distance: parseFloat(baseDistance.toFixed(1)),
    price: Math.round(basePrice),
    time: baseTime
  }
}

/**
 * 服务类型价格倍数
 */
const serviceMultiplier = {
  taxi: { priceMulti: 1, description: '快速出行' },
  wind: { priceMulti: 0.7, description: '共享出行' },
  driver: { priceMulti: 1.5, description: '专业代驾' },
  robot: { priceMulti: 0.5, description: '智能配送' },
  autonomous: { priceMulti: 1.3, description: '无人驾驶' }
}

/**
 * 获取服务名称
 */
const getServiceName = (serviceId) => {
  const serviceNames = {
    taxi: '快车',
    wind: '顺风车',
    driver: '代驾',
    robot: '机器人',
    autonomous: '无人车'
  }
  return serviceNames[serviceId] || '打车'
}

/**
 * 显示加载提示
 */
const showLoading = (title = '加载中...') => {
  wx.showLoading({
    title,
    mask: true
  })
}

/**
 * 隐藏加载提示
 */
const hideLoading = () => {
  wx.hideLoading()
}

/**
 * 显示成功提示
 */
const showSuccess = (title = '操作成功') => {
  wx.showToast({
    title,
    icon: 'success',
    duration: 2000
  })
}

/**
 * 显示错误提示
 */
const showError = (title = '操作失败') => {
  wx.showToast({
    title,
    icon: 'none',
    duration: 2000
  })
}

module.exports = {
  formatTime,
  calculateDistance,
  serviceMultiplier,
  getServiceName,
  showLoading,
  hideLoading,
  showSuccess,
  showError
}

