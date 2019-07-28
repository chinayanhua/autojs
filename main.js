
//引入外部文件
var commonFunction = require('commonFunction.js');
var module_shandianhezi = require('shandianhezi.js');
var module_zhifubao = require('zhifubao.js');
var module_qutoutiao = require('qutoutiao.js');
var module_shuabaoduanshipin = require('shuabaoduanshipin.js');
var module_souhuzixun = require('souhuzixun.js');
var module_huitoutiao = require('huitoutiao.js');
var module_jukandian = require('jukandian.js');
var module_xiangkan = require('xiangkan.js');
var module_weili = require('weili.js');

//============================== 全局变量=======================================

//要启动的app名称
var appName_zhifubao = "支付宝";
var appName_shandianhezi = "闪电盒子";
var appName_qutoutiao = "趣头条";
var appName_huitoutiao = "惠头条";
var appName_souhuzixun = "搜狐资讯";
var appName_shuabaoduanshipin = "刷宝短视频";
var appName_jukandian = "聚看点";
var appName_xiangkan = "想看";
var appName_weili = "微鲤";
//可以选择的模块
var appNameOptions = [appName_zhifubao, appName_shandianhezi, appName_qutoutiao, 
                    appName_souhuzixun, appName_shuabaoduanshipin, appName_huitoutiao, 
                    appName_jukandian, appName_xiangkan,appName_weili];
//打开软件等待时间，单位秒
var waitTime = 5;


//主页标识
var mainPageId_mine = "我的";
var mainPageId_mission = "任务";
var mainPageId_first = "首页";
var mainPageId_focus = "关注";
var mainPageId_recommend = "推荐";

//==============================程序启动区=======================================
//程序主入口
mainEntrence();
//==============================程序主要步骤=======================================
function mainEntrence() {
    //准备工作
    commonFunction.prepareThings();
    //选择用启动的app
    var appName = commonFunction.selectAppName(appNameOptions);
    toastLog(appName);
    //进入该模块的代码
    if (appName == appName_zhifubao) {
        //支付宝
        commonFunction.enterMainPage(appName, waitTime, mainPageId_first);
        module_zhifubao.start(commonFunction);
    } else if (appName == appName_shandianhezi) {
        //闪电盒子
        commonFunction.enterMainPage(appName, waitTime, mainPageId_mine);
        module_shandianhezi.start(commonFunction, mainPageId_mine);
    } else if (appName == appName_qutoutiao) {
        //趣头条
        commonFunction.enterMainPage(appName, waitTime, mainPageId_mine);
        module_qutoutiao.start(commonFunction, mainPageId_mine);
    } else if (appName == appName_souhuzixun) {
        //搜狐资讯
        commonFunction.enterMainPage(appName, waitTime, mainPageId_mission);
        module_souhuzixun.start(commonFunction, mainPageId_mission);
    } else if (appName == appName_shuabaoduanshipin) {
        //刷宝短视频
        commonFunction.enterMainPage(appName, waitTime, mainPageId_focus);
        module_shuabaoduanshipin.start(commonFunction);
    } else if (appName == appName_huitoutiao) {
        //惠头条
        commonFunction.enterMainPage(appName, waitTime, mainPageId_mine);
        module_huitoutiao.start(commonFunction, mainPageId_mine);
    }else if (appName == appName_jukandian) {
        //聚看点
        commonFunction.enterMainPage(appName, waitTime, mainPageId_mine);
        module_jukandian.start(commonFunction, mainPageId_mine);
    }else if (appName == appName_xiangkan) {
        //想看
        commonFunction.enterMainPage(appName, waitTime, mainPageId_mine);
        module_xiangkan.start(commonFunction, mainPageId_mine);
    }else if (appName == appName_weili) {
        //微鲤
        commonFunction.enterMainPage(appName, waitTime, mainPageId_recommend);
        module_weili.start(commonFunction, mainPageId_recommend);
    }
}
