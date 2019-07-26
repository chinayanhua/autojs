
var commonFunction = {};

//==============================公共方法区 start=======================================

//选择一个app
commonFunction.selectAppName = function (appNameOptions) {
    //选择ui
    var indexOption = dialogs.select("请选择一个要运行的app名字", appNameOptions);
    //取消了选择
    if (indexOption < 0) {
        toast("您取消了选择");
        exit();
    }
    return appNameOptions[indexOption];
}

//===================================prepareThings  start=====================================
commonFunction.prepareThings = function () {
    log(">>>>>>>>>>>>>>>>>>>>>准备工作开始<<<<<<<<<<<<<<<<<<<<<<");
    // auto.waitFor(); 
    // auto.setMode("fast");
    //按键监听
    commonFunction.registEvent();
    //唤醒屏幕，解锁
    commonFunction.wakeUpScreen();
    //屏幕分辨率适配
    commonFunction.setScreenMetrics();
    commonFunction.requestScreenCaptureTest();
    log(">>>>>>>>>>>>>>>>>>>>>准备工作结束<<<<<<<<<<<<<<<<<<<<<<");
}
//===================================prepareThings  end=====================================


//屏幕分辨率适配
commonFunction.setScreenMetrics = function () {
    var width = device.width;
    var height = device.height;
    log("屏幕宽度" + width + ",屏幕高度：" + height);
    setScreenMetrics(width, height);
}

//请求截图测试
commonFunction.requestScreenCaptureTest = function () {
    if (!requestScreenCapture()) {
        toastLog("请求截图失败");
        exit();
    }
}

/**
* 获取截图
*/
commonFunction.getCaptureImg = function () {
    var img0 = captureScreen();
    if (img0 == null || typeof (img0) == "undifined") {
        toastLog("截图失败,退出脚本");
        exit();
    } else {
        return img0;
    }
}

/**
* 根据text值 点击
* @param text
* @param noFindExit
* @param exceptionMsg
*/
commonFunction.clickByText = function (text, noFindExit, exceptionMsg) {
    if (textEndsWith(text).exists()) {
        textEndsWith(text).find().forEach(function (pos) {
            var posb = pos.bounds();
            log("posb.centerX():" + posb.centerX() + ",posb.centerY():" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toastLog("点击了" + text);
        });
    } else {
        if (noFindExit != null && noFindExit) {
            if (exceptionMsg != null) {
                toastLog(exceptionMsg);
            } else {
                toastLog("程序当前所处状态不合预期,脚本退出");
            }
            exit();
        }
    }
}

/**
* 根据描述值 点击
* @param desc
* @param noFindExit
*/
commonFunction.clickByDesc = function (desc, noFindExit, exceptionMsg) {
    if (descEndsWith(desc).exists()) {
        descEndsWith(desc).find().forEach(function (pos) {
            var posb = pos.bounds();
            click(posb.centerX(), posb.centerY());
            sleep(2000);
        });
    } else {
        if (noFindExit != null && noFindExit) {
            if (exceptionMsg != null) {
                toastLog(exceptionMsg);
                exit();
            } else {
                toastLog("程序当前所处状态不合预期,脚本退出");
                exit();
            }
        }
    }
}

/**
 * 设置按键监听 当脚本执行时候按音量减 退出脚本
 */
commonFunction.registEvent = function () {
    //启用按键监听
    events.observeKey();
    //监听音量上键按下
    events.onKeyDown("KEYCODE_VOLUME_DOWN", function (event) {
        toastLog("脚本手动退出");
        exit();
    });
}

//唤醒屏幕，解锁
commonFunction.wakeUpScreen = function () {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1000);
        swipe(500, 1000, 500, 30, 500);//上滑调出解锁界面
        sleep(1000);
        //模拟手势操作解锁
        gesture(1000, [545, 1212], [250, 1500], [825, 1500], [545, 1212]);
        sleep(1000);
    }
}

//=====================================enterMainPage start===================================

/**
* 启动app，进入app主页
* @param appName
* @param waitTime   等待时间，单位秒
* @param mainPageFlag   主页标识
*/
commonFunction.enterMainPage = function (appName, waitTime, mainPageFlag) {
    launchApp(appName);
    toastLog("等待" + waitTime + "s," + appName + "启动");
    //等待进入自己的主页
    sleep(waitTime * 1000);
    //如果有广告，跳过
    if (textEndsWith("跳过").exists()) {
        textEndsWith("跳过").findOne().click();
    }
    for (let index = 0; index < 5; index++) {
        if (!textEndsWith(mainPageFlag).exists()) {
            toastLog("不存在" + mainPageFlag + index);
            sleep(1000);
        } else {
            break;
        }
    }
    if (!textEndsWith(mainPageFlag).exists()) {
        toastLog("一直未进入主页，退出脚本!");
        exit();
    }
    //打开后有消息推送提醒，关闭
    if (textEndsWith("开启消息推送").exists()) {
        log("关闭消息推送");
        id("normaldlg_btn_close").findOne().click();
    }
}
//强制关闭app
commonFunction.shutdownApp = function (appName) {
    var packageName = app.getPackageName(appName);
    app.openAppSetting(packageName);
    text(app.getAppName(packageName)).waitFor();
    var is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        log(app.getAppName(packageName) + "应用已被关闭");
        back();
        home();
    } else {
        log(app.getAppName(packageName) + "应用不能被正常关闭或不在后台运行");
        back();
        home();
    }
}


//退回主页
commonFunction.returnMainPage = function (mainPageId) {
    for (var i = 1; i < 4; i++) {
        log("退回次数" + i);
        back();
        sleep(2000);
        var mainResult = commonFunction.ifMainPage(mainPageId);
        if (mainResult) {
            log("已退回到主页");
            return;
        }
    }
}

//判断是否为主页
commonFunction.ifMainPage = function (mainPageId) {
    var i = 0;
    while (!textEndsWith(mainPageId).exists() && i <= 2) {
        tLog("未进入主页" + i);
        sleep(2000);
        i++;
    }
    if (!textEndsWith(mainPageId).exists()) {
        return false;

    }
    return true;
}



//=====================================enterMainPage end===================================


//===================================公共方法区  end=====================================



module.exports = commonFunction;