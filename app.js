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
const liked     = document.querySelector("#liked");
const showLiked = document.querySelector("#liked-list");



const player = new MusicPlayer(musicList);
console.log(player)
console.log(player.getMusic())


window.addEventListener("load", () => {
    const music = player.getMusic();
    displayMusic(music);
    listShow(player.musicList);
    isPlaying();
});


let displayMusic = music => {
    title.innerText  = music.title;
    singer.innerText = music.singer;
    image.src        = 'img/' + music.img;
    audio.src        = 'mp3/' + music.file;
};


play.addEventListener("click" , () => {
    if(!(play.classList.contains("playing"))) {
        audio.play();
        play.querySelector("i").setAttribute("class","fa-solid fa-pause");
        play.classList.add("playing");
    } else if(play.classList.contains("playing")) {
        audio.pause();
        play.querySelector("i").setAttribute("class","fa-solid fa-play");
        play.classList.remove("playing");
    }
});


next.addEventListener("click", () => {
    player.next();
    const music = player.getMusic();
    displayMusic(music);
    play.querySelector("i").setAttribute("class","fa-solid fa-play");
    isPlaying();  
    controlEdelim();  
});

prev.addEventListener("click" , () => {
    player.previous();
    const music = player.getMusic();
    displayMusic(music);
    play.querySelector("i").setAttribute("class","fa-solid fa-play");
    isPlaying();
    controlEdelim();   
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
        volume.setAttribute("class","fa-solid fa-volume-xmark me-2");
        audio.muted = true;
    }else {
        volumeBar.value = 100;
        volume.setAttribute("class","fa-solid fa-volume-high ses me-2");
        audio.muted = false;
        audio.volume = 1;
    } 
});


volumeBar.addEventListener("input", e => {
    const volumeValue = e.target.value;
    audio.volume      = volumeValue / 100;
    
    if(volumeValue == 0) {
        volume.setAttribute("class","fa-solid fa-volume-xmark me-2");
        audio.muted = true;
    } else{
        volume.setAttribute("class","fa-solid fa-volume-high ses me-2");
        audio.muted = false;
    }
});

const list = document.querySelector("#music-list");

const listShow = music => {
    for(let i = 0; i< music.length ; i++) {
        let tag = `
                <li onclick="selectedMusic(this)" li-index="${i}" class="list-group-item d-flex justify-content-between"style="font-size:14px;">
                    <span>${music[i].getName()}</span>
                    <span id="music-${i}" class="badge bg-dark"></span>  
                    <audio class="music-${i}" src="mp3/${music[i].file}"></audio>
                </li>
        
    `;
        list.insertAdjacentHTML("beforeend", tag);

        let audioDuration = list.querySelector(`.music-${i}`);
        
        let audioTag = list.querySelector(`#music-${i}`);
       

        audioDuration.addEventListener("loadeddata" , () => {
            audioTag.innerText = calculateTime(audioDuration.duration);
        });
    }
}

const selectedMusic = bu => {
    const index  = bu.getAttribute("li-index");
    player.index = index;
    displayMusic(player.getMusic());
    audio.play();
    play.querySelector("i").setAttribute("class","fa-solid fa-pause");
    play.classList.add("playing");
    isPlaying();
}

const isPlaying = () => {
    for(let li of list.querySelectorAll("li")) {
        if(li.classList.contains("oynatiliyor")) {
            li.classList.remove("oynatiliyor");
        }
        if(li.getAttribute("li-index") == player.index) {
            li.classList.add("oynatiliyor");
        }
    }
}


audio.addEventListener("ended", () => {
    next.click();
});


const showLike = (kullanici,song,baba) => {

        if(!(liked.classList.contains("eklendi"))) {
            liked.children[0].setAttribute("class","fa-solid fa-heart fa-beat-fade text-danger");
            
            const ekle = `
            <li class="${kullanici.index} list-group-item d-flex justify-content-between align-items-center" li-index="${kullanici.index}">
                <img src="img/${song.img}" class="img-fluid" width="50" style="height:50px;" alt="">
                <span style="font-size: 12px;">${song.getName()}</span>
                <i class="fa-solid fa-heart text-danger"></i>
            </li>
        `;

         showLiked.insertAdjacentHTML("beforeend", ekle);
         liked.classList.add("eklendi");
         liked.classList.add(`${kullanici.index}`);
        }else if(liked.classList.contains("eklendi")) {
            console.log("ekleme yapamazsin");
            liked.children[0].setAttribute("class","fa-regular fa-heart");
            liked.classList.remove("eklendi");
            liked.classList.remove(`${kullanici.index}`);

            const toplamChild = showLiked.children;
            for(let i = 0 ; i < toplamChild.length ; i++) {
                if(showLiked.children[i].getAttribute("li-index").includes(player.index)) {
                   showLiked.children[i].remove();
                }       
            }     
        }      
    }





const controlEdelim = () => {
        if(liked.classList.contains(player.index)){
            liked.children[0].setAttribute("class","fa-solid fa-heart fa-beat-fade text-danger");
            liked.classList.add("eklendi");
        } else {
            liked.classList.remove("eklendi");
            liked.children[0].setAttribute("class","fa-regular fa-heart");
        }
    }


liked.addEventListener("click", () => {
    showLike(player,player.getMusic());
    controlEdelim();
});


//tekrar oynatma
document.getElementById("repeat").addEventListener("click",() => {
    if(!(document.getElementById("repeat").classList.contains("repeat"))) {
        document.getElementById("repeat").style.color ="green";
        document.getElementById("repeat").style.fontSize ="20px";
        audio.loop = true;
        document.getElementById("repeat").classList.add("repeat");
    }else if(document.getElementById("repeat").classList.contains("repeat")) {
        document.getElementById("repeat").style.color ="";
        document.getElementById("repeat").style.fontSize ="";
        audio.loop = false;
        document.getElementById("repeat").classList.remove("repeat");
    }
})










