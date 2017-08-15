//  业务无关，视图层相关辅助方法

export function $(selector) {
    return document.querySelectorAll(selector);
}
export function $$(selector) {
    return document.querySelector(selector);
}

/**
 * 从模板文件内容中提取 template 标签中的信息
 * @param {*模板文件内容} tplContent 
 */
export function extractTemplate(tplContent) {
    var elem = document.createElement('div');
    elem.innerHTML = tplContent;
    return elem.querySelector('template').innerHTML;
}

/**
 * 获取url中query参数
 * @param {*参数名} name
 */
export function getQueryString (name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

/**
 * 判断指定元素是否位于可视区域内
 * @param {*HTML 元素} el 
 */
export function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}
