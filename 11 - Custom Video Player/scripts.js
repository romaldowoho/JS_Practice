const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const flScreen = player.querySelector('.fullscreen_button');


function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updatePlayButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function skip_arrow(n) {
	video.currentTime += n;
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * 100;
	video.currentTime = scrubTime;
}

function fullscreen(e) {
	var element = document.getElementById(e);
	if(element.RequestFullScreen) {
		element.RequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	}
}

video.addEventListener('click', togglePlay);
document.addEventListener('keyup', (e) => {
	if (e.keyCode == 32) {
		togglePlay();
	} else if (e.keyCode == 37) {
		skip_arrow(-10);
	} else if (e.keyCode == 39) {
		skip_arrow(25);
	}
})
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousedown', () => mouseDown = true);

