var module_jukandian = {};

//选择要启动的模块
var firstPage_option = "看点"; //首页文章区
var video_option = "视频";
var options = [firstPage_option, video_option];  //可以选择的模块

//文章定位点
var searchKey = "item_artical_three_read_num";
//浏览次数
var scanTime = 10;

//文章金币计时器id
//收藏按钮id
var commentCollectId = "tv_web_comment_hint";
var commentCollectId_v2 = "v2_video_detail_bottom_comment_collect";
//评论层id
var commentLayoutId = "ll_web_write_comment_layout";
var commentLayoutId_v2 = "v2_video_detail_bottom_comment_write_layout";
// 评论文字id 
var commentTextId = "tv_web_comment_hint";
var commentTextId_v2 = "v2_video_detail_bottom_comment_write_text";
//分享id
var commentShareId = "ll_share_layout";
var commentShareId_v2 = "v2_video_detail_bottom_comment_share";
//集合
var timers = [commentCollectId, commentLayoutId, commentTextId, commentShareId,
    commentCollectId_v2, commentLayoutId_v2, commentTextId_v2, commentShareId_v2];


//视频按钮id
var videoButton = "item_video_play";

//==============================程序启动区=======================================
module_jukandian.start = function () {
    //选择模块
    selectModule();
}

module_jukandian.start_random = function () {
    //选择模块
    selectArticle();
}

//=====================================selectModule start===================================
//选择模块
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
        textEndsWith(firstPage_option).findOne().click();
    }
    if (!textEndsWith(firstPage_option).exists()) {
        alert("请手动点击按钮！");
    }
    sleep(3000);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    //判断当页是否存在可以点击的文章
    if (!id(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
        clickAwardBtn();
        return;
    }
    //遍历点击文章
    toastLog("当页浏览开始！");
    id(searchKey).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
            clickAwardBtn();
            log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            sleep(2000);
            //开始浏览文章
            scanSingleArticle();
            sleep(2000);
        }
    });
    toastLog("当页浏览结束！");
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
}

//文章里阅读循环
function scanSingleArticle() {
    toastLog(">>>>>>>>>>>开始浏览文章<<<<<<<<<");
    for (var i = 0; i < scanTime; i++) {
        toastLog("浏览文章" + i);
        clickAwardBtn();
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
        sleep(random(2, 4) * 1000);
    }
    toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
    back();
}

//点击领福袋按钮
function clickAwardBtn() {
    //如果有福利金币，领取
    if (textEndsWith("领金币").exists()) {
        textEndsWith("领金币").find().forEach(function (pos) {
            var posb = pos.bounds();
            if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                click(700, (posb.centerY() + 80));
                toastLog("点击了福袋，领取金币");
            }
            sleep(1000);
        });
    }
    if (textEndsWith("继续阅读").exists()) {
        textEndsWith("继续阅读").findOne().click();
    }
    if (textEndsWith("继续赚钱").exists()) {
        textEndsWith("继续赚钱").findOne().click();
    }
    if (id("cancel_quit").exists()) {
        id("cancel_quit").findOne().click();
    }
    if (id("dismisstv").exists()) {
        id("dismisstv").findOne().click();
    }
    if (textEndsWith("忽略").exists()) {
        textEndsWith("忽略").findOne().click();
    }
}

//=====================================scanVideo===================================

function scanVideo() {
    if (!textEndsWith(video_option).exists()) {
        toastLog("自动识别视频失败，请手动进入！");
        alert("请手动点视频按钮！");
        sleep(3000);
    } else {
        toastLog("自动识别到视频按钮，点击进入！");
        textEndsWith(video_option).findOne().click();
        sleep(2000);
    }
    if (!id(videoButton).exists()) {
        alert("请手动点视频按钮！");
        sleep(3000);
    }
    //开始浏览视频
    while (true) {
        if (id(videoButton).exists()) {
            id(videoButton).find().forEach(function (pos) {
                var posb = pos.bounds();
                if (posb.centerX() < 0 || posb.centerY() < 400 || posb.centerY() > 1800) {
                    //如果坐标点为负，点击会报错，跳过本条
                    log("坐标点为负，滑动");
                } else {
                    log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
                    click(posb.centerX(), posb.centerY());
                    toastLog("点击播放按钮！");
                    sleep(2000);
                    scanSingleArticle();
                    sleep(1000);
                }
            });
        } else {
            swipe(500, 1500, 500, 500, 2000);
        }
        swipe(500, 1500, 500, 500, 2000);
    }
}


//=====================================end===================================
module.exports = module_jukandian;