var module_jukandian = {};

//文章定位点
var searchKey = "item_artical_three_read_num";
//浏览次数
var scanTime = 10;

// while (true) {
//     selectArticle();
// }

//==============================程序启动区=======================================
module_jukandian.start = function () {
    //选择模块
    selectArticle();
}
//=====================================scanArticle start===================================
//浏览文章
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

//=====================================end===================================
module.exports = module_jukandian;