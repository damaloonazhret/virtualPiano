const audio = new Audio('../images/audio/a.mp3');
const buttons = document.querySelectorAll('.piano-key');
const html = document.querySelector('.piano');

function playNote(e) {
    // console.log(e.target);
    // const key = document.querySelector(`.piano-key[data-key="${e.target.dataset.key}"]`);
    // const audioKey = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`);
    const key = document.querySelector(`.piano-key[data-key="${e}"]`);
    const audioKey = document.querySelector(`audio[data-key="${e}"]`);
    const keyNote = key.getAttribute("data-note");
    const audioNote = audioKey.getAttribute("data-key");
    key.classList.add('piano-key-active');
    audioKey.currentTime = 0;
    audioKey.play();
    // console.log(key);
    // console.log(audioKey);
    // console.log(keyNote);
    // console.log(audioNote);

    
}

function activeBtn(e) {
    if (e == undefined) {
        return;
    }
    // console.log(e);
    const key = document.querySelector(`.piano-key[data-key="${e}"]`);
    key.classList.remove('piano-key-active');
}

let mouseButton = '';

function playMusic(e) {
    buttons.forEach(el => {
        if (e.target === el) {
            // console.log(e.target.dataset.key);
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
}

html.addEventListener('mousedown', function () {
    html.addEventListener('mousemove', playMusic);
});

html.addEventListener('click', function () {
    html.addEventListener('click', playMusic);
});

html.addEventListener('mouseup', e => {
    html.removeEventListener('mousemove', playMusic);
    mouseButton = '';
});
html.addEventListener('mouseout', e => {
    // window.removeEventListener('mousemove', playMusic);
    mouseButton = '';
    activeBtn(e.target.dataset.key);
});


let pressingButton = '';
html.addEventListener('keydown', e => {
    switch (event.keyCode) {
        case event.keyCode: {
            if (pressingButton !== event.keyCode) {
                pressingButton = event.keyCode;
                playNote(pressingButton);
            }
            break;
        }
    }
});
document.addEventListener('keyup', e => {
    pressingButton = '';
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


