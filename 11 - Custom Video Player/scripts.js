const player=document.querySelector('.player');
const video= player.querySelector('.viewer');
const progress= player.querySelector('.progress');
const filledProgress=player.querySelector('.progress__filled')
const skipButtons=player.querySelectorAll('[data-skip]')
const toggleButton=document.querySelector('.toggle');
const ranges=document.querySelectorAll('.player__slider');



//functions
function toggleVideo(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }

}

function updateToggleButton(){
 const icon = this.paused? '►' : '❚ ❚';
 toggleButton.textContent=icon;

}
function skip(){
video.currentTime+=parseFloat(this.dataset.skip);
}
function updateRange(){

    video[this.name]=this.value;
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    filledProgress.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }
  
//event listeners
video.addEventListener('click', toggleVideo);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton)
toggleButton.addEventListener('click', toggleVideo);

skipButtons.forEach((button)=> button.addEventListener('click', skip))
ranges.forEach((range)=> range.addEventListener('change', updateRange))
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);