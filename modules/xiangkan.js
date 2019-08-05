var commonFunction;
var module_xiangkan = {};
//主页标识
var mainPageId;
//选择要启动的模块
var firstPage_option = "首页"; //首页文章区
var video_option = "视频";
var options = [firstPage_option, video_option];  //可以选择的模块
//文章定位点
var searchKey = "评论";


//文章滑动次数
var scanTimes = 10;


//文章金币计时器id
var articleId = "coin_img_big";
//视频按钮id
var videoButton = "video_item_play_btn";
var timer = articleId;


//更多时间提醒
var more_minute_btn_id = "more_minute_btn";

//==============================程序启动区=======================================
module_xiangkan.start = function (commonFunctionParam, mainPageFlag) {
    commonFunction = commonFunctionParam;
    mainPageId = mainPageFlag;
    //选择模块
    selectModule();
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
        // toastLog("文章区识别失败，请手动进入");
        alert("请手动点击头条按钮，进入文章区！");
    }
    sleep(3000);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    //判断当页是否存在可以点击的文章
    if (!textEndsWith(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
        return;
    }
    //遍历点击文章
    toastLog(">>>>>>>>>>>当页开始<<<<<<<<<");
    textEndsWith(searchKey).find().forEach(function (pos) {
        clickMoreMinuteBtn();
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
            log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            sleep(2000);
            //开始浏览文章
            scanSingleArticle();
            sleep(1000);
        }
    });
    toastLog(">>>>>>>>>>>当页结束<<<<<<<<<");
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
}

//文章里阅读循环
function scanSingleArticle() {
    toastLog(">>>>>>>>>>>开始浏览文章<<<<<<<<<");
    for (var i = 0; i < scanTimes; i++) {
        clickMoreMinuteBtn();
        toastLog("浏览文章" + i);
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);
        sleep(random(2, 5) * 1000);
    }
    toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
    //退回主页
    back();
}


function clickMoreMinuteBtn(){
    if(id(more_minute_btn_id).exists()){
        id(more_minute_btn_id).findOne().click();
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
module.exports = module_xiangkan;