var nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    if (this.window.pageYOffset > 100) {
        nav.classList.add('shadow');
        nav.style.backgroundColor = "#BFCCB5";
    } else {
        nav.classList.remove('shadow');
        nav.style.backgroundColor = "";
    }
});

// Sorting Visualizer code in Portfolio.html
// Bubble sort

// Number of bars
const n = 30;
const array = [];

// for each time you refresh the page you get a new array
init();

let audioCtx = null;

function playNote(freq) {
    if (audioCtx == null) {
        audioCtx = new(
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, audioCtx.currentTime + dur
    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    showBars();
}

function play() {
    const copy = [...array];
    const moves = bubbleSort(copy);
    animate(moves);
}

function animate(moves) {
    if(moves.length == 0) {
        showBars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indices;

    if (move.type == "swap") {
        [array[i],array[j]] = [array[j],array[i]];
    }

    playNote(200 + array[i] * 500); // the sound frequency
    playNote(200 + array[j] * 500); // the sound frequency
    showBars(move);
    setTimeout(function() {
        animate(moves);
    }, 50); // the sorting animation speed
}

function bubbleSort(array) {
    const moves = [];
    do {
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            if (array[i-1] > array[i]) {
                swapped = true;
                moves.push({indices:[i-1,i],type:"swap"});
                [array[i-1],array[i]] = [array[i],array[i-1]];
            }
        }
    } while (swapped);
    return moves;
}

function showBars(move) {
    sortingvisualizer.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");

        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = 
                move.type == "swap" ? "white" : "#edc6b1";
        }
        sortingvisualizer.appendChild(bar);
    }
}