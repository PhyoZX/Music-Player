const playListTag = document.getElementsByClassName("playList")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const timeTag = document.getElementsByClassName("time")[0];

const prograssBarTag = document.getElementById("prograssBar");
const currentPrograssTag = document.getElementById("currentPrograss");

const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks=[
	{trackId : "Music/track2.mp3",title: "Cupid"},
	{trackId : "Music/track1.mp3",title: "Touch it"},
	{trackId : "Music/track3.mp3",title: "She Wolf"},
	{trackId : "Music/track4.mp3",title: "Where have you been"}];

for(let i=0;i<tracks.length;i++){
	const tracksTag = document.createElement("div");
	tracksTag.addEventListener("click",()=>{
		playingIndex=i;
		play();
	})
	tracksTag.classList.add("Item");
	const title = (i+1).toString() + ". " + tracks[i].title;
	tracksTag.textContent = title;
	playListTag.append(tracksTag);
}

let duration=0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata",()=>{
	duration = Math.floor(audioTag.duration);
	durationText = minutesAndSeconds(duration);
})

audioTag.addEventListener("timeupdate",()=>{
	const currentTime = Math.floor(audioTag.currentTime);
	const currentTimeText = minutesAndSeconds(currentTime);
	timeTag.textContent = currentTimeText+" / "+durationText;
	updateTime(currentTime);
})

const updateTime = (currentTime) =>{
	const playTime = 500/duration*currentTime;
	currentPrograssTag.style.width = playTime.toString()+"px";
}

const minutesAndSeconds = (totalSecond) =>{
	const minutes = Math.floor(totalSecond/60);
	const seconds = totalSecond%60;
	const minutesText = minutes<10 ? "0" + minutes.toString() : minutes;
	const secondsText = seconds<10 ? "0" + seconds.toString() : seconds;
	return minutesText + ":" + secondsText;
}

let playingIndex=0;
let isPlaying = false;
playButtonTag.addEventListener("click",()=>{
	const currentPlayTime = Math.floor(audioTag.currentTime);
	isPlaying=true; 
	if(currentPlayTime===0){
		play();
		}else{
			audioTag.play();
			playAndPause();
		}
})

pauseButtonTag.addEventListener("click",()=>{
	isPlaying=false;
	audioTag.pause();
	playAndPause();
})

previousButtonTag.addEventListener("click",()=>{
	if(playingIndex===0){
		return;
	}
	playingIndex-=1;
	play();
})

nextButtonTag.addEventListener("click",()=>{
	if(playingIndex===tracks.length-1){
		return;
	}
	playingIndex+=1;
	play();
	})

const play = () =>{
	const playSong = tracks[playingIndex].trackId;
	audioTag.src = playSong;
	audioTag.play();
	isPlaying=true;
	playAndPause();

}

const playAndPause = ()=>{
	if(isPlaying){
		playButtonTag.style.display="none";
		pauseButtonTag.style.display="inline";
	}else{
		playButtonTag.style.display="inline";
		pauseButtonTag.style.display="none";
	}
}


