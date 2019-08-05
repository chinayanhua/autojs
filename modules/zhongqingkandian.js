var module_zhongqingkandian = {};
//选择要启动的模块
var firstPage_option = "首页"; //首页文章区
var video_option = "视频";
var options = [firstPage_option, video_option];  //可以选择的模块
//文章定位点
var searchKey = "a2e";
//文章金币计时器id
var timer = "jt"; //评论
//浏览次数
var scanTime = 10;
//视频按钮id
var videoButton = "a28";
//==============================程序启动区=======================================
module_zhongqingkandian.start = function () {
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
    alert("请手动点击头条按钮，进入文章区！");
    sleep(3000);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    clearAd();
    //判断当页是否存在可以点击的文章
    if (!id(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
        return;
    }
    //遍历点击文章
    id(searchKey).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
            // log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toastLog("点击了文章，准备进入文章！");
            sleep(2000);
            //开始浏览文章
            scanSingleArticle();
            sleep(2000);
        }
    });
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
}

//文章里阅读循环
function scanSingleArticle() {
    if (id(timer).exists()) {
        toastLog(">>>>>>>>>>>金币阅读计时圈存在，开始浏览文章<<<<<<<<<");
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

//清理广告
function clearAd() {
    if (id("jp").exists()) {
        id("jp").findOne().click();
    }
}

//=====================================scanVideo===================================
//浏览视频
function scanVideo() {
    textEndsWith(video_option).findOne().click();
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
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);
    }
}

//=====================================end===================================
module.exports = module_zhongqingkandian;