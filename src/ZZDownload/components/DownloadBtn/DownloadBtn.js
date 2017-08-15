import Mustache from 'mustache';
import CallApp from '@zz-vc/callApp';
import { $$, extractTemplate, getQueryString } from '../utils';

import tplContent from './DownloadBtn.mst';
import './DownloadBtn.less';

/**
 * 用来显示商品信息
 */
function Logo() {
    this.props = {
        imgUrl: ''
    };
    this.tpl = extractTemplate(tplContent);

    this.clickCallback = null;
}

Logo.prototype.init = function(target) {
    // this.props.imgUrl = handleSingle(data.imgUrl);
    //
    $$(target).innerHTML = Mustache.render(this.tpl, this.props);
    $$(target).querySelector('.zzdownload-btn')
        .addEventListener('click', raiseClicked.bind(this), false);

    if(getQueryString('isOpen') == 1){
        raiseClicked();
    }
};

Logo.prototype.clicked = function(callback) {
    this.clickCallback = callback;
};

function raiseClicked(item, e) {
    // this.clickCallback && this.clickCallback(item, e);
    var url = getQueryString('url') || "";
    var channelId = getQueryString('channelId') || 923;
    var urlSearch = url ? {
        openType: 'web',
        id: decodeURIComponent(url)
    } : {
        openType: 'home'
    };
    // console.log(123);
    var callApp = new CallApp();
    callApp.start({ channelId: channelId, urlSearch: urlSearch });
}

export default Logo;
