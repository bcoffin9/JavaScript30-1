/* get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

/* build out functions */
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? 'Play' : 'Pause';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;    
}

function scrub(e) {
    const scrubTime = 
        (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function launchFullScreen() {
    if(!document.fullscreenEnabled) {
        video.webkitRequestFullscreen();
    } else {
        if(document.exitFullScreen) {
            document.exitFullscreen;
        }
    }
    console.error('this has fucked up');
}
/*Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => 
            button.addEventListener('click', skip));

ranges.forEach(range => 
    range.addEventListener('mousemove', handleProgress));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullScreen.addEventListener('click', launchFullScreen);




