const body = document.querySelector('body');
const pianoKeys = document.querySelectorAll('.piano-key');
const pianoBlock = document.querySelector('.piano');
const changeBtn = document.querySelectorAll('.btn');
const btnContainer = document.querySelector('.btn-container');
const audioKeys = document.querySelectorAll(`audio`);


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
    pianoKeys.forEach(el => {
        if (el.dataset.key == keyCode) {
            el.classList.add('piano-key-active');
        }
    });
    audioKeys.forEach(el => {
        if (el.dataset.key == keyCode) {
            el.currentTime = 0;
            el.play();
        }
    });
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
            if (mouseButton !== e.target.dataset.key) {
                mouseButton = e.target.dataset.key;
                playNote(mouseButton);
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
    pianoKeys.forEach(el => {
        if (el.getAttribute('data-key') == e.keyCode) {
            if (pressingButton !== e.keyCode) {
                pressingButton = e.keyCode;
                playNote(pressingButton);
            }
        }
    });
});

document.addEventListener('keyup', e => {
    //clearing the value and remove active key
    pressingButton = '';
    pianoKeys.forEach(el => {
        if (el.getAttribute('data-key') == e.keyCode) {
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