// 地图服务配置
// 腾讯位置服务配置说明

/**
 * 如何申请腾讯地图API Key：
 * 
 * 1. 访问腾讯位置服务官网：https://lbs.qq.com/
 * 2. 点击右上角"控制台"，登录（可使用QQ或微信）
 * 3. 创建应用：
 *    - 应用名称：填写您的小程序名称
 *    - 应用类型：选择"微信小程序"
 * 4. 添加Key：
 *    - 在应用管理中点击"添加key"
 *    - 选择"WebServiceAPI"
 *    - 复制生成的key
 * 5. 将key粘贴到下方的 TENCENT_MAP_KEY 配置中
 * 
 * 注意事项：
 * - 腾讯地图提供每天10000次免费调用额度
 * - 需要在微信公众平台配置服务器域名白名单：
 *   https://apis.map.qq.com
 * - 配置路径：微信公众平台 > 开发 > 开发管理 > 开发设置 > 服务器域名
 */

// 配置您的腾讯地图API Key
const TENCENT_MAP_KEY = '2W6BZ-Z7KEW-T3BRI-YEZHB-OXGGE-ONFZR';  // 请替换为您申请的key

/**
 * 如果您不想申请key，可以使用以下临时测试key（仅供开发测试，不保证稳定性）：
 * 测试key可能会被限流或失效，正式使用请申请自己的key
 */
// const TENCENT_MAP_KEY = 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77';  // 示例测试key

module.exports = {
  TENCENT_MAP_KEY
};

