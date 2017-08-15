import './Download.less';
import Logo from '../components/Logo/Logo';
import DownloadBtn from '../components/DownloadBtn/DownloadBtn';

var logo = new Logo();
var downloadBtn = new DownloadBtn();

var main = (function() {

    function render(data) {
        logo.init('.zz-logo');
        downloadBtn.init('.zz-download-btn');
    }

    function bindEvent() {
        //
    }

    function init() {
        render();
    }

    return {
        init: init
    };
})();

main.init();
