// pages/index/index.js
const { TENCENT_MAP_KEY } = require('../../utils/map-config.js');
// 引入腾讯地图SDK核心类
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

// 实例化API核心类（在Page外部，作为全局变量）
let qqmapsdk;

Page({
  data: {
    // 当前状态：'home', 'address', 'order'
    currentState: 'home',
    
    // 选中的服务类型
    selectedService: null,
    serviceName: '',
    
    // 主要服务列表
    mainServices: [
      { id: 'taxi', name: '快车', description: '快速出行', icon: '🚗' },
      { id: 'wind', name: '顺风车', description: '共享出行', icon: '🌪️' },
      { id: 'driver', name: '代驾', description: '专业服务', icon: '🎯' },
      { id: 'robot', name: '机器人', description: '智能配送', icon: '🤖' },
      { id: 'autonomous', name: '无人车', description: '未来出行', icon: '⚡' }
    ],
    
    // 地址信息
    startLocation: '上海市浦东新区',
    destination: '',
    startAddress: '',
    endAddress: '',
    
    // 终点坐标信息（用于距离计算）
    endLatitude: null,
    endLongitude: null,
    
    // 关键词提示列表
    suggestions: [],
    showSuggestions: false,
    
    // 计算结果
    distance: null,
    price: null,
    time: null,
    
    // 订单数据
    orderData: null,
    
    // 乘客数
    passengers: 1,
    
    // 地图相关
    latitude: 31.23,
    longitude: 121.47,
    initialLatitude: 31.23,
    initialLongitude: 121.47,
    markers: [],
    
    // 面板高度（百分比）
    panelHeight: 60,
    minHeight: 15,
    maxHeight: 90,
    
    // 拖动相关
    startY: 0,
    startHeight: 0,
    isDragging: false,
    
    // 主题
    isDark: false,
    
    // 车辆动画定时器
    vehicleTimer: null
  },

  onLoad() {
    // 实例化腾讯地图SDK
    try {
      qqmapsdk = new QQMapWX({
        key: TENCENT_MAP_KEY
      });
      console.log('腾讯地图SDK初始化成功, Key:', TENCENT_MAP_KEY);
    } catch(e) {
      console.error('腾讯地图SDK初始化失败:', e);
      qqmapsdk = null;
    }
    
    // 加载主题设置
    const theme = wx.getStorageSync('theme');
    if (theme === 'dark') {
      this.setData({ isDark: true });
    }
    
    // 首先请求位置权限并获取用户位置
    this.requestLocationPermission();
  },

  onShow() {
    // 检查主题变化
    const theme = wx.getStorageSync('theme');
    if (theme === 'dark' && !this.data.isDark) {
      this.setData({ isDark: true });
    } else if (theme !== 'dark' && this.data.isDark) {
      this.setData({ isDark: false });
    }
    
    // 重新启动车辆动画
    if (!this.data.vehicleTimer) {
      this.startVehicleAnimation();
    }
  },

  onHide() {
    // 停止车辆动画
    this.stopVehicleAnimation();
  },

  onUnload() {
    // 停止车辆动画
    this.stopVehicleAnimation();
  },

  // 请求位置权限
  requestLocationPermission() {
    wx.showLoading({
      title: '正在获取位置...',
      mask: true
    });

    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          // 已授权，直接获取位置
          this.getUserLocation();
        } else {
          // 未授权，请求授权
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              this.getUserLocation();
            },
            fail: () => {
              // 授权失败，显示引导
              wx.hideLoading();
              wx.showModal({
                title: '需要位置权限',
                content: '小程序需要获取您的位置信息来显示附近车辆',
                confirmText: '去设置',
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    wx.openSetting({
                      success: (settingRes) => {
                        if (settingRes.authSetting['scope.userLocation']) {
                          this.getUserLocation();
                        } else {
                          this.useDefaultLocation();
                        }
                      }
                    });
                  } else {
                    this.useDefaultLocation();
                  }
                }
              });
            }
          });
        }
      }
    });
  },

  // 获取用户位置
  getUserLocation() {
    console.log('开始获取用户位置...');
    
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('获取位置成功:', res);
        
        // 先隐藏loading，避免卡住
        wx.hideLoading();
        
        // 设置用户位置为初始位置
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          initialLatitude: res.latitude,
          initialLongitude: res.longitude,
          startLocation: '定位中...'
        });
        
        // 安全地保存到全局数据（在使用时获取app实例）
        try {
          const app = getApp();
          if (app && app.globalData) {
            app.globalData.userLocation = {
              latitude: res.latitude,
              longitude: res.longitude
            };
          }
        } catch(e) {
          console.warn('保存到globalData失败，但不影响功能:', e);
        }

        // 启动车辆动画
        this.startVehicleAnimation();
        
        // 异步获取详细地址（不阻塞界面）
        this.getAddressFromLocation(res.latitude, res.longitude);
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('获取位置失败:', err);
        
        wx.showToast({
          title: '定位失败，使用默认位置',
          icon: 'none',
          duration: 2000
        });
        
        this.useDefaultLocation();
      }
    });
  },

  // 使用默认位置
  useDefaultLocation() {
    // 使用上海浦东作为默认位置
    this.setData({
      latitude: 31.23,
      longitude: 121.47,
      initialLatitude: 31.23,
      initialLongitude: 121.47,
      startLocation: '上海市浦东新区'
    });
    
    // 启动车辆动画
    this.startVehicleAnimation();
  },

  // 根据经纬度获取详细地址（逆地理编码）- 使用腾讯地图SDK
  getAddressFromLocation(latitude, longitude) {
    const that = this;
    
    console.log('开始逆地理编码, 坐标:', latitude, longitude);
    
    // 检查是否配置了key
    if (!TENCENT_MAP_KEY || TENCENT_MAP_KEY === 'YOUR_TENCENT_MAP_KEY') {
      console.warn('请先在 utils/map-config.js 中配置腾讯地图API Key');
      this.setData({
        startLocation: '当前位置'
      });
      return;
    }
    
    // 检查SDK是否初始化成功
    if (!qqmapsdk) {
      console.error('腾讯地图SDK未初始化');
      this.setData({
        startLocation: '当前位置'
      });
      return;
    }
    
    console.log('调用SDK reverseGeocoder方法...');
    
    // 使用腾讯地图SDK的reverseGeocoder方法
    qqmapsdk.reverseGeocoder({
      // 位置坐标 - Object格式
      location: {
        latitude: latitude,
        longitude: longitude
      },
      // 是否返回周边POI列表：1.返回；0不返回
      get_poi: 1,
      // POI控制选项：policy=2到家场景，精确到楼栋；radius=100搜索半径100米
      poi_options: 'policy=2;radius=100;address_format=short',
      // 成功回调
      success: function(res) {
        console.log('逆地理编码成功, 完整响应：', JSON.stringify(res));
        
        if (res.status === 0 && res.result) {
          const result = res.result;
          let addressText = '';
          
          // 优先级1：使用最近的POI信息（具体建筑物、商场、写字楼等）
          if (result.pois && result.pois.length > 0) {
            const poi = result.pois[0];
            // POI标题通常是建筑物名称，如"xx科技大厦"
            addressText = poi.title;
            console.log('✅ 使用POI地址：', addressText, ', 距离:', poi._distance + '米');
          } 
          // 优先级2：使用推荐的格式化地址（更详细和规范）
          else if (result.formatted_addresses && result.formatted_addresses.recommend) {
            addressText = result.formatted_addresses.recommend;
            console.log('✅ 使用推荐地址：', addressText);
          }
          // 优先级3：使用标准格式化地址
          else if (result.address) {
            addressText = result.address;
            console.log('✅ 使用标准地址：', addressText);
          }
          
          console.log('最终显示地址：', addressText);
          
          that.setData({
            startLocation: addressText || '当前位置'
          });

          wx.showToast({
            title: '地址获取成功',
            icon: 'success',
            duration: 1500
          });
        } else {
          // API返回错误状态
          console.error('❌ 逆地理编码返回错误状态:', res.status, res.message);
          that.setData({
            startLocation: '当前位置'
          });
        }
      },
      // 失败回调
      fail: function(error) {
        console.error('❌ 逆地理编码失败:', JSON.stringify(error));
        console.error('错误详情 - status:', error.status, ', message:', error.message);
        
        that.setData({
          startLocation: '当前位置'
        });
      },
      // 完成回调（无论成功失败都会执行）
      complete: function(res) {
        console.log('逆地理编码完成, status:', res ? res.status : 'unknown');
      }
    });
  },

  // 启动车辆动画
  startVehicleAnimation() {
    // 初始化车辆
    this.generateVehicles();
    
    // 每2秒更新一次车辆位置
    const timer = setInterval(() => {
      this.updateVehiclePositions();
    }, 2000);
    
    this.setData({ vehicleTimer: timer });
  },

  // 停止车辆动画
  stopVehicleAnimation() {
    if (this.data.vehicleTimer) {
      clearInterval(this.data.vehicleTimer);
      this.setData({ vehicleTimer: null });
    }
  },

  // 生成车辆
  generateVehicles() {
    const { latitude, longitude } = this.data;
    const vehicles = [];
    const types = ['taxi', 'taxi', 'taxi', 'autonomous', 'robot'];
    
    // 在用户周围生成8-12辆车
    const count = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 0.01 + Math.random() * 0.02; // 1-3公里范围
      
      const lat = latitude + distance * Math.cos(angle);
      const lng = longitude + distance * Math.sin(angle);
      const type = types[Math.floor(Math.random() * types.length)];
      
      vehicles.push({
        id: i,
        latitude: lat,
        longitude: lng,
        type: type,
        // 随机移动方向和速度
        direction: Math.random() * 2 * Math.PI,
        speed: 0.0001 + Math.random() * 0.0002,
        // 暂时不使用图标，使用默认标记点
        // iconPath: '/assets/icons/car-marker.png',
        width: 8,
        height: 8,
        rotate: Math.floor(Math.random() * 360)
      });
    }
    
    this.vehicles = vehicles;
    this.updateMarkers();
  },

  // 更新车辆位置
  updateVehiclePositions() {
    if (!this.vehicles) return;
    
    const { latitude, longitude } = this.data;
    
    this.vehicles.forEach(vehicle => {
      // 随机改变方向（10%概率）
      if (Math.random() < 0.1) {
        vehicle.direction += (Math.random() - 0.5) * Math.PI / 2;
      }
      
      // 移动车辆
      vehicle.latitude += vehicle.speed * Math.cos(vehicle.direction);
      vehicle.longitude += vehicle.speed * Math.sin(vehicle.direction);
      vehicle.rotate = (vehicle.direction * 180 / Math.PI + 90) % 360;
      
      // 如果离用户太远，重新生成位置
      const distance = Math.sqrt(
        Math.pow(vehicle.latitude - latitude, 2) + 
        Math.pow(vehicle.longitude - longitude, 2)
      );
      
      if (distance > 0.04) {
        const angle = Math.random() * 2 * Math.PI;
        const newDistance = 0.01 + Math.random() * 0.01;
        vehicle.latitude = latitude + newDistance * Math.cos(angle);
        vehicle.longitude = longitude + newDistance * Math.sin(angle);
      }
    });
    
    this.updateMarkers();
  },

  // 更新地图标记
  updateMarkers() {
    if (!this.vehicles) return;
    
    const markers = this.vehicles.map(vehicle => ({
      id: vehicle.id,
      latitude: vehicle.latitude,
      longitude: vehicle.longitude,
      width: 8,
      height: 8,
      // iconPath: '/assets/icons/car-marker.png', // 暂不使用图标
      rotate: vehicle.rotate
    }));
    
    this.setData({ markers });
  },

  // 服务选择
  onServiceSelect(e) {
    const serviceId = e.currentTarget.dataset.id;
    const service = this.data.mainServices.find(s => s.id === serviceId);
    
    // 设置起点为用户当前位置（使用已获取的详细地址）
    this.setData({
      selectedService: serviceId,
      serviceName: service.name,
      currentState: 'address',
      startAddress: this.data.startLocation, // 起点固定为用户当前位置
      endAddress: '', // 清空终点
      endLatitude: null,
      endLongitude: null,
      suggestions: [],
      showSuggestions: false,
      distance: null,
      price: null,
      time: null
    });
  },

  // 目的地输入
  onDestinationInput(e) {
    this.setData({
      destination: e.detail.value
    });
  },

  // 起点地址输入（起点固定为用户当前位置，禁止修改）
  onStartAddressInput(e) {
    // 起点固定为用户当前位置，不允许修改
    wx.showToast({
      title: '起点为当前位置',
      icon: 'none',
      duration: 1500
    });
  },

  // 终点地址输入 - 触发关键词提示
  onEndAddressInput(e) {
    const keyword = e.detail.value;
    
    this.setData({
      endAddress: keyword
    });
    
    // 如果输入为空，隐藏提示列表
    if (!keyword || keyword.trim() === '') {
      this.setData({
        suggestions: [],
        showSuggestions: false
      });
      return;
    }
    
    // 调用关键词提示接口
    this.getSuggestions(keyword);
  },
  
  // 获取关键词提示
  getSuggestions(keyword) {
    const that = this;
    
    console.log('获取关键词提示:', keyword);
    
    // 调用SDK的getSuggestion方法
    qqmapsdk.getSuggestion({
      keyword: keyword,
      // 限制在用户附近搜索（提高准确性）
      location: {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      success: function(res) {
        console.log('关键词提示成功:', res);
        
        if (res.status === 0 && res.data && res.data.length > 0) {
          that.setData({
            suggestions: res.data,
            showSuggestions: true
          });
        } else {
          that.setData({
            suggestions: [],
            showSuggestions: false
          });
        }
      },
      fail: function(error) {
        console.error('关键词提示失败:', error);
        that.setData({
          suggestions: [],
          showSuggestions: false
        });
      }
    });
  },
  
  // 选择提示地址
  selectSuggestion(e) {
    const index = e.currentTarget.dataset.index;
    const suggestion = this.data.suggestions[index];
    
    console.log('选择地址:', suggestion);
    
    // 更新终点地址和坐标
    this.setData({
      endAddress: suggestion.title,
      endLatitude: suggestion.location.lat,
      endLongitude: suggestion.location.lng,
      suggestions: [],
      showSuggestions: false
    });
    
    // 自动计算路线
    this.calculateRoute();
  },

  // 地址输入失去焦点时计算
  onAddressBlur() {
    if (this.data.startAddress && this.data.endAddress) {
      this.calculateRoute();
    }
  },

  // 计算路线 - 使用真实的距离计算API
  calculateRoute() {
    const { latitude, longitude, endLatitude, endLongitude, selectedService } = this.data;
    const that = this;
    
    // 检查是否有终点坐标
    if (!endLatitude || !endLongitude) {
      wx.showToast({
        title: '请选择目的地',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    
    wx.showLoading({
      title: '计算中...',
      mask: true
    });
    
    console.log('开始计算距离 - 起点:', latitude, longitude, '终点:', endLatitude, endLongitude);
    
    // 调用SDK的calculateDistance方法（驾车模式）
    qqmapsdk.calculateDistance({
      mode: 'driving', // 驾车模式
      from: {
        latitude: latitude,
        longitude: longitude
      },
      to: {
        latitude: endLatitude,
        longitude: endLongitude
      },
      success: function(res) {
        wx.hideLoading();
        console.log('距离计算成功:', res);
        
        if (res.status === 0 && res.result && res.result.elements && res.result.elements.length > 0) {
          const element = res.result.elements[0];
          const distanceInMeters = element.distance; // 米
          const durationInSeconds = element.duration; // 秒
          
          // 转换为公里
          const distanceInKm = (distanceInMeters / 1000).toFixed(1);
          
          // 转换为分钟
          const timeInMinutes = Math.ceil(durationInSeconds / 60);
          
          console.log('距离:', distanceInKm, 'km, 时间:', timeInMinutes, '分钟');
          
          // 根据距离和车型计算价格
          const price = that.calculatePrice(parseFloat(distanceInKm), selectedService);
          
          that.setData({
            distance: parseFloat(distanceInKm),
            price: price,
            time: timeInMinutes
          });
          
          wx.showToast({
            title: '计算完成',
            icon: 'success',
            duration: 1500
          });
        } else {
          wx.showToast({
            title: '计算失败，请重试',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function(error) {
        wx.hideLoading();
        console.error('距离计算失败:', error);
        wx.showToast({
          title: '计算失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  
  // 根据距离和车型计算价格
  calculatePrice(distance, serviceType) {
    // 价格计算规则：
    // 起步价 + 里程费 × 距离
    const priceRules = {
      taxi: {
        startPrice: 14,      // 起步价14元（含3公里）
        startDistance: 3,    // 起步距离3公里
        pricePerKm: 2.6,     // 超出部分每公里2.6元
        name: '快车'
      },
      wind: {
        startPrice: 8,       // 起步价8元（含3公里）
        startDistance: 3,
        pricePerKm: 1.8,     // 超出部分每公里1.8元
        name: '顺风车'
      },
      driver: {
        startPrice: 30,      // 起步价30元（含5公里）
        startDistance: 5,
        pricePerKm: 4.0,     // 超出部分每公里4元
        name: '代驾'
      },
      robot: {
        startPrice: 5,       // 起步价5元（含2公里）
        startDistance: 2,
        pricePerKm: 1.2,     // 超出部分每公里1.2元
        name: '机器人'
      },
      autonomous: {
        startPrice: 12,      // 起步价12元（含3公里）
        startDistance: 3,
        pricePerKm: 2.2,     // 超出部分每公里2.2元
        name: '无人车'
      }
    };
    
    const rule = priceRules[serviceType] || priceRules.taxi;
    
    let totalPrice = rule.startPrice;
    
    // 如果超出起步距离，计算超出部分的费用
    if (distance > rule.startDistance) {
      const extraDistance = distance - rule.startDistance;
      totalPrice += extraDistance * rule.pricePerKm;
    }
    
    // 返回取整后的价格
    return Math.round(totalPrice);
  },

  // 确认行程
  confirmAddress() {
    const { distance, price, time } = this.data;
    
    if (!distance || !price || !time) {
      wx.showToast({
        title: '请先输入地址',
        icon: 'none'
      });
      return;
    }

    this.setData({
      orderData: {
        service: this.data.selectedService,
        serviceName: this.data.serviceName,
        startAddress: this.data.startAddress,
        endAddress: this.data.endAddress,
        distance: this.data.distance,
        price: this.data.price,
        time: this.data.time
      },
      currentState: 'order'
    });
  },

  // 返回到主页
  backToHome() {
    this.setData({
      currentState: 'home',
      selectedService: null,
      serviceName: '',
      startAddress: '',
      endAddress: '',
      destination: '',
      distance: null,
      price: null,
      time: null,
      orderData: null,
      passengers: 1
    });
  },

  // 返回到地址输入页
  backToAddress() {
    this.setData({
      currentState: 'address',
      orderData: null,
      passengers: 1
    });
  },

  // 乘客数调整
  decreasePassengers() {
    if (this.data.passengers > 1) {
      this.setData({
        passengers: this.data.passengers - 1
      });
    }
  },

  increasePassengers() {
    this.setData({
      passengers: this.data.passengers + 1
    });
  },

  // 立即下单
  placeOrder() {
    wx.showModal({
      title: '订单确认',
      content: `确认下单？预估价格：¥${this.data.orderData.price}`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '下单成功！',
            icon: 'success'
          });
          
          // 延迟返回主页
          setTimeout(() => {
            this.backToHome();
          }, 1500);
        }
      }
    });
  },

  // 分享行程
  shareTrip() {
    wx.showToast({
      title: '分享功能开发中',
      icon: 'none'
    });
  },

  // 添加停靠点
  addStopover() {
    wx.showToast({
      title: '添加停靠点功能开发中',
      icon: 'none'
    });
  },

  // 面板拖动开始
  onDragStart(e) {
    const touch = e.touches[0];
    const { windowHeight } = wx.getSystemInfoSync();
    
    // 轻触觉反馈
    wx.vibrateShort({
      type: 'light'
    });
    
    this.dragData = {
      startY: touch.clientY,
      startHeight: this.data.panelHeight,
      isDragging: true,
      screenHeight: windowHeight,
      lastUpdate: Date.now()
    };
    
    // 标记正在拖动，移除transition
    this.setData({
      isDragging: true
    });
  },

  // 面板拖动中（使用节流优化性能）
  onDragMove(e) {
    if (!this.dragData || !this.dragData.isDragging) return;
    
    const touch = e.touches[0];
    const deltaY = this.dragData.startY - touch.clientY;
    const deltaPercent = (deltaY / this.dragData.screenHeight) * 100;
    
    let newHeight = this.dragData.startHeight + deltaPercent;
    newHeight = Math.max(this.data.minHeight, Math.min(this.data.maxHeight, newHeight));
    
    // 使用节流，每16ms（约60fps）更新一次
    const now = Date.now();
    if (now - this.dragData.lastUpdate < 16) {
      return;
    }
    this.dragData.lastUpdate = now;
    
    // 直接更新data，但使用异步更新避免阻塞
    this.setData({
      panelHeight: newHeight
    });
  },

  // 面板拖动结束
  onDragEnd() {
    if (!this.dragData) return;
    
    this.dragData.isDragging = false;
    
    // 自动吸附到合适的高度
    const { panelHeight } = this.data;
    let targetHeight = panelHeight;
    
    if (panelHeight < 30) {
      targetHeight = 15; // 最小化
    } else if (panelHeight < 50) {
      targetHeight = 40; // 中等高度
    } else if (panelHeight < 70) {
      targetHeight = 60; // 默认高度
    } else {
      targetHeight = 85; // 最大化
    }
    
    // 如果高度变化较大，给一个轻微的振动反馈
    if (Math.abs(targetHeight - panelHeight) > 10) {
      wx.vibrateShort({
        type: 'light'
      });
    }
    
    // 标记拖动结束，添加transition，然后更新高度
    this.setData({
      isDragging: false,
      panelHeight: targetHeight
    });
    
    this.dragData = null;
  },

  // 地图区域改变（用户拖动地图或点击地图）
  onMapRegionChange(e) {
    if (e.type === 'end' && e.causedBy === 'drag') {
      // 获取地图中心点坐标
      const mapCtx = wx.createMapContext('mainMap');
      mapCtx.getCenterLocation({
        success: (res) => {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
        }
      });
    }
  },

  // 地图点击
  onMapTap(e) {
    // 用户点击地图，更新锚点位置
    if (e.detail && e.detail.latitude) {
      this.setData({
        latitude: e.detail.latitude,
        longitude: e.detail.longitude
      });
    }
  },

  // 地图控制 - 放大
  zoomIn() {
    const mapCtx = wx.createMapContext('mainMap');
    mapCtx.getCenterLocation({
      success: (res) => {
        // 保持当前中心位置
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    });
  },

  // 重置到初始位置
  relocate() {
    this.setData({
      latitude: this.data.initialLatitude,
      longitude: this.data.initialLongitude
    });
    
    // 重新生成车辆
    this.generateVehicles();
    
    wx.showToast({
      title: '已回到初始位置',
      icon: 'success',
      duration: 1500
    });
  }
});

