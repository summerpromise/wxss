// utils/map.js - 地图相关工具函数

/**
 * 获取用户当前位置
 */
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        resolve({
          latitude: res.latitude,
          longitude: res.longitude,
          accuracy: res.accuracy
        })
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 打开地图选择位置
 */
const chooseLocation = () => {
  return new Promise((resolve, reject) => {
    wx.chooseLocation({
      success: (res) => {
        resolve({
          name: res.name,
          address: res.address,
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 计算两点之间的直线距离（单位：公里）
 */
const getDistance = (lat1, lng1, lat2, lng2) => {
  const radLat1 = lat1 * Math.PI / 180.0
  const radLat2 = lat2 * Math.PI / 180.0
  const a = radLat1 - radLat2
  const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137 // 地球半径
  s = Math.round(s * 10000) / 10000
  return s
}

/**
 * 生成模拟车辆标记
 */
const generateMockVehicles = (centerLat, centerLng) => {
  const vehicles = []
  const types = ['taxi', 'robot', 'autonomous']
  
  for (let i = 0; i < 8; i++) {
    const latOffset = (Math.random() - 0.5) * 0.1
    const lngOffset = (Math.random() - 0.5) * 0.1
    const type = types[Math.floor(Math.random() * types.length)]
    
    vehicles.push({
      id: i + 1,
      latitude: centerLat + latOffset,
      longitude: centerLng + lngOffset,
      type: type,
      available: Math.random() > 0.2
    })
  }
  
  return vehicles
}

module.exports = {
  getUserLocation,
  chooseLocation,
  getDistance,
  generateMockVehicles
}

