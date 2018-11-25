
var source = document.querySelector('#player source');

var camera = getParameterByName('camera');
source.src = '/hls/' + (camera || 'stream') + '.m3u8';
var player = videojs('player');

player.play();


var number = document.querySelector('#head .number');
number.innerHTML = Math.round(Math.random() * 10000);


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};