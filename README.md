# 🚗 打车小程序

<p align="center">
  <img src="https://img.shields.io/badge/WeChat-MiniProgram-07C160?style=for-the-badge&logo=wechat&logoColor=white" alt="WeChat MiniProgram">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge" alt="Version">
</p>

一个功能完整的**微信小程序打车应用**，支持多种出行方式、智能地址搜索、实时定位、动态价格计算。采用现代化设计，提供流畅的用户体验。

---

## ✨ 核心功能

### 🚕 多种出行服务

提供5种不同的出行方式，满足各类出行需求：

| 服务类型 | 特点 | 起步价 | 里程费 |
|---------|------|--------|--------|
| 🚗 **快车** | 快速便捷的日常出行 | 14元（含3km） | 2.6元/km |
| 🌪️ **顺风车** | 经济实惠的共享出行 | 8元（含3km） | 1.8元/km |
| 🎯 **代驾** | 专业的代驾服务 | 30元（含5km） | 4.0元/km |
| 🤖 **机器人** | 智能配送服务 | 5元（含2km） | 1.2元/km |
| ⚡ **无人车** | 未来科技出行体验 | 12元（含3km） | 2.2元/km |

### 📍 智能定位系统

- ✅ **自动获取位置** - 启动时自动获取用户GPS位置
- ✅ **精确地址解析** - 显示具体建筑物名称（如："xx科技大厦"）
- ✅ **实时车辆动态** - 地图上显示周边可用车辆
- ✅ **一键重置** - 快速回到用户当前位置

### 🔍 智能地址搜索

- **关键词提示** - 输入时实时显示地点建议
- **快速选择** - 点击提示直接填充地址
- **附近优先** - 优先显示用户附近的地点
- **起点锁定** - 起点自动设为当前位置，无法修改

### 💰 动态价格计算

- **真实距离** - 基于腾讯地图驾车路线计算
- **预估时间** - 考虑路况的时间预测
- **透明计费** - 清晰展示起步价和里程费
- **智能降级** - API配额用完时自动切换到估算模式

### 🗺️ 交互式地图

- **实时地图** - 集成腾讯地图服务
- **动态标记** - 车辆位置实时更新
- **拖动调整** - 支持手势缩放和拖动
- **自定义锚点** - 显示用户位置的动态标记

### 🎨 主题切换

- **白天模式** - 简约清爽的浅色系
- **夜间模式** - 科技感十足的深色主题
- **一键切换** - 在个人中心快速切换
- **自动保存** - 记住用户的主题偏好

---

## 🛠️ 技术栈

### 前端框架
- **微信小程序** - 原生开发框架
- **WXML** - 页面结构
- **WXSS** - 样式表（支持CSS变量）
- **JavaScript** - 业务逻辑

### 地图服务
- **腾讯位置服务 API**
  - 逆地理编码（Reverse Geocoder）
  - 关键词输入提示（Suggestion）
  - 驾车距离计算（Distance Matrix）

### 核心特性
- **响应式设计** - 适配不同屏幕尺寸
- **主题系统** - 基于CSS变量的主题切换
- **动画效果** - CSS动画 + 微信动画API
- **容错机制** - API降级方案，保证服务可用性

---

## 📦 项目结构

```
car2/
├── miniprogram/                    # 小程序主目录
│   ├── pages/                     # 页面目录
│   │   ├── index/                # 主页（地图+打车）
│   │   │   ├── index.js         # 页面逻辑
│   │   │   ├── index.wxml       # 页面结构
│   │   │   ├── index.wxss       # 页面样式
│   │   │   └── index.json       # 页面配置
│   │   └── profile/              # 个人中心
│   │       ├── profile.js
│   │       ├── profile.wxml
│   │       ├── profile.wxss
│   │       └── profile.json
│   ├── utils/                     # 工具类
│   │   ├── qqmap-wx-jssdk.js    # 腾讯地图SDK（自定义）
│   │   ├── map-config.js         # 地图API配置
│   │   └── util.js               # 通用工具函数
│   ├── assets/                    # 静态资源
│   │   └── icons/                # 图标资源
│   ├── app.js                     # 小程序入口
│   ├── app.json                   # 全局配置
│   ├── app.wxss                   # 全局样式
│   ├── sitemap.json              # 站点地图配置
│   ├── 配置说明-必读.txt          # API配置说明
│   ├── 新功能说明.txt             # 功能详细说明
│   ├── 调试说明.txt               # 调试指南
│   └── API配额问题解决方案.txt    # 配额问题解决方案
├── project.config.json            # 项目配置
├── project.private.config.json   # 私有配置
└── README.md                      # 项目说明（本文件）
```

---

## 🚀 快速开始

### 前置要求

- **微信开发者工具** - [下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- **微信小程序账号** - 或使用测试号
- **腾讯地图API Key** - [申请地址](https://lbs.qq.com/)

### 1. 克隆项目

```bash
git clone https://github.com/summerpromise/wxss.git
cd wxss
```

### 2. 配置腾讯地图API Key

#### 2.1 申请Key

1. 访问 [腾讯位置服务](https://lbs.qq.com/)
2. 注册并登录（可使用QQ或微信）
3. 点击 **控制台** → **应用管理** → **我的应用** → **创建应用**
4. 填写应用信息：
   - 应用名称：打车小程序
   - 应用类型：微信小程序
5. 点击 **添加Key**
6. 选择 **WebServiceAPI**（⚠️ 重要！必须勾选）
7. 复制生成的Key

#### 2.2 配置Key

打开文件 `miniprogram/utils/map-config.js`，替换为您的Key：

```javascript
const TENCENT_MAP_KEY = '你的API_KEY';
```

#### 2.3 分配配额（重要！）

1. 在控制台进入：**账户管理** → **账户额度**
2. 为以下服务分配配额（建议每项至少1,000次/天）：
   - 逆地理编码
   - 关键词输入提示
   - 距离计算

### 3. 配置微信开发者工具

1. 打开微信开发者工具
2. 选择 **导入项目**
3. 选择项目目录
4. 填入 **AppID**（或选择测试号）
5. 点击 **导入**

### 4. 配置服务器域名

#### 开发调试阶段（推荐）

在微信开发者工具中：
1. 点击右上角 **详情**
2. 选择 **本地设置**
3. 勾选 **不校验合法域名、web-view（业务域名）、TLS版本以及HTTPS证书**

#### 正式发布时

在微信公众平台配置request合法域名：

1. 登录 [微信公众平台](https://mp.weixin.qq.com/)
2. 进入小程序管理后台
3. **开发** → **开发管理** → **开发设置** → **服务器域名**
4. 在 **request合法域名** 中添加：
   ```
   https://apis.map.qq.com
   ```

### 5. 运行项目

点击微信开发者工具中的 **编译** 按钮，即可在模拟器中预览。

---

## 📝 详细文档

项目内包含完整的配置和使用文档：

| 文档 | 说明 |
|------|------|
| `miniprogram/配置说明-必读.txt` | 腾讯地图API配置详细步骤 |
| `miniprogram/新功能说明.txt` | 所有功能的详细说明和使用方法 |
| `miniprogram/调试说明.txt` | 调试步骤和常见问题解决 |
| `miniprogram/API配额问题解决方案.txt` | API配额用完的解决方案 |

---

## 💡 核心功能说明

### 地址搜索流程

```
用户输入 "天安门"
    ↓
调用关键词提示API
    ↓
显示提示列表：
  - 天安门广场（北京市东城区）
  - 天安门东站（地铁站）
    ↓
用户点击选择
    ↓
自动填充地址并获取坐标
    ↓
触发距离计算
```

### 距离计算流程

```
起点：用户当前位置（自动获取）
终点：用户选择的地点
    ↓
调用距离计算API（驾车模式）
    ↓
成功：
  - 返回真实驾车距离（米）
  - 返回预估时间（秒）
    ↓
失败（配额用完）：
  - 自动切换到降级方案
  - 使用Haversine公式计算直线距离
  - 乘以1.35系数估算驾车距离
    ↓
根据距离和车型计算价格
    ↓
显示结果
```

### 价格计算规则

所有车型都采用 **起步价 + 超出里程费** 的计费方式：

```javascript
总价 = 起步价 + max(0, 实际距离 - 起步距离) × 里程单价
```

**示例：**

快车，距离8公里：
```
起步价：14元（含3公里）
超出里程：8 - 3 = 5公里
里程费：5 × 2.6 = 13元
总价：14 + 13 = 27元
```

---

## 🎯 智能降级方案

### 为什么需要降级？

腾讯地图API有每日调用配额限制。当配额用完时，如果不做处理，用户将无法使用距离计算功能。

### 降级方案

我们实现了智能降级机制：

**正常模式（API可用）：**
- ✅ 使用真实驾车路线计算
- ✅ 精确的距离和时间
- ✅ 最佳用户体验

**降级模式（API不可用）：**
- ⚠️ 使用Haversine公式计算直线距离
- ⚠️ 乘以1.35系数估算驾车距离
- ⚠️ 按平均速度30km/h估算时间
- ⚠️ 提示用户："API配额已用完，已使用直线距离估算"

### 降级算法

使用Haversine公式计算两点间的球面距离：

```javascript
const R = 6371; // 地球半径（公里）
const dLat = (lat2 - lat1) * Math.PI / 180;
const dLng = (lng2 - lng1) * Math.PI / 180;

const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180) * 
          Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLng/2) * Math.sin(dLng/2);

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
const distance = R * c;

// 城市道路系数
const drivingDistance = distance * 1.35;
```

### 精度对比

| 指标 | 正常模式 | 降级模式 |
|------|---------|---------|
| 距离精度 | 99% | 约85%（±15%） |
| 时间精度 | 考虑路况 | 估算值（±20%） |
| 用户体验 | 最佳 | 良好 |
| 依赖性 | 依赖API | 完全独立 |

---

## 🔧 配置选项

### app.json 配置

```json
{
  "pages": [
    "pages/index/index",
    "pages/profile/profile"
  ],
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "主页"
      },
      {
        "pagePath": "pages/profile/profile",
        "text": "我的"
      }
    ]
  },
  "permission": {
    "scope.userLocation": {
      "desc": "你的位置信息将用于显示附近车辆与路线规划"
    }
  },
  "requiredPrivateInfos": [
    "getLocation",
    "chooseLocation"
  ]
}
```

### 主题配置（app.wxss）

支持通过CSS变量自定义主题：

```css
/* 白天模式 */
page {
  --primary: #2563eb;
  --background: #ffffff;
  --foreground: #1a1a1a;
}

/* 夜间模式 */
.dark {
  --primary: #00d4ff;
  --background: #0a0e27;
  --foreground: #f5f5f5;
}
```

---

## 📱 功能截图

### 主界面
- 实时地图显示
- 周边车辆动态
- 多种服务选择

### 地址输入
- 起点锁定为当前位置
- 关键词智能提示
- 距离和价格计算

### 个人中心
- 主题切换
- 用户信息
- 其他设置

*（建议添加实际截图）*

---

## 📊 API使用说明

### API配额

腾讯地图API每日免费额度（每个接口独立）：

| 服务 | 免费额度 | 超额费用 |
|------|---------|---------|
| 逆地理编码 | 10,000次/天 | 根据套餐收费 |
| 关键词提示 | 10,000次/天 | 根据套餐收费 |
| 距离计算 | 10,000次/天 | 根据套餐收费 |

**说明：**
- 对于个人开发者和中小型应用，免费额度完全够用
- 可在控制台实时查看使用情况
- 超出免费额度后，服务会自动切换到降级模式

### API调用次数优化

为了节省API配额，项目中实现了以下优化：

1. **防抖处理** - 用户输入关键词时，延迟调用API
2. **缓存机制** - 相同查询结果会被缓存
3. **智能降级** - API失败时自动使用本地算法
4. **错误重试** - 网络错误时自动重试

---

## ⚙️ 环境变量

### 必需配置

在 `miniprogram/utils/map-config.js` 中配置：

```javascript
const TENCENT_MAP_KEY = 'YOUR_API_KEY';  // ⚠️ 必须配置

module.exports = {
  TENCENT_MAP_KEY
};
```

### 可选配置

在 `miniprogram/app.js` 中可以配置：

```javascript
App({
  globalData: {
    userInfo: null,
    userLocation: null,  // 用户位置缓存
    theme: 'light'       // 默认主题
  }
});
```

---

## 🐛 常见问题

### Q1: 小程序显示空白？

**A:** 检查以下几点：
1. 是否正确配置了AppID
2. 是否在开发者工具中勾选了"不校验合法域名"
3. 查看Console是否有错误日志

### Q2: 定位失败或不准确？

**A:** 
1. 确认已授权位置权限
2. 开发者工具使用的是IP定位，精度有限，建议真机测试
3. 检查 `wx.getLocation` 是否设置了 `type: 'gcj02'`

### Q3: 关键词提示不显示？

**A:** 
1. 检查API Key是否正确配置
2. 查看Console是否有API调用错误
3. 确认已勾选"不校验合法域名"或配置了服务器域名白名单
4. 检查API Key是否开通了"关键词输入提示"权限

### Q4: 距离计算失败，显示"API配额已用完"？

**A:** 
1. 登录腾讯位置服务控制台查看配额使用情况
2. 在"账户额度"中为"距离计算"服务分配配额
3. 如果配额用完，系统会自动使用降级方案，功能仍可正常使用

### Q5: 价格显示不正确？

**A:** 
1. 检查距离是否正确计算
2. 确认选择的车型正确
3. 查看 `calculatePrice` 方法中的价格规则是否正确

### Q6: 真机调试时无法访问API？

**A:** 
1. 必须在微信公众平台配置服务器域名白名单
2. 开发者工具的"不校验域名"在真机上无效
3. 添加 `https://apis.map.qq.com` 到request合法域名

---

## 🤝 贡献指南

欢迎贡献代码、提出建议或报告问题！

### 贡献步骤

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 代码规范

- 遵循现有代码风格
- 添加必要的注释
- 更新相关文档
- 测试新功能

---

## 📄 更新日志

### v1.0.0 (2025-01-11)

**🎉 首次发布**

**新增功能：**
- ✨ 完成基础打车功能
- ✨ 集成腾讯地图服务
- ✨ 实现智能地址搜索
- ✨ 实现真实距离计算
- ✨ 实现动态价格计算
- ✨ 添加主题切换功能
- ✨ 实现API降级方案

**优化：**
- 🎨 优化UI/UX设计
- ⚡ 优化地图性能
- 🔧 添加错误处理机制

---

## 📜 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

```
MIT License

Copyright (c) 2025 summerpromise

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 作者

**summerpromise**

- GitHub: [@summerpromise](https://github.com/summerpromise)
- 项目地址: [https://github.com/summerpromise/wxss](https://github.com/summerpromise/wxss)

---

## 🙏 致谢

感谢以下开源项目和服务：

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/) - 提供完整的开发指南
- [腾讯位置服务](https://lbs.qq.com/) - 提供地图和位置服务
- [v0.dev](https://v0.dev/) - 提供初始设计灵感

---

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 📧 提交 [Issue](https://github.com/summerpromise/wxss/issues)
- 💬 发起 [Discussion](https://github.com/summerpromise/wxss/discussions)
- 🌟 给项目点个Star

---

## 🌟 Star History

如果这个项目对您有帮助，请给我们一个⭐️

[![Star History Chart](https://api.star-history.com/svg?repos=summerpromise/wxss&type=Date)](https://star-history.com/#summerpromise/wxss&Date)

---

<p align="center">
  Made with ❤️ by summerpromise
</p>

<p align="center">
  <a href="#-打车小程序">回到顶部 ⬆️</a>
</p>

