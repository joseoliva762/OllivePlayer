window.addEventListener("scroll", () => {
    let header = document.querySelector("header");
    let blured = document.querySelector(".blured");
    let colors = document.querySelectorAll('.color');
    let image = document.querySelector('.header__brand--logo');
    let condition = window.scrollY > (window.screen.height - 106);
    header.classList.toggle("sticky", condition);
    blured.classList.toggle("none", condition);
    condition ? changeColor(colors, "black") : changeColor(colors, "white");
    condition 
        ? changeLogo(image, "./static/images/Logos/OnlyBlackOlivaLogo.png")
        : changeLogo(image, "./static/images/Logos/OnlyWhiteOlivaLogo.png");
});

let music;
let audio = document.getElementById('player');
const changeColor = (colors, specificColor) => colors.forEach(color => color.style.color = specificColor);
const changeLogo = (image, newImage) => image.src = newImage;
const playSong = async id => {
    if(id >= music.songs.length){
        audio.pause()
    } else {
        await $('#img-album').attr('src', music.songs[id].image);
        await $('#player').attr('src', music.songs[id].song);
        audio.play();
        scheduleSong(id);
    }
}
const scheduleSong = id => {
    audio.onended = () => {
        playSong(++id);
    };
}
const generateList = (music) => {
    $.each(music.songs, (position, song) => {
        $('#playlist').append(`
            <li class="song__list--item" id="${position}">
                ${song.name}
            </li>
        `);
        $('#playlist .song__list--item').click(function() {
            let selectedSong = $(this).attr('id')
            playSong(selectedSong);
        });
    });
}
const getSongs = () => {
    // $.getJSON('app.json', response => {
    //     music = response;
    //     console.log(music);
    // });
    generateList(music);
}
const shuffle = array => {
    for (let index, tmp, position = array.length;
            position; 
            random = Math.floor(Math.random()*position), tmp = array[--position], array[position] = array[random], array[random] = tmp
    );
    return array;
}
const initPlayer = () => {
    $('#shuffle').click(function() {
        console.log(shuffle(music.songs));
        $('#playlist').empty();
        generateList(music);
        playSong(0);   
    });
}

$(document).ready(() => {
    initPlayer();
    getSongs();
});

music = {
    "songs": [
        {
            "id": 0,
            "name": "Best of You",
            "artist": "Foo Fighter",
            "song": "static/audio/BestOfYou.mp3",
            "image": "static/images/front/BestOfYou.jpg"
        },
        {
            "id": 1,
            "name": "Black",
            "artist": "Pearl Jam",
            "song": "static/audio/Black.mp3",
            "image": "static/images/front/Black.jpg"
        },
        {
            "id": 2,
            "name": "El Selenita",
            "artist": "Leon Bruno",
            "song": "static/audio/ElSelenita.mp3",
            "image": "static/images/front/ElSelenita.jpg"
        },
        {
            "id": 3,
            "name": "El Tatuaje de la Redención",
            "artist": "Leon Bruno",
            "song": "static/audio/ElTatuajedelaRedención.mp3",
            "image": "static/images/front/ElTatuajedelaRedención.jpg"
        },
        {
            "id": 4,
            "name": "The Pretender",
            "artist": "Foo Fighter",
            "song": "static/audio/ThePretender.mp3",
            "image": "static/images/front/ThePretender.jpg"
        }
    ]
}