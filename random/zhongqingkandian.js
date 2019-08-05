var module_zhongqingkandian = {};

//浏览次数
var scanTime = 10;
//文章定位点
var searchKey = "a2e";
//文章金币计时器id
var timer = "jt"; //评论

// while(true){
//     selectArticle();
// }

//==============================程序启动区=======================================
module_zhongqingkandian.start = function () {
    //选择模块
    selectArticle();
}

//=====================================scanArticle start===================================
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
    } else {
        toastLog("金币阅读计时圈不存在，退出");
    }
    //退回主页
    back();
}

//清理广告
function clearAd(){
    if(id("jp").exists()){
        id("jp").findOne().click();
    }
}

//=====================================end===================================
module.exports = module_zhongqingkandian;