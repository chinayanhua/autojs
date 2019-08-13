
//引入外部模块
var commonFunction = require('modules/commonFunction.js');
var module_zhifubao = require('modules/zhifubao.js');
var module_shandianhezi = require('modules/shandianhezi.js');
var module_souhuzixun = require('modules/souhuzixun.js');
var module_shuabaoduanshipin = require('modules/shuabaoduanshipin.js');
var module_huitoutiao = require('modules/huitoutiao.js');
var module_jukandian = require('modules/jukandian.js');
var module_xiangkan = require('modules/xiangkan.js');
var module_weili = require('modules/weili.js');
var module_zhongqingkandian = require('modules/zhongqingkandian.js');
var module_diandianxinwen = require('modules/diandianxinwen.js');
var module_ertoutiao = require('modules/ertoutiao.js');
// var module_qutoutiao = require('modules/qutoutiao.js');
//各app模块
var moduleNameArray = [module_zhifubao, module_shandianhezi,
    module_souhuzixun, module_shuabaoduanshipin, module_huitoutiao,
    module_jukandian, module_xiangkan, module_weili, module_zhongqingkandian,
    module_diandianxinwen,module_ertoutiao];

//============================== 全局变量=======================================

//要启动的app名称
var appName_zhifubao = "支付宝";
var appName_shandianhezi = "闪电盒子";
var appName_souhuzixun = "搜狐资讯";
var appName_shuabaoduanshipin = "刷宝短视频";
var appName_huitoutiao = "惠头条";
var appName_jukandian = "聚看点";
var appName_xiangkan = "想看";
var appName_weili = "微鲤";
var appName_zhongqingkandian = "中青看点";
var appName_diandianxinwen = "点点新闻";
var appName_ertoutiao = "二头条";
// var appName_qutoutiao = "趣头条";
//可以选择的模块
var appNameArray = [appName_zhifubao,
    appName_shandianhezi,appName_souhuzixun, appName_shuabaoduanshipin, appName_huitoutiao,
    appName_jukandian, appName_xiangkan, appName_weili, appName_zhongqingkandian, appName_diandianxinwen,appName_ertoutiao,
    "随机应用"];

//打开软件等待时间，单位秒
var waitTime = 7;

//随机应用：打开软件等待时间，单位秒
var waitTime_random = 15;
//随机应用多少分钟换一次app
var appTime = 10;

//主页标识
// var mainPageId_mine = "我的";
// var mainPageId_mission = "任务";
// var mainPageId_first = "首页";
// var mainPageId_focus = "关注";
// var mainPageId_recommend = "推荐";

//==============================程序启动区=======================================
//程序主入口
mainEntrence();
//==============================程序主要步骤=======================================
function mainEntrence() {
    //准备工作
    commonFunction.prepareThings();
    //选择用启动的app
    var indexOption = commonFunction.selectAppName(appNameArray);
    log("indexOption:" + indexOption);
    toastLog(appNameArray[indexOption]);
    if (indexOption == (appNameArray.length - 1)) {
        log("随机应用");
        //随机应用
        randomApp();
    } else {
        //其他应用
        commonFunction.enterMainPage(appNameArray[indexOption]);
        moduleNameArray[indexOption].start(commonFunction);
    }
}


//==============================随机应用程序主入口=======================================
//随机应用程序主入口
function randomApp() {
    while (true) {
        mainEntrence_random();
    }
}

function mainEntrence_random() {
    //排除0支付宝 和 自己
    var randomNum = random(1, (appNameArray.length - 2));
    toastLog("randomNum:" + randomNum);
    commonFunction.enterMainPage(appNameArray[randomNum]);
    var startTime = new Date().getMinutes();
    // var startTime = new Date().getSeconds();
    toastLog("startTime:" + startTime);
    var endTime = startTime;
    while (true) {
        toastLog("app：" + appNameArray[randomNum] + "，运行分钟数:" + Math.abs(endTime - startTime));
        if (Math.abs(endTime - startTime) >= appTime) {
            toastLog(">>>>>运行时间超过" + appTime + "分钟，换app<<<<<<");
            commonFunction.shutdownApp(appNameArray[randomNum]);
            sleep(1000);
            break;
        }
        moduleNameArray[randomNum].start_random(commonFunction);
        endTime = new Date().getMinutes();
        // endTime = new Date().getSeconds();
        toastLog("endTime:" + endTime);
    }
}