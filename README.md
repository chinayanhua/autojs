# autojs
auto.js开发的各种自动化脚本

基本信息：
  适配手机品牌：一加5T
  安卓版本：9.0

各文件介绍：
1.main.js为主启动文件
2.project.json为打包apk时使用，能指定app名称，版本号等。
  因为此项目有交互图形，autojs不支持，暂时不能打包使用。
2.modules文件夹包含多个app的脚本
  包含的脚本：
      公共方法：commonFuntion.js
      支付宝-zhifubao.js：蚂蚁森林
      趣头条-qutoutiao.js：首页，视频，短视频
      搜狐资讯-souhuzixun.js：首页，视频
      闪电盒子-shandianhezi.js：首页，短视频，逛逛金币
      刷宝短视频-shuabaoduanshipin.js：短视频
