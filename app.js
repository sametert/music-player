const container   = document.querySelector(".container");
const image       = document.querySelector("#music-image");
const title       = document.querySelector("#music-details .title");
const singer      = document.querySelector("#music-details .singer");
const prev        = document.querySelector("#controls #prev");
const play        = document.querySelector("#controls #play");
const next        = document.querySelector("#controls #next");
const currentTime = document.querySelector("#current-time");
const duration    = document.querySelector("#duration");
const progressBar = document.querySelector("#progress-bar");
const volume      = document.querySelector("#volume");
const volumeBar   = document.querySelector("#volume-bar");



const player = new MusicPlayer(musicList);


window.addEventListener("load", () => {
    const music = player.getMusic();
    displayMusic(music);
});


let displayMusic = music => {
    title.innerText  = music.getName();
    singer.innerText = music.singer;
    image.src        = 'img/' + music.img;
    audio.src        = 'mp3/' + music.file;
};


play.addEventListener("click" , () => {
    if(!(play.classList.contains("playing"))) {
        audio.play();
        play.setAttribute("class","fa-solid fa-pause");
        play.classList.add("playing");
    } else if(play.classList.contains("playing")) {
        audio.pause();
        play.setAttribute("class","fa-solid fa-play");
        play.classList.remove("playing");
    }
});


next.addEventListener("click", () => {
    player.next();
    const music = player.getMusic();
    displayMusic(music);
    play.setAttribute("class","fa-solid fa-play");
});

prev.addEventListener("click" , () => {
    player.previous();
    const music = player.getMusic();
    displayMusic(music);
    play.setAttribute("class","fa-solid fa-play");
});


let calculateTime = totalTime => {
    const minute = Math.floor(totalTime / 60);
    const second = Math.floor(totalTime % 60);
    const updatedSecond = second < 10 ? `0${second}` : `${second}`;
    const result = `${minute}:${updatedSecond}`;
    return result;
};


audio.addEventListener("loadedmetadata" , () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max      = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate" , () => {
    progressBar.value       = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});


progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime       = progressBar.value;
});


volume.addEventListener("click" , () => {
    if(volume.classList.contains("ses")) {
        volumeBar.value = 0;
        volume.setAttribute("class","fa-solid fa-volume-xmark");
        audio.muted = true;
    }else {
        volumeBar.value = 100;
        volume.setAttribute("class","fa-solid fa-volume-high ses");
        audio.muted = false;
        audio.volume = 1;
    } 
});


volumeBar.addEventListener("input", e => {
    const volumeValue = e.target.value;
    audio.volume      = volumeValue / 100;
    
    if(volumeValue == 0) {
        volume.setAttribute("class","fa-solid fa-volume-xmark");
        audio.muted = true;
    } else{
        volume.setAttribute("class","fa-solid fa-volume-high ses");
        audio.muted = false;
    }
});







