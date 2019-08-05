var module_shandianhezi = {};
//============================== 全局变量=======================================

//文章滑动次数
var scanTimes = 15;

//==============================程序启动区=======================================

// while (true) {
//     scanFirstPage();
// }

module_shandianhezi.start = function () {
    //选择启动的模块
    scanFirstPage();
}

//===================================模块区====================================
/**
 * 首页：文章区
 */
function scanFirstPage() {
    swipe(device.width / 2, device.height / 4 * 3, device.width / 2, device.height / 4, 2000);//下滑
    if (id("from_text").exists()) {
        id("from_text").find().forEach(function (pos) {
            var text = pos.text();
            if(pos.text().search("(广告)") != -1){
                log(">>>>>>>广告跳过<<<<<<<");
                return;
            }
            log(text);
            var posb = pos.bounds();
            if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                log("该条新闻中心坐标：centerX:" + posb.centerX() + ",centerY:" + posb.centerY());
                click(posb.centerX(), posb.centerY());
                toastLog("点击了文章，准备进入文章！");
                sleep(2000);
                for (var i = 0; i < scanTimes; i++) {
                    toastLog("阅读文章中......" + i);
                    swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 2000);//下滑
                    sleep(random(2, 5) * 1000);
                }
                back();
                sleep(2000);
            }
        });
    }else{
        sleep(5000);
    }
}

//===================================end====================================

module.exports = module_shandianhezi;