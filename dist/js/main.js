const body = document.querySelector('body');
const pianoKeys = document.querySelectorAll('.piano-key');
const pianoBlock = document.querySelector('.piano');
const changeBtn = document.querySelectorAll('.btn');
const btnContainer = document.querySelector('.btn-container');
const keyValeue = [];

// create array of data-key
pianoKeys.forEach(el => {
    keyValeue.push(el.getAttribute('data-key'));
});

// change letter of notes
btnContainer.addEventListener('click', function (e) {
    const currentTarget = e.target;
    if (!currentTarget.classList.contains('btn-active')) {
        changeBtn.forEach(el => {
            el.classList.toggle('btn-active');
        });
        pianoKeys.forEach(el => {
            el.classList.toggle('active-letter');
        });
    }
});

function playNote(keyCode) {
    const key = document.querySelector(`.piano-key[data-key="${keyCode}"]`);
    const audioKey = document.querySelector(`audio[data-key="${keyCode}"]`);
    key.classList.add('piano-key-active');
    audioKey.currentTime = 0;
    audioKey.play();
}

// search active keys
const activeBtn = (keyCode) => {
    if (keyCode == undefined || keyCode == null) {
        return;
    }
    const key = document.querySelector(`.piano-key[data-key="${keyCode}"]`);
    key.classList.remove('piano-key-active');
};


// mouse tricks
// starting empty value
let mouseButton = '';
// blocking the endless button press, check appropriate value and play piano key :)
const playMusic = (e) => {
    pianoKeys.forEach(el => {
        if (e.target === el) {
            switch (e.target.dataset.key) {
                case e.target.dataset.key: {
                    if (mouseButton !== e.target.dataset.key) {
                        mouseButton = e.target.dataset.key;
                        playNote(mouseButton);
                    }
                    break;
                }
            }
        }
    });
};
pianoBlock.addEventListener('mousedown', function (e) {
    pianoBlock.addEventListener('mouseover', playMusic);
    activeBtn(e.target.dataset.key);
    playMusic(e);
    mouseButton = '';
});
body.addEventListener('mouseup', e => {
    activeBtn(e.target.dataset.key);
    pianoBlock.removeEventListener('mouseover', playMusic);
    mouseButton = '';
});
pianoBlock.addEventListener('mouseout', e => {
    activeBtn(e.target.dataset.key);
    mouseButton = '';
});


// keyboard scams
// starting empty value
let pressingButton = '';

// blocking the endless button press, check appropriate value and play piano key :)
body.addEventListener('keydown', e => {
    keyValeue.forEach(el => {
        if (el == e.keyCode) {
            switch (e.keyCode) {
                case e.keyCode: {
                    if (pressingButton == null) {
                        return;
                    }
                    if (pressingButton !== e.keyCode) {
                        pressingButton = e.keyCode;
                        playNote(pressingButton);
                    }
                    break;
                }
            }
        }
    });
});

document.addEventListener('keyup', e => {
    //clearing the value and remove active key
    pressingButton = '';
    keyValeue.forEach(el => {
        if (el == e.keyCode) {
            activeBtn(e.keyCode);
        }
    });
});

//fullscreen mode
document.addEventListener('click', function (event) {
    if (!event.target.hasAttribute('data-toggle-fullscreen')) return;
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }

}, false);