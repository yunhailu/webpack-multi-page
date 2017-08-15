//  const 默认不支持，不会被 webpack 转化
var COOKIE_PPU = 'PPU';
var COOKIE_ZZU = 'ZZU';
var COOKIE_UID = 'uid';

//  weixin:微信好友, weixin_zone:微信朋友圈, qq: qq好友, q_zone: qq空间, sina_weibo:微博,copy_link:复制链接
export var CHANNEL_WEIXIN = 'weixin';
export var CHANNEL_WEIXIN_PYQ = 'weixin_zone';
export var CHANNEL_QQ = 'qq';
export var CHANNEL_QZONE = 'q_zone';
export var CHANNEL_SINA_WEIBO = 'sina_weibo';
export var CHANNEL_COPY_LINK = 'copy_link';

export function getCookie(k) {
    var res = RegExp('(^|; )' + encodeURIComponent(k) + '=([^;]*)').exec(document.cookie);
    return res && res[2];
}

export function getZZU() {
    return getCookie(this.COOKIE_ZZU);
}
export function getUID() {
    return getCookie(this.COOKIE_UID);
}

export function isZZApp() {
    var type = /[\?\&]type=(\w+)/i.exec(location.href);
    return (
        (type && type.length > 1 && type[1].toLowerCase() == 'zzapp') ||
        window.navigator.userAgent.toLowerCase().indexOf('zhuanzhuan') > 0
    );
}

export function lego(pageType, actionType, addtionalParams) {
    // id58是 nginx 生成的，即使是纯静态的html也会生成，uuid是后端服务生成的
    var cookieid = getCookie('uid') || getCookie('id58') || getCookie('uuid');
    var lego = 'https://lego.zhuanzhuan.com/page/mark?cookieid=' + cookieid + '&pagetype=' + pageType + '&actiontype=' + actionType + '&appid=ZHUANZHUANM&_t=' + new Date().getTime();
    if (addtionalParams) {
        lego += '&backup=' + encodeURIComponent(JSON.stringify(addtionalParams));
    }
    var img = new Image();
    img.src = lego;
}

export function queryParams() {
    var params = {};
    decodeURIComponent(location.search)
        .replace('?', '')
        .split('&')
        .forEach(function(paramStr) {
            var kv = paramStr.split('=');
            params[kv[0]] = kv[1];
        });
    return params;
}
