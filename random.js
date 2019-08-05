
//引入外部文件
var commonFunction = require('random/commonFunction.js');
var module_shandianhezi = require('random/shandianhezi.js');
// var module_qutoutiao = require('random/qutoutiao.js');
var module_shuabaoduanshipin = require('random/shuabaoduanshipin.js');
var module_souhuzixun = require('random/souhuzixun.js');
var module_huitoutiao = require('random/huitoutiao.js');
var module_jukandian = require('random/jukandian.js');
var module_xiangkan = require('random/xiangkan.js');
var module_weili = require('random/weili.js');
// var module_zhongqingkandian = require('random/zhongqingkandian.js');

//============================== 全局变量=======================================

//要启动的app名称
var appName_shandianhezi = "闪电盒子";
var appName_huitoutiao = "惠头条";
var appName_souhuzixun = "搜狐资讯";
var appName_shuabaoduanshipin = "刷宝短视频";
var appName_jukandian = "聚看点";
var appName_xiangkan = "想看";
var appName_weili = "微鲤";
// var appName_zhongqingkandian = "中青看点";

var appNameArray = [appName_xiangkan, appName_weili, appName_shandianhezi, appName_shuabaoduanshipin,
                     appName_jukandian,appName_huitoutiao,appName_souhuzixun];
var moduleNameArray = [module_xiangkan, module_weili, module_shandianhezi, module_shuabaoduanshipin,
                         module_jukandian,module_huitoutiao,module_souhuzixun];

//打开软件等待时间，单位秒
var waitTime = 15;
//多少分钟换一次app
var appTime = 10;
//==============================程序启动区=======================================
//程序主入口
while (true) {
    mainEntrence();
}
//==============================程序主要步骤=======================================
function mainEntrence() {
    var randomNum = random(0, 6);
    toastLog("randomNum:" + randomNum);
    commonFunction.enterMainPage(appNameArray[randomNum], waitTime);
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
        moduleNameArray[randomNum].start();
        endTime = new Date().getMinutes();
        // endTime = new Date().getSeconds();
        toastLog("endTime:" + endTime);
    }
}

