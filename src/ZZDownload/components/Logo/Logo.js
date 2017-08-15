import Mustache from 'mustache';
import { $$, extractTemplate } from '../utils';

import tplContent from './Logo.mst';
import './Logo.less';

/**
 * 用来显示商品信息
 */
function Logo() {
    this.props = {
        imgUrl: ''
    };
    this.tpl = extractTemplate(tplContent);

}

Logo.prototype.init = function(target) {
    $$(target).innerHTML = Mustache.render(this.tpl, this.props);
};

export default Logo;
