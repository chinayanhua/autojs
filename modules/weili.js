var module_weili = {};
var commonFunction;
//选择要启动的模块
var firstPage_option = "头条";
var video_option = "视频";
var options = [firstPage_option, video_option]; 

//文章金币计时器id
var articleId = "iv_coin";
//视频按钮id
var videoButton = "tv_count";

//文章定位点
var searchKey = "在线";
//文章滑动次数
var scanTime = 10;

//首页阅读福利领取
var readAwardId = "text_open";
//阅读时间提醒
var readTimeNoticeId = "text_ok";
var readTimeBtnId = "bt_ok";

//==============================程序启动区=======================================
module_weili.start = function (common) {
    commonFunction = common;
    selectModule();
}
module_weili.start_random = function (common) {
    commonFunction = common;
    selectArticle();
}
//=====================================selectModule start===================================
//选择模块
function selectModule() {
    var indexOption = dialogs.select("请选择一个模块", options);
    if (indexOption < 0) {
        toast("您取消了选择");
        exit();
    }
    toast("您选择的是" + options[indexOption]);
    if (options[indexOption] == firstPage_option) {
        scanArticle();
    } else if (options[indexOption] == video_option) {
        scanVideo();
    }
}

//=====================================scanArticle start===================================
//浏览文章
function scanArticle() {
    sleep(2000);
    if (textEndsWith(firstPage_option).exists()) {
        commonFunction.clickByText(firstPage_option);
    } else {
        alert("请手动点击头条按钮，进入文章区！");
    }
    sleep(3000);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    clickAdId();
    //判断当页是否存在可以点击的文章
    if (!textEndsWith(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
        return;
    }
    //遍历点击文章
    toastLog(">>>>>>>>>>>当页开始<<<<<<<<<");
    textEndsWith(searchKey).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
            log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            //开始浏览文章
            sleep(2000);
            scanSingleArticle();
            sleep(2000);
        }
    });
    toastLog(">>>>>>>>>>>当页结束<<<<<<<<<");
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
}

//文章里阅读循环
function scanSingleArticle() {
    toastLog(">>>>>>>>>>>开始浏览文章<<<<<<<<<");
    for (var i = 0; i < scanTime; i++) {
        clickAdId();
        toastLog("浏览文章" + i);
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
        sleep(random(2, 5) * 1000);
    }
    toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
    //退回主页
    back();
}

function clickAdId(){
    commonFunction.clickById(readAwardId);
    commonFunction.clickById(readTimeNoticeId);
    commonFunction.clickById(readTimeBtnId);
}

//=====================================scanVideo===================================

function scanVideo() {
    if (!textEndsWith(video_option).exists()) {
        // toastLog("自动识别视频失败，请手动进入！");
        alert("请手动点视频按钮！");
    } else {
        toastLog("自动识别到视频按钮，点击进入！");
        commonFunction.clickByText(video_option);
    }
    sleep(3000);
    //开始浏览视频
    while (true) {
        if (id(videoButton).exists()) {
            id(videoButton).find().forEach(function (pos) {
                var posb = pos.bounds();
                if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                    log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
                    click(posb.centerX(), posb.centerY());
                    toastLog("点击播放按钮！");
                    sleep(2000);
                    toastLog(">>>>>>>>>>>开始浏览文章<<<<<<<<<");
                    for (var i = 0; i < scanTime; i++) {
                        toastLog("浏览文章" + i);
                        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
                        sleep(random(2, 5) * 1000);
                    }
                    toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
                    //退回主页
                    back();
                    sleep(1000);
                }
            });
        }
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
    }
}

//=====================================end===================================
module.exports = module_weili;