//APlayer
const aplayer = document.querySelector('#aplayer');
if (aplayer) {
    let dataSong = aplayer.getAttribute('data-song');
    dataSong = JSON.parse(dataSong);
    let dataSinger = aplayer.getAttribute('data-singer');
    dataSinger = JSON.parse(dataSinger);
    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
            
        }],
        autoplay: true,
        volume: 1.0
    });
    // ap.on('ended', function...);
}
//like
const buttonLike = document.querySelector('[button-like]');
if (buttonLike) {
    const option = {
        method: 'PATCH'
    }
    buttonLike.addEventListener('click', () => {
        const id = buttonLike.getAttribute('button-like');
        if (!buttonLike.classList.contains('liked')) {
            
            //fetch
            fetch(`/songs/like/like/${id}`, option)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        //change
                        buttonLike.classList.add('liked');

                        const icon = buttonLike.querySelector('i');
                        icon.classList.remove('fa-thin');
                        icon.classList.add('fa-solid');

                        const span = buttonLike.querySelector('span');
                        const quantity = parseInt(span.textContent.split(' ')[0]);
                        span.textContent = `${quantity + 1} Liked`;
                    }
                });
        } else {
            fetch(`/songs/like/dislike/${id}`, option)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        buttonLike.classList.remove('liked');

                        const icon = buttonLike.querySelector('i');
                        icon.classList.remove('fa-solid');
                        icon.classList.add('fa-thin');
            
                        const span = buttonLike.querySelector('span');
                        const quantity = parseInt(span.textContent.split(' ')[0]);
                        span.textContent = `${quantity - 1} Like`;
                    }
                });
        }
    });
}

//favorite
const buttonFavorite = document.querySelector('[button-favorite]');
if (buttonFavorite) {
    const option = {
        method: 'PATCH'
    }
    buttonFavorite.addEventListener('click', () => {
        const id = buttonFavorite.getAttribute('button-favorite');
        if (!buttonFavorite.classList.contains('favorited')) {
            //fetch
            fetch(`/songs/favorite/favorite/${id}`, option)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        //change
                        buttonFavorite.classList.add('favorited');

                        const icon = buttonFavorite.querySelector('i');
                        icon.classList.remove('fa-regular');
                        icon.classList.add('fa-solid');

                        const span = buttonFavorite.querySelector('span');
                        span.textContent = `Added to favorites`;
                    }
                });
        } else {
            //fetch
            fetch(`/songs/favorite/unfavorite/${id}`, option)
                .then(res => res.json())
                .then(data => {
                    if (data.code === 200) {
                        buttonFavorite.classList.remove('favorited');

                        const icon = buttonFavorite.querySelector('i');
                        icon.classList.remove('fa-solid');
                        icon.classList.add('fa-regular');
            
                        const span = buttonFavorite.querySelector('span');
                        span.textContent = `Add to favorites`;
                    }
                });
        }
    });
}

//login
const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target); //e.target is form, because arrow func cause 'e' to point to window
        const data = Object.fromEntries(formData);
        try {
            fetch('/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch(error) {
            console.log(error);
        }
    });
}