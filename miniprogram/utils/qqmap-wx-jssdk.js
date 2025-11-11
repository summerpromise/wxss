/**
 * 腾讯地图微信小程序JavaScript SDK
 * 文档：https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview
 */

class QQMapWX {
  constructor(options) {
    if (!options.key) {
      throw Error('请传入key值');
    }
    this.key = options.key;
  }

  /**
   * 逆地址解析
   * 提供由坐标到坐标所在位置的文字描述的转换
   */
  reverseGeocoder(options) {
    const that = this;
    options = options || {};
    
    // 处理location参数
    let locationParam = '';
    if (options.location) {
      if (typeof options.location === 'string') {
        locationParam = options.location;
      } else if (typeof options.location === 'object') {
        locationParam = `${options.location.latitude},${options.location.longitude}`;
      }
    }

    // 构建请求参数
    const requestData = {
      key: that.key,
      get_poi: options.get_poi || 0,
      output: 'json'
    };

    // 如果有location参数，添加到请求中
    if (locationParam) {
      requestData.location = locationParam;
    }

    // 如果有poi_options参数
    if (options.poi_options) {
      requestData.poi_options = options.poi_options;
    }

    // 如果有coord_type参数
    if (options.coord_type) {
      requestData.coord_type = options.coord_type;
    }

    // 打印请求信息
    console.log('SDK发起请求 - URL:', 'https://apis.map.qq.com/ws/geocoder/v1/');
    console.log('SDK发起请求 - 参数:', JSON.stringify(requestData));
    
    // 发起请求
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: requestData,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('SDK请求成功 - statusCode:', res.statusCode);
        console.log('SDK请求成功 - data.status:', res.data ? res.data.status : 'undefined');
        
        if (res.statusCode === 200) {
          if (res.data.status === 0) {
            // 请求成功
            console.log('SDK逆地理编码成功');
            if (options.success) {
              options.success(res.data);
            }
          } else {
            // API返回错误
            console.error('SDK API返回错误:', res.data.status, res.data.message);
            if (options.fail) {
              options.fail(res.data);
            } else if (options.complete) {
              options.complete(res.data);
            }
          }
        } else {
          // HTTP请求失败
          console.error('SDK HTTP请求失败, statusCode:', res.statusCode);
          if (options.fail) {
            options.fail({
              status: 1000,
              message: 'network request error, statusCode: ' + res.statusCode
            });
          }
        }
        
        if (options.complete) {
          options.complete(res.data || res);
        }
      },
      fail(error) {
        console.error('SDK请求失败:', error);
        if (options.fail) {
          options.fail({
            status: 1000,
            message: error.errMsg || 'network request error'
          });
        }
        if (options.complete) {
          options.complete({
            status: 1000,
            message: error.errMsg || 'network request error'
          });
        }
      }
    });
  }

  /**
   * 关键词输入提示
   * 用于获取输入关键字的补完与提示
   */
  getSuggestion(options) {
    const that = this;
    options = options || {};

    // 构建请求参数
    const requestData = {
      key: that.key,
      output: 'json'
    };

    // 关键词
    if (options.keyword) {
      requestData.keyword = options.keyword;
    }

    // 限制城市范围
    if (options.region) {
      requestData.region = options.region;
    }

    // 限制指定地区范围
    if (options.location) {
      if (typeof options.location === 'string') {
        requestData.location = options.location;
      } else if (typeof options.location === 'object') {
        requestData.location = `${options.location.latitude},${options.location.longitude}`;
      }
    }

    // 是否返回子地点
    if (options.get_subpois !== undefined) {
      requestData.get_subpois = options.get_subpois;
    }

    console.log('SDK发起关键词提示请求 - 参数:', JSON.stringify(requestData));

    // 发起请求
    wx.request({
      url: 'https://apis.map.qq.com/ws/place/v1/suggestion',
      data: requestData,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('SDK关键词提示请求成功 - statusCode:', res.statusCode);
        
        if (res.statusCode === 200) {
          if (res.data.status === 0) {
            console.log('SDK关键词提示成功');
            if (options.success) {
              options.success(res.data);
            }
          } else {
            console.error('SDK关键词提示API返回错误:', res.data.status, res.data.message);
            if (options.fail) {
              options.fail(res.data);
            }
          }
        } else {
          console.error('SDK关键词提示HTTP请求失败, statusCode:', res.statusCode);
          if (options.fail) {
            options.fail({
              status: 1000,
              message: 'network request error, statusCode: ' + res.statusCode
            });
          }
        }
        
        if (options.complete) {
          options.complete(res.data || res);
        }
      },
      fail(error) {
        console.error('SDK关键词提示请求失败:', error);
        if (options.fail) {
          options.fail({
            status: 1000,
            message: error.errMsg || 'network request error'
          });
        }
        if (options.complete) {
          options.complete({
            status: 1000,
            message: error.errMsg || 'network request error'
          });
        }
      }
    });
  }

  /**
   * 距离计算
   * 计算一个点到多点的步行、驾车距离
   */
  calculateDistance(options) {
    const that = this;
    options = options || {};

    // 构建请求参数
    const requestData = {
      key: that.key,
      mode: options.mode || 'driving', // 默认驾车
      output: 'json'
    };

    // 处理from参数（起点）
    if (options.from) {
      if (typeof options.from === 'string') {
        requestData.from = options.from;
      } else if (typeof options.from === 'object') {
        requestData.from = `${options.from.latitude},${options.from.longitude}`;
      }
    }

    // 处理to参数（终点）- 必填
    if (options.to) {
      if (typeof options.to === 'string') {
        requestData.to = options.to;
      } else if (Array.isArray(options.to)) {
        // 数组格式
        const toArray = options.to.map(item => {
          if (item.location) {
            // Object格式2：{location: {lat, lng}}
            return `${item.location.lat},${item.location.lng}`;
          } else if (item.latitude !== undefined) {
            // Object格式1：{latitude, longitude}
            return `${item.latitude},${item.longitude}`;
          }
          return '';
        });
        requestData.to = toArray.join(';');
      } else if (typeof options.to === 'object') {
        // 单个对象
        if (options.to.latitude !== undefined) {
          requestData.to = `${options.to.latitude},${options.to.longitude}`;
        } else if (options.to.location) {
          requestData.to = `${options.to.location.lat},${options.to.location.lng}`;
        }
      }
    }

    console.log('SDK发起距离计算请求 - URL:', 'https://apis.map.qq.com/ws/distance/v1/');
    console.log('SDK发起距离计算请求 - 参数:', JSON.stringify(requestData));

    // 发起请求
    wx.request({
      url: 'https://apis.map.qq.com/ws/distance/v1/',
      data: requestData,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('SDK距离计算请求成功 - statusCode:', res.statusCode);
        console.log('SDK距离计算请求成功 - data:', JSON.stringify(res.data));
        
        if (res.statusCode === 200) {
          if (res.data.status === 0) {
            console.log('SDK距离计算成功');
            if (options.success) {
              options.success(res.data);
            }
          } else {
            console.error('SDK距离计算API返回错误:', res.data.status, res.data.message);
            if (options.fail) {
              options.fail(res.data);
            }
          }
        } else {
          console.error('SDK距离计算HTTP请求失败, statusCode:', res.statusCode);
          if (options.fail) {
            options.fail({
              status: 1000,
              message: 'network request error, statusCode: ' + res.statusCode
            });
          }
        }
        
        if (options.complete) {
          options.complete(res.data || res);
        }
      },
      fail(error) {
        console.error('SDK距离计算请求失败:', error);
        if (options.fail) {
          options.fail({
            status: 1000,
            message: error.errMsg || 'network request error'
          });
        }
        if (options.complete) {
          options.complete({
            status: 1000,
            message: error.errMsg || 'network request error'
          });
        }
      }
    });
  }

  /**
   * 地点搜索
   */
  search(options) {
    console.log('search method not implemented yet');
  }

  /**
   * 地址解析
   */
  geocoder(options) {
    console.log('geocoder method not implemented yet');
  }
}

module.exports = QQMapWX;

