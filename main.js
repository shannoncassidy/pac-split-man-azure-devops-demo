import { SplitFactory } from '@splitsoftware/splitio';
import { SplitConfig } from './split_config.js';
import { Game } from './modules/game.js';

Object.prototype.clone = function () {
    var i, newObj = (this instanceof Array) ? [] : {};
    for (i in this) {
        if (i === 'clone') {
            continue;
        }
        if (this[i] && typeof this[i] === "object") {
            newObj[i] = this[i].clone();
        } else {
            newObj[i] = this[i];
        }
    }
    return newObj;
};

var el = document.getElementById("pacman");
var PACMAN = new Game(el);

// TODO - move auth key out of here
var factory = SplitFactory(SplitConfig);

var splitClient = factory.client();

function handleTreatments() {
    var treatments = splitClient.getTreatments(['PacMan_SmartGhost', 'PacMan_SuperPac']);
    el.dispatchEvent(new CustomEvent('splitChange', { detail: treatments }));
}

splitClient.on(splitClient.Event.SDK_READY, function () {
    handleTreatments();
    console.log('Split is ready!');
});

splitClient.on(splitClient.Event.SDK_UPDATE, function () {
    handleTreatments();
    console.log('The SDK has been updated!');
});


window.setTimeout(function () { PACMAN.init("./"); }, 0);