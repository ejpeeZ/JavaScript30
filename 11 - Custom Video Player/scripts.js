const player = document.querySelector( ".viewer" );
const playButton = document.querySelector( ".player__button.toggle" );
const skipButtons = document.querySelectorAll( ".player__button:not(.toggle)" );

const volumeSlider = document.querySelector( "input[name=volume]");
const playbackRateSlider = document.querySelector( "input[name=playbackRate]");

const progressBar = document.querySelector( ".progress" );
const progressBarFilled = document.querySelector( ".progress__filled" );

function togglePlay() {
	player.paused ? player.play() : player.pause();
}

function toggleButtonIcon() {
	const icon = player.paused ? "►" : "❚ ❚"; 
	playButton.textContent = icon;
}

function skipTime() {
	player.currentTime += parseFloat( this.dataset.skip );
};

function setVolume() {
	player.volume = this.value;
}

function setPlaybackRate() {
	player.playbackRate = this.value;
}

function handleProgress() {
	// progressBar.style[ "flex-basis" ] = `${ ( player.currentTime / player.duration ) * 100 }%`;
	progressBarFilled.style.flexBasis = `${ ( player.currentTime / player.duration ) * 100 }%`;
}

function scrub( event ) {
	const scrubTime = ( event.offsetX / progressBar.offsetWidth ) * player.duration; 
	player.currentTime = scrubTime;
}


player.addEventListener( "click", togglePlay );
playButton.addEventListener( "click", togglePlay );

player.addEventListener( "play", toggleButtonIcon );
player.addEventListener( "pause", toggleButtonIcon );
player.addEventListener('timeupdate', handleProgress);

skipButtons.forEach( button => {
	button.addEventListener( "click", skipTime );
} )

volumeSlider.addEventListener( "input", setVolume );
playbackRateSlider.addEventListener( "input", setPlaybackRate );

let mouseDown = false;
progressBar.addEventListener( "click", scrub );
progressBar.addEventListener( "mousemove", ( event ) => mouseDown && scrub( event ) );
progressBar.addEventListener( "mousedown", () => mouseDown = true );
progressBar.addEventListener( "mouseup", () => mouseDown = false );
