var module_jukandian = {};

var commonFunction;

var mainPageId = "我的";

//选择要启动的模块
var firstPage_option = "看点"; //首页文章区
var video_option = "视频";
var options = [firstPage_option, video_option];  //可以选择的模块

//启动首页的广告关闭按钮
var signCloseBtnId = "v2_sign_close_button";
var adCloseBtnId = "image_user_task_pop_close";

//文章定位点
var searchKey = "item_artical_three_read_num";
//视频按钮id
var videoButton = "item_video_play";
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

//==============================程序启动区=======================================
module_jukandian.start = function (common) {
    commonFunction = common;
    //选择模块
    selectModule();
}
module_jukandian.start_random = function (common) {
    commonFunction = common;
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
    commonFunction.clickByText(firstPage_option);
    sleep(2000);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    commonFunction.clickById(signCloseBtnId);
    commonFunction.clickById(adCloseBtnId);
    // clickAwardBtn();
    //判断当页是否存在可以点击的文章
    if (!id(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
        return;
    }
    //遍历点击文章
    toastLog("当页浏览开始！");
    id(searchKey).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
            // log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            sleep(2000);
            scanSingleArticle();
            sleep(2000);
        }
    });
    toastLog("当页浏览结束！");
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
}

//文章里阅读循环
function scanSingleArticle() {
    if (commonFunction.ifTimerExists(timers)) {
        toastLog(">>>>>>>>>>>开始浏览文章<<<<<<<<<");
        for (var i = 0; i < scanTime; i++) {
            // clickAwardBtn();
            toastLog("浏览文章" + i);
            swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
            sleep(random(2, 4) * 1000);
        }
        toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
    }
    commonFunction.returnMainPage(mainPageId);
}

//点击领福袋按钮
function clickAwardBtn() {
    commonFunction.clickByText("领金币");
    commonFunction.clickByText("继续阅读");
    commonFunction.clickByText("继续赚钱");
    commonFunction.clickByText("忽略");
    commonFunction.clickById("cancel_quit");
    commonFunction.clickById("dismisstv");
    
    commonFunction.clickById("icon_home_left_timer_lq");
    sleep(1000);
    commonFunction.clickById("dialog_close");
    sleep(1000);
}

//=====================================scanVideo===================================

function scanVideo() {
    if (!textEndsWith(video_option).exists()) {
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
                    // log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
                    click(posb.centerX(), posb.centerY());
                    toastLog("点击播放按钮！");
                    sleep(2000);
                    scanSingleArticle();
                    sleep(1000);
                }
            });
        }
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
    }
}

//=====================================end===================================
module.exports = module_jukandian;