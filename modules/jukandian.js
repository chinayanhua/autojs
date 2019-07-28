var commonFunction;
var module_jukandian = {};
//主页标识
var mainPageId;
//选择要启动的模块
// var refresh_option = "刷新"; //首页文章区
var firstPage_option = "看点"; //首页文章区
var video_option = "视频";
var options = [firstPage_option, video_option];  //可以选择的模块
//文章定位点
var searchKey = "item_artical_three_read_num";
//文章金币计时器id
var articleId = "v2_video_detail_bottom_comment_collect";
//视频按钮id
var videoButton = "item_video_play";
var timer = articleId;

//==============================程序启动区=======================================
module_jukandian.start = function (commonFunctionParam, mainPageFlag) {
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
        toastLog("文章区识别失败，请手动进入");
        alert("请手动点击头条按钮，进入文章区！");
        sleep(3000);
    }
    toastLog("进入文章区");
    sleep(2000);
    //先划出置顶区
    swipe(500, 1300, 500, 200, 500);
    swipe(500, 1300, 500, 200, 500);
    while (true) {
        selectArticle();
    }
}

//选择某一篇文章
function selectArticle() {
    //判断当页是否存在可以点击的文章
    if (!id(searchKey).exists()) {
        toastLog("文章不存在，滑动");
        swipe(500, 1300, 500, 200, 2000);
        return;
    }
    toastLog("文章存在");
    //遍历点击文章
    id(searchKey).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() < 0 || posb.centerY() < 400 || posb.centerY() > 1800) {
            //如果坐标点为负，点击会报错，跳过本条
            // swipe(500, 1300, 500, 200, 2000);
        } else {
            log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
            click(posb.centerX(), (posb.centerY() - 50));
            toastLog("点击了文章，准备进入文章！");
            for (var limitCount = 1; limitCount < 4; limitCount++) {
                sleep(1000);
                if (id(timer).exists()) {
                    break;
                } else {
                    toastLog("进入次数:" + limitCount);
                }
            }
            //开始浏览文章
            scanSingleArticle();
            sleep(2000);
        }
    });
    swipe(500, 1300, 500, 200, 2000);
}

//文章里阅读循环
function scanSingleArticle() {
    if (id(timer).exists()) {
        toastLog(">>>>>>>>>>>金币阅读计时圈存在，开始浏览文章<<<<<<<<<");
        var scanTime = 10;
        for (var i = 0; i < scanTime; i++) {
            if (!id(timer).exists()) {
                toastLog("金币阅读计时圈不存在，退出");
                break;
            }
            toastLog("浏览文章" + i);
            swipe(500, 1000, 500, 500, 1000);//下滑
            sleep(random(3, 6) * 1000);
        }
        toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
        //退回主页
        commonFunction.returnMainPage(mainPageId);
    } else if (!id(timer).exists()) {
        toastLog("金币阅读计时圈不存在，退出");
        //退回主页
        commonFunction.returnMainPage(mainPageId);
    } else if (textEndsWith("关闭").exists()) {
        //如果是进入了广告，退不出去，检测是否有关闭按钮,点击关闭
        textEndsWith("关闭").findOne().click();
        if (!commonFunction.ifMainPage(mainPageId)) {
            commonFunction.returnMainPage(mainPageId);
        }
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