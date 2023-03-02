const audio = new Audio('../images/audio/a.mp3');
const buttons = document.querySelectorAll('.piano-key');
const html = document.querySelector('html');
const pianoBlock = document.querySelector('.piano');
const btnses = document.querySelectorAll('.btn');

const massa = [];

buttons.forEach(el => {
    massa.push(el.getAttribute('data-key'));
});


btnses[1].addEventListener('click', function () {
    buttons.forEach(el => {
        el.classList.add('active-letter');
        btnses[1].classList.add('btn-active');
        btnses[0].classList.remove('btn-active');
    });
});
btnses[0].addEventListener('click', function () {
    buttons.forEach(el => {
        el.classList.remove('active-letter');
        btnses[0].classList.add('btn-active');
        btnses[1].classList.remove('btn-active');
    });
});

function playNote(e) {
    const key = document.querySelector(`.piano-key[data-key="${e}"]`);
    const audioKey = document.querySelector(`audio[data-key="${e}"]`);
    const keyNote = key.getAttribute("data-note");
    const audioNote = audioKey.getAttribute("data-key");
    key.classList.add('piano-key-active');
    audioKey.currentTime = 0;
    audioKey.play();
}


const activeBtn = (e) => {
    // console.log(e.target);
    if (e == undefined || e == null) {
        return;
    }
    const key = document.querySelector(`.piano-key[data-key="${e}"]`);
    key.classList.remove('piano-key-active');

    // const key = e.target;
    key.classList.remove('piano-key-active');
};

let mouseButton = '';

const playMusic = (e) => {
    buttons.forEach(el => {
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


html.addEventListener('mouseup', e => {
    activeBtn(e.target.dataset.key);
    pianoBlock.removeEventListener('mouseover', playMusic);
    mouseButton = '';
});

pianoBlock.addEventListener('mouseout', e => {
    activeBtn(e.target.dataset.key);
    mouseButton = '';
});



document.addEventListener('click', function (event) {
    if (!event.target.hasAttribute('data-toggle-fullscreen')) return;
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }

}, false);


let pressingButton = '';
html.addEventListener('keydown', e => {
    massa.forEach(el => {
        if (el == e.keyCode) {
            switch (event.keyCode) {
                case event.keyCode: {
                    if (pressingButton == null) {
                        return;
                    }
                    if (pressingButton !== event.keyCode) {
                        pressingButton = event.keyCode;
                        playNote(pressingButton);
                    }
                    break;
                }
            }
        }
    });

});
document.addEventListener('keyup', e => {
    pressingButton = '';
    massa.forEach(el => {
        if (el == e.keyCode) {
            activeBtn(e.keyCode);
        }
    });
});


// document.addEventListener('keydown', function (e) {
//     if (e.which) {
//         // const key = String.fromCharCode(event.keyCode);
//         const key = String(event.keyCode);
//         const upKey = document.querySelector(`.piano-key[data-key="${key}"]`);
//         console.log(e.keyCode);
//         playNote(e.keyCode);
//     }
// });


