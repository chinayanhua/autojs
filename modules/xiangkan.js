var commonFunction;
var module_xiangkan = {};
//选择要启动的模块
var firstPage_option = "首页"; //首页文章区
var video_option = "视频";
var options = [firstPage_option, video_option];  //可以选择的模块

//文章定位点
var searchKey = "评论";
//文章滑动次数
var scanTimes = 10;
//更多时间提醒
var more_minute_btn_id = "more_minute_btn";

//福袋icon id
var fudai_icon_id = "fudai_icon";
//首页领金币按钮
var fudai_btn_id = "rec_task_btn";
var fudai_btn_text = "领金币";


//文章金币计时器id
var coin_img_Id = "coin_img_big";
//视频按钮id
var videoButton = "video_item_play_btn";

//==============================程序启动区=======================================
module_xiangkan.start = function (common) {
    commonFunction = common;
    //选择模块
    selectModule();
}
module_xiangkan.start_random = function (common) {
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
    sleep(2000);
    commonFunction.clickByText(firstPage_option);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    clickMoreMinuteBtn();
    //判断当页是否存在可以点击的文章
    if (!textEndsWith(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
        return;
    }
    //遍历点击文章
    toastLog(">>>>>>>>>>>当页开始<<<<<<<<<");
    textEndsWith(searchKey).find().forEach(function (pos) {
        sleep(1000);
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


function clickMoreMinuteBtn() {
    commonFunction.clickByText(fudai_btn_text);
    commonFunction.clickById(more_minute_btn_id);
    commonFunction.clickById(fudai_icon_id);
    commonFunction.clickById(fudai_btn_id);
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
    sleep(2000);
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
module.exports = module_xiangkan;