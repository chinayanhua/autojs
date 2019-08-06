
var module_souhuzixun = {};

//============================== 全局变量=======================================
//选择要启动的模块
var firstPage_option = "首页";
var video_option = "视频";
var options = [firstPage_option, video_option];  //可以选择的模块

//识别文章的定位点
var searchKey_articleTime = "article_time";
var scanTime= 10;
//文章广告左上角x的坐标：x=70,y=125
var adX = 70;
var adY = 125;

//计时器id名称
var timerName = "counting_img";

//==============================程序启动区=======================================
//程序主入口
module_souhuzixun.start = function () {
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
        while (true) {
            selectArticle();
        }
    } else if (options[indexOption] == video_option) {
        scanVideo();
    } 
};

module_souhuzixun.start_random = function () {
    selectArticle();
};

//=====================================scanArticle start===================================

//选择某一篇文章
function selectArticle() {
    if (!id(searchKey_articleTime).exists()) {
        //不存在，滑动
        log("当页不存在可点击的文章，滑动");
        swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
        return;
    }
    //2.选择文章
    id(searchKey_articleTime).find().forEach(function (pos) {
        var posb = pos.bounds();
        if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
            log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
            click(posb.centerX(), posb.centerY());
            toastLog("点击进入！");
            sleep(2000);
            scanSingleArticle();
            sleep(1000);
        }
    });
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
}

//文章里阅读循环
function scanSingleArticle() {
    if (id(timerName).exists()) {
        log(timerName + "阅读计时圈存在");
        toastLog(">>>>>>>>>>>开始浏览文章<<<<<<<<<");
        for (var i = 0; i < scanTime; i++) {
            if (!id(timerName).exists() || textEndsWith("重新播放").exists()) {
                break;
            }
            toastLog("浏览文章" + i);
            swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
            sleep(random(2, 5) * 1000);
        }
    } 
    toastLog(">>>>>>>>>>浏览文章结束<<<<<<<<<<<<");
    //退回主页
    back();
}


//=====================================scanVideo===================================

//浏览视频
function scanVideo(){
    sleep(2000);
    if (!textEndsWith(video_option).exists()) {
        toastLog("自动识别视频按钮失败，请手动进入！");
        alert("请手动点小视频按钮！");
        sleep(3000);
    }else{
        toastLog("视频按钮存在，点击按钮！");
        textEndsWith(video_option).findOne().click();
        if(!id("start").exists()){
            toastLog("识别未进入");
            scanVideo();
        }
    }
    sleep(1000);
    while(true){
        if(id("start").exists()){
            id("start").find().forEach(function (pos) {
                var posb = pos.bounds();
                if (posb.centerX() < 0 || posb.centerY() < 400 || posb.centerY() > 1800) {
                    //如果坐标点为负，点击会报错，跳过本条
                    log("坐标点为负，滑动");
                } else {
                    log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
                    click(posb.centerX(), posb.centerY());
                    toastLog("点击视频播放按钮！");
                    sleep(10000);
                }
            });
            swipe(500, 1500, 500, 500, 2000);
        }else{
            swipe(500, 1500, 500, 500, 2000);
        }
    }
}


module.exports = module_souhuzixun;