import ZZAPP from '@zz/zz-jssdk';
import { $$ } from './components/utils';
import {
    lego,
    isZZApp,
    queryParams,
    CHANNEL_WEIXIN,
    CHANNEL_WEIXIN_PYQ
} from './common';
import DAL from './dal';

var SUMAI_URL = 'https://m.zhuanzhuan.58.com/Mzhuanzhuan/zhuanzhuan/zzactivity/ZZAzone/2.0/html/activity-conf.html?webview=zzn&subjectId=435';

export default {
    urlParams: queryParams(),
    legoTraceParam: queryParams().legoTraceParam && JSON.parse(decodeURIComponent(queryParams().legoTraceParam)) || null,
    share: function(channel, params) {
        var infoId = this.urlParams.infoId;
        var legoTraceParam = this.legoTraceParam;
        var defaultURL = 'https://zhuan.58.com/zz/redirect/inforurlredirect?infoId=' + infoId;

        var shareParams = {
            title: params.title || '我在转转上卖闲置宝贝，绝对靠谱值到爆炸！',
            content: params.content || (channel == CHANNEL_WEIXIN ? '要么买，要么转发，要么…来围观一下人家也是好的嘛^_^' : ''),
            wxExtraText: params.wxExtraText || '',
            picPath: handleSingle(params.imgUrl) || '',
            url: params.url || defaultURL,
            platform: channel,
            logParam: 'quickSaleMPost'
        };

        lego('PUBLISHSUCCESS', getShareClickActionType(channel), legoTraceParam);
        isZZApp() && ZZAPP.shareToPlatform(shareParams, function(res) {
            if (res.code == '0') {
                lego('PUBLISHSUCCESS', getShareSuccessActionType(channel), legoTraceParam);

                DAL.signUpSellMarketV2({
                    signType: '0',
                    infoId: infoId
                }).then(function(data) {
                    if (data.status == 0) {
                        ZZAPP.toast({
                            msg: '恭喜您获得速卖特权，您的宝贝将得到优先展示',
                            style: '1'
                        });
                        setTimeout(function() {
                            replacePage(SUMAI_URL);
                        }, 3000);
                    } else {
                        ZZAPP.toast({
                            msg: data.msg || '很遗憾，加入速卖区失败',
                            style: '2'
                        });
                        setTimeout(function() {
                            replacePage(SUMAI_URL);
                        }, 3000);
                    }
                });
            } else {
                ZZAPP.toast({
                    msg: '您没有分享成功，要不，再分享一次试试？',
                    style: '2'
                });
            }
        });
    }
};

function replacePage(url) {
    if (window.navigator.userAgent.toLowerCase().indexOf('android') >= 0) {
        //安卓端
        ZZAPP.close(function() {
            ZZAPP.enterPage({ targetUrl: url });
        });
    } else {
        //ios暂未找到合适的方法
        ZZAPP.enterPage({
            targetUrl: url
        });
    }
}

function getShareClickActionType(channel) {
    if (channel == CHANNEL_WEIXIN) {
        return 'SHARE_WECHAT_CLICK';
    } else if (channel == CHANNEL_WEIXIN_PYQ) {
        return 'SHARE_WECHATPYQ_CLICK';
    } else {
        return '';
    }
}
function getShareSuccessActionType(channel) {
    if (channel == CHANNEL_WEIXIN) {
        return 'SHARE_WECHAT_SUCCESS';
    } else if (channel == CHANNEL_WEIXIN_PYQ) {
        return 'SHARE_WECHATPYQ_SUCCESS';
    } else {
        return '';
    }
}