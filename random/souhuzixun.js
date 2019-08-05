
var module_souhuzixun = {};

//============================== 全局变量=======================================

//识别文章的定位点
var searchKey_articleTime = "article_time";
var scanTime= 10;
//计时器id名称
var timerName = "counting_img";

// while(true){
//     selectArticle();
// }

//==============================程序启动区=======================================
//程序主入口
module_souhuzixun.start = function () {
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

module.exports = module_souhuzixun;