var module_huitoutiao = {};
var commonFunction;
//选择要启动的模块
var firstPage_option = "头条"; //首页文章区
var video_option = "视频";
var littleVideo_option = "小视频";  //小视频
var options = [firstPage_option, video_option, littleVideo_option];  //可以选择的模块

//文章定位点
var searchKey = "tv_read_count";
//视频按钮id
var videoButton = "alivc_player_state";
//文章金币计时器id
var timer = "iv_hongbao_coin";
//浏览文章次数
var scanTime = 10;

//首页时段奖励
var timeAwardText = "点击领取";
//点击首页时段奖励后会弹出窗口,选择忽略
var ignoreText = "忽略";
//==============================程序启动区=======================================
module_huitoutiao.start = function (common) {
    commonFunction = common;
    //选择模块
    selectModule();
}

module_huitoutiao.start_random = function (common) {
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
    } else if (options[indexOption] == littleVideo_option) {
        scanLittleVideo();
    } else if (options[indexOption] == video_option) {
        scanVideo();
    }
}

//=====================================scanLittleVideo start===================================
//浏览小视频
function scanLittleVideo() {
    if (textEndsWith(littleVideo_option).exists()) {
        toastLog("自动识别小视频成功，自动点击！");
        commonFunction.clickByText(littleVideo_option);
    } else {
        alert("请手动点小视频按钮！");
    }
    sleep(3000);
    //计数
    var swipeCount = 1;
    while (true) {
        //判断是否有计时器
        if (id(timer).exists()) {
            var randomNum = random(5, 10);
            sleep(randomNum * 1000);
            toast("sleep:" + randomNum + ", 滑动次数:" + swipeCount);
            gesture(1500, [random(300, 600), 1600], [random(300, 600), 200])
            swipeCount++;
        }

    }
}

//=====================================scanArticle start===================================
//浏览文章
function scanArticle() {
    if (textEndsWith(firstPage_option).exists()) {
        commonFunction.clickByText(firstPage_option);
    } else {
        // toastLog("文章区识别失败，请手动进入");
        alert("请手动点击头条按钮，进入文章区！");
    }
    sleep(2000);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    commonFunction.clickByText(timeAwardText);
    sleep(1000);
    commonFunction.clickByText(ignoreText);

    //判断当页是否存在可以点击的文章
    if (!id(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
        return;
    }
    //遍历点击文章
    id(searchKey).find().forEach(function (pos) {
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
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
}

//文章里阅读循环
function scanSingleArticle() {
    if (id(timer).exists()) {
        toastLog(">>>>>>>>>>>开始浏览文章<<<<<<<<<");
        for (var i = 0; i < scanTime; i++) {
            toastLog("浏览文章" + i);
            swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
            sleep(random(2, 5) * 1000);
        }
        toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
    }
    //退回主页
    back();
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
                    log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
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
module.exports = module_huitoutiao;