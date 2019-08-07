var module_shandianhezi = {};
var commonFunction;
//============================== 全局变量=======================================

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

//文章滑动次数
var scanTimes = 15;

//==============================程序启动区=======================================
module_shandianhezi.start = function (common) {
    commonFunction = common;
    selectModule();
}
module_shandianhezi.start_random = function (common) {
    commonFunction = common;
    scanFirstPage();
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
        while (true) {
            scanFirstPage();
        }
    }
}

//===================================模块区====================================
/**
 * 首页：文章区
 */
function scanFirstPage() {
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
    if (id("from_text").exists()) {
        id("from_text").find().forEach(function (pos) {
            var text = pos.text();
            if (pos.text().search("(广告)") != -1) {
                log(">>>>>>>广告跳过<<<<<<<");
                return;
            }
            log(text);
            var posb = pos.bounds();
            if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
                click(posb.centerX(), posb.centerY());
                toastLog("点击了文章，准备进入文章！");
                sleep(2000);
                for (var i = 0; i < scanTimes; i++) {
                    toastLog("阅读文章中......" + i);
                    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
                    sleep(random(2, 5) * 1000);
                }
                back();
                sleep(2000);
            }
        });
    }
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
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

        commonFunction.clickByText("继续观看");
        if (id("btn_continue_watch").exists()) {
            commonFunction.clickById("继续观看");
        }
    }
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
        sleep(3000);
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
            swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
            break;
        } else if (textEndsWith(liveZoneFlag).exists()) {
            toastLog("还在直播区，滑动");
            swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
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
                if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                    click(posb.centerX(), posb.centerY());
                    toastLog("点击了" + rmb_price);
                    sleep(2000);
                    //点击商品的 不喜欢 
                    if (textEndsWith(notLikeId).exists()) {
                        textEndsWith(notLikeId).find().forEach(function (pos) {
                            var posb = pos.bounds();
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