let songContainer = document.querySelector(".songs");
const playButton = document.getElementById("playBtn");
const prevButton = document.getElementById("previousBtn");
const nextButton = document.getElementById("nextBtn");
const volumeBtn = document.getElementById("volumeBtn");
const repeatBtn = document.getElementById("repeatBtn");
const seekBar = document.getElementById("seekBar");
const volumeBar = document.getElementById("volumeBar");
const albumPhotoPlayer = document.getElementById("albumPhotoPlayer");
const menuBtn = document.getElementById("menuBtn");
const closeMenuBtn = document.getElementById("closeMenu");

// let audioEventListener = new Event("timeupdate");
// let initialLeftProperty = "-" + document.querySelector(".left-container").style.width;
let songCardLeft;
let isPlaying = false;
let repeat = true;
let isInteractingWithSeekBar = false;
let currentAudioObject = new Audio();
let currentSongID;
let songArray = [], albumArray = [];
let pauseIconSrc = "SVG/pause.svg";
let playIconSrc = "SVG/play-triangle.svg";
let volumeIconSrc = "SVG/volume.svg";
let muteIconSrc = "SVG/muted.svg";
let repeatIconSrc = "SVG/repeat.svg";
let noRepeatIconSrc = "SVG/no-repeat.svg";


// console.log(songCardLeft);

main();


async function main() {

    albumArray = await GetAlbums();
    for (let index = 1; index < albumArray.length; index++) {
        let newAlbumCard = addAlbum(albumArray[index].innerText.slice(0, -1), albumArray[index].href + "album walpaper.jpeg");
        newAlbumCard.addEventListener("click", async () => {
            songArray = await GetSongs(newAlbumCard.querySelector("h3").innerText + "/");
            let songId = 0;


            // console.log(getComputedStyle(document.querySelector(".left-container")).getPropertyValue('position'));
            if (getComputedStyle(document.querySelector(".left-container")).getPropertyValue('position') === "absolute")
                document.querySelector(".left-container").style.left = 0;

            songContainer.innerHTML = "";

            songArray.forEach(song => {
                let extension = song.innerText.slice(-4, song.innerText.length);
                // console.log(songArray[currentSongID].href.split(song.innerText.replaceAll(" ", "%20"))[0] + "album walpaper.jpeg");
                // console.log(songArray[currentSongID].href.split(song.innerText.replaceAll(" ", "%20"))[0] + "album walpaper.jpeg");
                // console.log(song.href.split(song.innerText.replaceAll(" ","%20")),song.innerText.replaceAll(" ","%20"));
                addSong(songId, song.innerText.split("-")[1].replace(extension, " "), song.innerText.split("-")[0], song.href.split(song.innerText.replaceAll(" ", "%20"))[0] + "album walpaper.jpeg");
                songId++;
            })

            songCardLeft = document.querySelectorAll(".songCard");

            songCardLeft.forEach(e => {
                e.addEventListener("click", () => {
                    songCardLeft.forEach(song => {
                        song.style.backgroundColor = "black";
                        song.querySelector(".play").style.display = "block";

                    });


                    if (songArray[e.id].href !== currentAudioObject.currentSrc) {
                        currentSongID = e.id;
                        playSong(songArray[currentSongID].href);
                    }

                    if (songArray[currentSongID].href === currentAudioObject.currentSrc) {
                        songCardLeft[currentSongID].style.backgroundColor = "#5c5c5c";
                        songCardLeft[currentSongID].querySelector(".play").style.display = "none";
                        console.log(songCardLeft[currentSongID].querySelector(".play"));
                    }
                    
                });
            });
            // console.log(songArray[currentSongID].href === currentAudioObject.currentSrc);
            if (songArray[currentSongID].href === currentAudioObject.currentSrc) {
                songCardLeft[currentSongID].style.backgroundColor = "#5c5c5c";
                songCardLeft[currentSongID].querySelector(".play").style.display = "none";
                console.log(songCardLeft[currentSongID].querySelector(".play"));
            }
        });
    }


    // songArray = await GetSongs("NEFFEX");
    // songNameArray = GetSongName(songArray);
    // songURLArray = GetSongURL(songArray);
    // songArray.forEach(song => {
    //     let extension = song.innerText.slice(-4, song.innerText.length);
    //     // console.log(song.innerText);
    //     addSong(songId, song.innerText.split("-")[1].replace(extension, " "), song.innerText.split("-")[0]);
    //     songId++;
    // })

    currentSongID = 0;

    closeMenuBtn.addEventListener("click", () => {
        // console.log(document.querySelector(".left-container").offsetWidth);
        document.querySelector(".left-container").style.left = ("-" + document.querySelector(".left-container").offsetWidth) + "px";
    });

    menuBtn.addEventListener("click", () => {
        document.querySelector(".left-container").style.left = 0;
    });

    repeatBtn.addEventListener("click", () => {
        repeat = !repeat;
        if (repeat)
            repeatBtn.src = repeatIconSrc;
        else
            repeatBtn.src = noRepeatIconSrc;
    });

    let isAdjustingVolume = false;

    // volumeBtn.addEventListener("click", () => {
    //     console.log(volumeBar.parentElement);
    //     // volumeBar.parentElement.classList.toggle("opacity-0");
    // });

    volumeBtn.addEventListener("mouseenter", () => {
        document.querySelector(':root').style.setProperty('--volume-scaleY', 1);
    })

    document.querySelector(".volume-div").addEventListener("mouseenter", () => {
        isAdjustingVolume = true;
        document.querySelector(':root').style.setProperty('--volume-scaleY', 1);
    })

    document.querySelector(".volume-div").addEventListener("mouseleave", () => {
        isAdjustingVolume = false;
        setTimeout(() => {
            if (!isAdjustingVolume)
                document.querySelector(':root').style.setProperty('--volume-scaleY', 0);
        }, 500);
    })

    let e1 = volumeBtn.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!isAdjustingVolume)
                document.querySelector(':root').style.setProperty('--volume-scaleY', 0);
        }, 500);
    })



    volumeBar.addEventListener("mousemove", () => {
        if (volumeBar.value == 0)
            volumeBtn.src = muteIconSrc;
        else
            volumeBtn.src = volumeIconSrc;
    });

    volumeBar.addEventListener("touchmove", () => {
        if (volumeBar.value == 0)
            volumeBtn.src = muteIconSrc;
        else
            volumeBtn.src = volumeIconSrc;
    });

    volumeBar.addEventListener("touchstart", () => {
        if (volumeBar.value == 0)
            volumeBtn.src = muteIconSrc;
        else
            volumeBtn.src = volumeIconSrc;
    });
    volumeBar.addEventListener("touchend", () => {
        if (volumeBar.value == 0)
            volumeBtn.src = muteIconSrc;
        else
            volumeBtn.src = volumeIconSrc;
    });

    prevButton.addEventListener("click", () => {
        currentSongID--;
        if (currentSongID < 0)
            currentSongID = songArray.length - 1;
        try {
            playSong(songArray[currentSongID].href);
        }
        catch (error) {
            console.error(error);
            alert("Select an album first");
        }
    });

    nextButton.addEventListener("click", () => {
        currentSongID++;
        if (currentSongID > songArray.length - 1)
            currentSongID = 0;
        try {
            playSong(songArray[currentSongID].href);
        }
        catch (error) {
            console.error(error);
            alert("Select an album first");
        }
    });


    playButton.addEventListener("click", () => {
        if (currentAudioObject.currentSrc == "") {
            try {
                playSong(songArray[currentSongID].href);
            }
            catch (error) {
                console.error(error);
                alert("Select an album first");
            }
        }
        else if (isPlaying) {
            currentAudioObject.pause();
            isPlaying = false;
            // console.log(document.getElementById("playBtn").src);
            document.getElementById("playBtn").src = playIconSrc;
            albumPhotoPlayer.classList.remove("rotateAnim");
        } else {
            currentAudioObject.play();
            isPlaying = true;
            document.getElementById("playBtn").src = pauseIconSrc;
            albumPhotoPlayer.classList.add("rotateAnim");
        }
    });

    document.body.addEventListener("keydown", event => {
        if (event.code === "Space") {
            if (currentAudioObject.currentSrc == "") {
                try {
                    playSong(songArray[currentSongID].href);
                }
                catch (error) {
                    console.error(error);
                    alert("Select an album first");
                }
            }
            else if (isPlaying) {
                currentAudioObject.pause();
                isPlaying = false;
                // console.log(document.getElementById("playBtn").src);
                document.getElementById("playBtn").src = playIconSrc;
                albumPhotoPlayer.classList.remove("rotateAnim");
            } else {
                currentAudioObject.play();
                isPlaying = true;
                document.getElementById("playBtn").src = pauseIconSrc;
                albumPhotoPlayer.classList.add("rotateAnim");
            }
        }
    });

    // songCardLeft = document.querySelectorAll(".songCard");

    // songCardLeft.forEach(e => {
    //     e.addEventListener("click", () => {
    //         currentSongID = e.id;
    //         playSong(songArray[currentSongID].href);
    //     });
    // });

}




async function GetAlbums() {
    let response = await fetch(`https://github.com/Prabin1025y/musichaven/tree/main/songs/`);
    response = await response.text();
    let newDiv = document.createElement("div");
    newDiv.innerHTML = response;
    let albums = [];
    for (const a of newDiv.getElementsByTagName("a")) {
        albums.push(a);
    }
    return albums;
}

async function GetSongs(folder) {
    let response = await fetch(`songs/${folder}`);
    response = await response.text();
    let newDiv = document.createElement("div");
    newDiv.innerHTML = response;
    let songs = [];
    for (const song of newDiv.getElementsByTagName("a")) {
        if (song.href.endsWith(".m4a") || song.href.endsWith(".mp3"))
            songs.push(song);
    }
    return songs;
}

function playSong(songURL) {
    currentAudioObject.pause();
    albumPhotoPlayer.classList.remove("rotateAnim");
    // currentAudioObject.removeEventListener("timeupdate",audioEventListener);
    isPlaying = false;
    // currentAudio.currentTime = 0; //not necessary
    currentAudioObject = new Audio(songURL);
    currentAudioObject.play();
    isPlaying = true;

    seekBar.addEventListener("mouseup", () => { currentAudioObject.currentTime = (seekBar.value * currentAudioObject.duration) / seekBar.max; isInteractingWithSeekBar = false });
    seekBar.addEventListener("mousedown", () => { currentAudioObject.currentTime = (seekBar.value * currentAudioObject.duration) / seekBar.max; isInteractingWithSeekBar = true });

    seekBar.addEventListener("touchstart", () => { currentAudioObject.currentTime = (seekBar.value * currentAudioObject.duration) / seekBar.max; isInteractingWithSeekBar = true });
    seekBar.addEventListener("touchend", () => { currentAudioObject.currentTime = (seekBar.value * currentAudioObject.duration) / seekBar.max; isInteractingWithSeekBar = false });



    currentAudioObject.addEventListener("timeupdate", () => {

        seekBar.parentElement.children[0].innerText = DisplayTime(currentAudioObject.currentTime);
        seekBar.parentElement.children[1].innerText = DisplayTime(currentAudioObject.duration);

        currentAudioObject.volume = volumeBar.value;
        if (!isInteractingWithSeekBar)
            seekBar.value = (currentAudioObject.currentTime / currentAudioObject.duration) * seekBar.max;
    });

    currentAudioObject.addEventListener("ended", () => {
        document.getElementById("playBtn").src = playIconSrc;
        isPlaying = false;
        if (repeat) {
            currentSongID++;
            if (currentSongID > songArray.length - 1)
                currentSongID = 0;
            playSong(songArray[currentSongID].href);
        }
    });

    // setInterval(() => {
    //     if (!isInteractingWithSeekBar)
    //         seekBar.value = (currentAudioObject.currentTime / currentAudioObject.duration) * seekBar.max;
    // }, 10);
    // songs/English%20Favourite/A%20Thousand%20Years%20-%20Christina%20Perri%20[%20Lyrics%20+%20Vietsub%20]%20-%20Copy.m4a
    // console.log(songArray[currentSongID].href.split(songArray[currentSongID].innerText.replaceAll(" ", "%20"))[0]);
    // console.log(currentSongID);
    songCardLeft[currentSongID].style.backgroundColor = "#5c5c5c";
    songCardLeft[currentSongID].querySelector(".play").style.display = "none";
    
    albumPhotoPlayer.style.backgroundImage = `url("${songArray[currentSongID].href.split(songArray[currentSongID].innerText.replaceAll(" ", "%20"))[0] + "album walpaper.jpeg"}")`;
    albumPhotoPlayer.classList.add("rotateAnim");
    document.getElementById("playBtn").src = pauseIconSrc;
    document.getElementById("currentSongName").innerText = songArray[currentSongID].innerText.replace(".m4a", " ").split("-")[1];
    document.getElementById("currentSongAurthor").innerText = songArray[currentSongID].innerText.replace(".m4a", " ").split("-")[0];
}

function addSong(songId, songName, authorName, imageSrc = "https://ideogram.ai/assets/image/balanced/response/dZQRueFbT5iSoqONtVahRw") {
    let newDiv = document.createElement("div");
    newDiv.classList.add("songCard", "a-center", "pointer");
    newDiv.id = songId;
    newDiv.innerHTML = `<img src="${imageSrc}" alt="songImage" class="song-image">
    <div class="info">
        <div class="songName">${songName}</div>
        <span>${authorName}</span>
    </div>
    <img class="play" src="SVG/play.svg" alt="play">`;
    songContainer.append(newDiv);
}

function addAlbum(albumName, imageSrc = "https://ideogram.ai/assets/image/balanced/response/dZQRueFbT5iSoqONtVahRw") {
    let newDiv = document.createElement("div");
    newDiv.classList.add("albumcard", "flex", "a-center", "j-center");
    // newDiv.id = songId;
    newDiv.innerHTML = `<div class="album-image flex a-center j-center">
    </div>
    <h3>${albumName}</h3>`;
    newDiv.querySelector(".album-image").style.backgroundImage = `url("${imageSrc}")`;
    document.querySelector(".album-container").append(newDiv);
    return newDiv;
}

function GetSongName(songArray) {
    let songNameArray = [];

    for (const song of songArray) {
        songNameArray.push(song.innerText.replace(".m4a", " "));
    }

    return songNameArray;
}

function GetSongURL(songArray) {
    let songURLArray = [];

    for (const song of songArray) {
        songURLArray.push(song.href);
    }

    return songURLArray;
}

function DisplayTime(sec = 0) {
    let minute = 0;
    let hour = 0;
    if (sec > 60) {
        minute = Math.floor(sec / 60);
        sec = sec % 60;
    }

    if (minute > 60) {
        hour = Math.floor(minute / 60);
        minute = minute % 60;
    }

    if (hour < 1)
        return `${minute.toString().padStart(2, "0")}:${Math.floor(sec).toString().padStart(2, "0")}`;
    else
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${Math.floor(sec).toString().padStart(2, "0")}`;
}

// console.log(GetSongs());

// GetSongName(GetSongs());
