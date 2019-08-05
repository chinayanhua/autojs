

var module_shuabaoduanshipin = {};

//=========================刷宝短视频==========================
var likeId = "image_view"; //点赞id
var focusId = "关注";
var tipShowId = "btn_view";//金币到账通知id
var swipeCount = 1;

module_shuabaoduanshipin.start = function () {
    if (id(tipShowId).exists()) {
        id(tipShowId).findOne().click();
    }
    //随机滑动
    var randomNum = random(5, 15);
    sleep(randomNum * 1000);
    toast("sleep:" + randomNum + ", swipeCount:" + swipeCount);
    //随机点赞和关注
    // if (randomNum == 5 || randomNum == 10 || randomNum == 15) {
    //     clickLike();
    //     clickFocus();
    // }
    gesture(1500, [random(300, 600), 1600], [random(300, 600), 200])
    swipeCount++;
}


//点赞
function clickLike() {
    if (idEndsWith(likeId).exists()) {
        idEndsWith(likeId).find().forEach(function (pos) {
            var posb = pos.bounds();
            // log("posb.centerX():" + posb.centerX() + ",posb.centerY():" + posb.centerY());
            if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                click(posb.centerX(), posb.centerY());
                toast("点赞了");
            }
        });
    }
}

//点关注
function clickFocus() {
    if (textEndsWith(focusId).exists()) {
        textEndsWith(focusId).find().forEach(function (pos) {
            var posb = pos.bounds();
            // log("posb.centerX():" + posb.centerX() + ",posb.centerY():" + posb.centerY());
            if (posb.centerX() > 0 && posb.centerX() < 1000 && posb.centerY() > 400 && posb.centerY() < 1800) {
                click(posb.centerX(), posb.centerY());
                toast("点击了关注");
            }
        });
    }
}


module.exports = module_shuabaoduanshipin;