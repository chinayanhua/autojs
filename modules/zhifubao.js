

var commonFunction;

var module_zhifubao = {};

//==============================全局变量=======================================

var myEnergeType = ["地铁出行", "线下支付", "行走", "共享单车", "地铁购票", "网络购票", "网购火车票", "生活缴费", "ETC缴费", "电子发票", "绿色办公", "咸鱼交易", "预约挂号"];
var handimg = images.read("./modules/handPic.bmp");  //./modules/handPic.bmp     /storage/emulated/0/1/handPic.bmp


//==============================程序启动区=======================================
module_zhifubao.start = function (common) {
    commonFunction = common;
    //从主页进入蚂蚁森林主页
    enterAntForest();
    //收集自己的能量
    //collectionMyEnergy();
    clickForestArea();
    //进入排行榜
    enterRank();
    //在排行榜检测是否有好有的能量可以收集
    enterOthers();
    //结束后返回主页面
    whenComplete();
};

//==============================方法区=======================================

/**
 * 从支付宝主页进入蚂蚁森林我的主页
 */
function enterAntForest() {
    var i = 0;
    sleep(1000);
    //五次尝试蚂蚁森林入口
    while (!textEndsWith("蚂蚁森林").exists() && i <= 5) {
        toastLog("主页不存在蚂蚁森林" + i);
        sleep(2000);
        i++;
    }
    //进入蚂蚁森林
    commonFunction.clickByText("蚂蚁森林", true, "请把蚂蚁森林入口添加到主页我的应用");
    //等待进入自己的主页
    sleep(5000);
}


/**
 * 遍历能量类型,收集自己的能量
 */
function collectionMyEnergy() {
    log(">>>>>>>>>>>>>收取自己能量开始<<<<<<<<<<");
    var energyRegex = generateCollectionType();
    log("energyRegex:" + energyRegex);  //(\s*地铁出行$)|(\s*线下支付$)   \s 空白字符  * 零个或多个   $结尾

    var checkInMorning = false;
    if (descMatches(energyRegex).exists()) {
        if (!checkInMorning) {
            toastLog("防止小树的提示遮挡,等待中");
            sleep(7000);
        }
        descMatches(energyRegex).find().forEach(function (pos) {
            log("pos:" + pos);
            var posb = pos.bounds();
            click(posb.centerX(), posb.centerY() - 80);
            sleep(2000);
        });
    } else {
        sleep(1000);
    }
    log(">>>>>>>>>>>>>收取自己能量结束<<<<<<<<<<");
}


/**
 * 根据能量类型数组生成我的能量类型正则查找字符串
 * @returns {string}
 */
function generateCollectionType() {
    var regex = "/";
    myEnergeType.forEach(function (t, num) {
        if (num == 0) {
            regex += "(\\s*" + t + "$)";
        } else {
            regex += "|(\\s*" + t + "$)";
        }
    });
    regex += "/";
    return regex;
}


/**
 * 进入排行榜
 */
function enterRank() {
    swipe(520, 2000, 520, 100, 1000);
    swipe(520, 2000, 520, 100, 1000);
    sleep(2500);
    commonFunction.clickByText("查看更多好友", true, "程序未找到排行榜入口,脚本退出");
    //等待排行榜主页出现
    sleep(2000);
    var i = 0;
    while (!textEndsWith("好友排行榜").exists() && i <= 5) {
        sleep(2000);
        i++;
    }
    if (i >= 5) {
        toastLog("程序当前所处状态不合预期,脚本退出");
        exit();
    }
}


//=======================  在排行榜页面,循环查找可收集好友 enterOthers  start ==============================
/**
 * 判断是否好有排行榜已经结束
 * @returns {boolean}
 */
function isRankEnd() {
    if (textEndsWith("没有更多了").exists()) {
        log("没有更多了存在");
        var b = textEndsWith("没有更多了").findOne();
        var bs = b.bounds();
        log("bs.centerY():" + bs.centerY());  //2032
        if (bs.centerY() < 2032) {
            sleep(2000);
            return true;
        }
    } else {
        log("没有更多了不存在");
    }
    return false;
}

/**
 * 在排行榜页面,循环查找可收集好友
 * @returns {boolean}
 */
function enterOthers() {
    toastLog("开始检查排行榜");
    var i = 1;
    var ePoint = getHasEnergyfriend(1);
    log("ePoint:" + ePoint);
    //确保当前操作是在排行榜界面
    while (ePoint == null && textEndsWith("好友排行榜").exists()) {
        //滑动排行榜 root方式的的点击调用.如无root权限,7.0及其以上可采用无障碍模式的相关函数
        swipe(520, 1800, 520, 300, 1000);
        sleep(3000);
        ePoint = getHasEnergyfriend(1);
        i++;
        //检测是否排行榜结束了
        if (isRankEnd()) {
            return false;
        }
        //如果连续32次都未检测到可收集好友,无论如何停止查找(由于程序控制了在排行榜界面,且判断了结束标记,基本已经不存在这种情况了)
        else if (i > 32) {
            toastLog("程序可能出错,连续" + i + "次未检测到可收集好友");
            exit();
        }
    }
    if (ePoint != null) {
        log("ePoint不为空，ePoint.x,ePoint.y:" + ePoint.x + "," + ePoint.y);
        //点击位置相对找图后的修正
        click(ePoint.x, ePoint.y + 20);
        sleep(3000);
        //收集开始
        clickForestArea();
        //进去收集完后,递归调用enterOthers
        back();
        sleep(2000);
        var j = 0;
        //等待返回好有排行榜
        if (!textEndsWith("好友排行榜").exists() && j <= 5) {
            sleep(2000);
            j++;
        }
        if (j >= 5) {
            toastLog("程序当前所处状态不合预期,脚本退出");
            exit();
        }
        enterOthers();
    } else {
        toastLog("程序当前所处状态不合预期,脚本退出");
        exit();
    }
}


/**
 * 从排行榜获取可收集好有的点击位置
 * @returns {*}
 */
function getHasEnergyfriend(type) {
    var img = commonFunction.getCaptureImg();
    var p = null;
    if (type == 1) {
        p = findImage(img, handimg)
    }
    if (p != null) {
        return p;
    } else {
        return null;
    }
}

//=======================   enterOthers  end ==============================

/**
 * 结束后返回主页面
 */
function whenComplete() {
    toastLog("结束");
    commonFunction.shutdownApp("支付宝");
    exit();
}

//点击蚂蚁森林区域
function clickForestArea() {
    for (var x = 200; x < 900; x = x + 100) {
        for (var y = 500; y < 800; y = y + 100) {
            click(x, y);
        }
    }
}


module.exports = module_zhifubao;


