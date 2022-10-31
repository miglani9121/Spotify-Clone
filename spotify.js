let songindex=0;
let audioelement=new Audio('1.mp3');
let masterplay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar')
let gif=document.getElementById('gif')
let mastersongname=document.getElementById('mastersongname')
let songitem=Array.from(document.getElementsByClassName('songitem'))
//audioelement.play();

let songs = [
    {songName: "Warriyo - Mortals", filePath: "1.mp3", coverPath: "1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
]

songitem.forEach((element,i)=>{
    //console.log(element,i)
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

masterplay.addEventListener('click' , ()=>{
    if(audioelement.paused||audioelement.currentTime<=0)
    {
        audioelement.play();
        masterplay.classList.remove('fa-circle-play')
        masterplay.classList.add('fa-circle-pause')
        gif.style.opacity=1;
    }
    else
    {
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause')
        masterplay.classList.add('fa-circle-play')
        gif.style.opacity=0;
    }
})
audioelement.addEventListener('timeupdate' , ()=>{
    //console.log('timeupdate')
    progress=parseInt((audioelement.currentTime/audioelement.duration*100))
    myprogressbar.value=progress
})
myprogressbar.addEventListener('change' , ()=>{
    audioelement.currentTime=myprogressbar.value*audioelement.duration/100
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioelement.src = `songs/${songindex+1}.mp3`;
        mastersongname.innerText = songs[songindex].songName;
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=9){
        songindex = 0
    }
    else{
        songindex += 1;
    }
    audioelement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songName;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex = 0
    }
    else{
        songindex -= 1;
    }
    audioelement.src = `songs/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songName;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})