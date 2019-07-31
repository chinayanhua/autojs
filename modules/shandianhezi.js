//引入外部文件
var commonFunction;
var module_shandianhezi = {};
//============================== 全局变量=======================================
//首页标识-闪电盒子
var mainPageId;

//选择要启动的模块
var firstPage_option = "首页"; //首页文章区
var littleVideo_option = "短视频";  //短视频
var goods_option = "逛逛领币"; //逛逛领币
var options = [firstPage_option, littleVideo_option, goods_option];  //可以选择的模块

//文章计时标记id
var articleFlagId = "title"; //文章来源id = title  新闻标题news-title  来源id = src-data-new  发布时间id = news-pubtime
//视频标记
var videoFlagId = "video_title";

//进入短视频页面的flag
var littleVideoEnterFlag = "user_nick_name";

//==============================程序启动区=======================================

module_shandianhezi.start = function (common, mainPageFlag) {
    commonFunction = common;
    mainPageId = mainPageFlag;
    //选择启动的模块
    selectModule();
}

//===================================选择启动模块====================================
function selectModule() {
    //选择ui
    var indexOption = dialogs.select("请选择一个模块", options);
    //取消了选择
    if (indexOption < 0) {
        toast("您取消了选择");
        exit();
    }
    //选择了某一项
    toast("您选择的是" + options[indexOption]);
    if (options[indexOption] == littleVideo_option) {
        scanLittleVedio();
    } else if (options[indexOption] == goods_option) {
        scanGoods();
    } else if (options[indexOption] == firstPage_option) {
        scanFirstPage();
    }
}

//===================================模块区====================================
/**
 * 首页：文章区
 */
function scanFirstPage() {
    sleep(1000);
    if (!textEndsWith(firstPage_option).exists()) {
        toastLog("首页识别失败，请手动进入");
        alert("请手动点击首页按钮，进入文章区！");
        sleep(2000);
        scanFirstPage();
    } else {
        textEndsWith(firstPage_option).findOne().click();
        toastLog("点击了首页");
    }

    while (true) {
        swipe(500, 1000, 200, 500, 2000);
        click(500, 1000);
        toastLog("点击了文章！");
        sleep(2000);
        if ((id(articleFlagId).exists() || id(videoFlagId).exists()) && !textEndsWith("我的").exists()) {
            toastLog("存在文章标记");
            for (var i = 0; i < 10; i++) {
                toastLog("阅读文章中......" + i);
                swipe(500, 1000, 200, 500, 2000);
            }
            back();
            sleep(1000);
        } else {
            toastLog("不存在文章标记id，退出!");
            back();
            sleep(1000);
            if (!textEndsWith(mainPageId).exists() & textEndsWith("拒绝").exists()) {
                toastLog("让下载软件，拒绝！");
                textEndsWith("拒绝").findOne().click();
            }
            //检查是否回到主页
            ifMainPage();
            continue;
        }
    }
}

//===================================短视频====================================

/**
 * 短视频
 */
function scanLittleVedio() {
    //点击短视频
    while (true) {
        alert("请手动点开" + littleVideo_option);
        sleep(3000);
        if (id(littleVideoEnterFlag).exists()) {
            toastLog("已经进入了" + littleVideo_option);
            break;
        }
    }

    //开始滑动浏览
    //计数
    var swipeCount = 1;
    while (true) {
        var randomNum = random(5, 10);
        sleep(randomNum * 1000);
        toastLog("sleep:" + randomNum + ", 滑动次数:" + swipeCount);
        gesture(1500, [random(300, 600), 1600], [random(300, 600), 200])
        swipeCount++;

        if (textEndsWith("继续观看").exists()) {
            textEndsWith("继续观看").findOne().click();
        }
        if (id("btn_continue_watch").exists()) {
            id("继续观看").findOne().click();
        }

    }
}

function ifMainPage() {
    for (let index = 0; index < 5; index++) {
        if (!textEndsWith(mainPageId).exists()) {
            toastLog("不存在 " + mainPageId + index);
            back();
            sleep(1000);
        } else {
            break;
        }
    }
    if (!textEndsWith(mainPageId).exists()) {
        toastLog("一直未进入主页，退出脚本!");
        alert("无法回到主页，请手动回到主页！");
        return false;
    }
    return true;
}
//===================================逛逛领币：商品模块====================================

/**
 * 逛逛领币：商品模块
 */
function scanGoods() {
    var liveZoneFlag = "直播中";
    var LiveZoneEndFlag = "更多热门直播";
    //点击有价格的商品
    var rmb_price = "rmb_price";
    //点赞
    var notLikeId = "不喜欢";
    while (true) {
        alert("请手动点开" + goods_option);
        sleep(5000);
        if (textEndsWith(liveZoneFlag).exists() || textEndsWith(LiveZoneEndFlag).exists() || id(rmb_price).exists()) {
            toastLog("已经进入了" + goods_option);
            break;
        }
    }
    // click(device.width / 2, device.height - 200);  // 2160 - 1950  = 200
    toastLog("点击了" + goods_option);
    //划过直播区
    while (true) {
        if (textEndsWith(LiveZoneEndFlag).exists() || id(rmb_price).exists()) {
            toastLog("已经出直播区");
            swipe(500, 1500, 500, 300, 2000);
            break;
        } else if (textEndsWith(liveZoneFlag).exists()) {
            toastLog("还在直播区，滑动");
            swipe(500, 1500, 500, 300, 2000);
        }
    }

    while (true) {
        //浏览商品主页
        var randomNum = random(300, 800);
        for (var j = 1; j < 5; j++) {
            gesture(2000, [random(300, 600), 1500], [random(300, 500), randomNum]);
            sleep(2000);
        }
        //点击商品
        if (id(rmb_price).exists()) {
            id(rmb_price).find().forEach(function (pos) {
                //点击进入某一个商品详情页
                var posb = pos.bounds();
                log("posb.centerX():" + posb.centerX() + ",posb.centerY():" + posb.centerY());
                if (posb.centerX() < 0 || posb.centerY() < 400 || posb.centerY() > 1800) {
                    toastLog("坐标点为负，点击会报错，跳过本条");
                } else {
                    click(posb.centerX(), posb.centerY());
                    toastLog("点击了" + rmb_price);
                    sleep(2000);
                    //点击商品的 不喜欢 
                    if (textEndsWith(notLikeId).exists()) {
                        textEndsWith(notLikeId).find().forEach(function (pos) {
                            var posb = pos.bounds();
                            log("posb.centerX():" + posb.centerX() + ",posb.centerY():" + posb.centerY());
                            click(posb.centerX(), posb.centerY());
                            toastLog("点击了" + notLikeId);
                        });
                        //在商品详情页滑动
                        for (var i = 1; i < 6; i++) {
                            gesture(1000, [random(300, 600), 1000], [random(300, 500), randomNum]);
                            sleep(2000);
                        }
                    }
                    back();
                }
            });
        }
    }
}
//===================================end====================================

module.exports = module_shandianhezi;