var module_xiangkan = {};

//文章定位点
var searchKey = "评论";
//文章滑动次数
var scanTimes = 15;
//更多时间提醒
var more_minute_btn_id = "more_minute_btn";

// while (true) {
//     selectArticle();
// }

//==============================程序启动区=======================================
module_xiangkan.start = function () {
    selectArticle();
}
//=====================================scanArticle start===================================
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

//=====================================end===================================
module.exports = module_xiangkan;