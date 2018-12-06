!function () {

    // utilities
    function listenPressingEvent(item, onPressDown, onPressRelease) {
        item.addEventListener("mousedown", onPressDown, false);
        item.addEventListener("mouseup", onPressRelease, false);
        item.addEventListener("mouseleave", onPressRelease, false);

        item.addEventListener("touchstart", onPressDown, false);
        item.addEventListener("touchend", onPressRelease, false);
    };

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };
    function randomString(length) {
        var result = '';
        while (length > 0) {
            result += randomChar();
            length--;
        };
        return result;
    };
    function randomOpacityChar() {
        var charTmpl = '<font style="opacity: @opacity;">@char<font>';
        return charTmpl
            .replace('@opacity', randomBetween(1, 10) * 0.1)
            .replace('@char', randomChar());
    };
    function randomChar() {
        var seed = randomBetween(1, 25537);
        return String.fromCharCode(seed);
    };
    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };


    var main = function () {

        // video
        var $source = document.querySelector('#player source');
        var camera = getParameterByName('camera');
        $source.src = '/hls/' + (camera || 'stream' + randomBetween(1, 4)) + '.m3u8';
        var player = videojs('player');
        player.play();

        // head
        var $number = document.querySelector('#head .number');
        $number.innerHTML = randomBetween(100, 1000);
        var $name = document.querySelector('#head #name');
        $name.innerHTML = randomString(randomBetween(0, 6));

        // data content
        var $dataWrapper = document.querySelector('#data-wrapper');
        var $dataContent = document.querySelector('#data-content');
        setInterval(function () {
            if (player.paused()) return;
            while ($dataContent.offsetWidth > $dataWrapper.offsetWidth)
                $dataContent.removeChild($dataContent.childNodes[0]);
            $dataContent.innerHTML += randomOpacityChar();
        }, 60);

        // port and mask
        var $port = document.querySelector('#port');
        var $mask = document.querySelector('#mask');
        listenPressingEvent(
            $port,
            function () {
                console.log('press down');
                $port.classList.remove('shining');
                if ($mask.style.opacity !== '0') $mask.style.opacity = '0';
            },
            function () {
                console.log('press release');
                $port.classList.add('shining');
                if ($mask.style.opacity !== '1') $mask.style.opacity = '1';
            }
        );
    }();

}();