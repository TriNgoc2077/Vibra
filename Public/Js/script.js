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
    ap.on('ended', function () {
        const option = {
            method: "PATCH"
        };
        const link = `/songs/listens/${dataSong._id}`;
        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    const listens = document.querySelector('.listens span');
                    listens.innerHTML = `${data.listens} listens`;
                }
            });
    });
}
//toast
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.className = 'toast-message';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
//like
const buttonLike = document.querySelector('[button-like]');
if (buttonLike) {
    const option = {
        method: 'PATCH',
        credentials: 'include',
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
                        icon.classList.remove('fa-regular');
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
                        icon.classList.add('fa-regular');
            
                        const span = buttonLike.querySelector('span');
                        const quantity = parseInt(span.textContent.split(' ')[0]);
                        span.textContent = `${quantity - 1} Like`;
                    }
                });
        }
    });
}

//favorite
const buttonFavorite = document.querySelectorAll('[button-favorite]');
console.log(buttonFavorite);
if (buttonFavorite) {
    const option = {
        method: 'PATCH'
    }
    for (let button of buttonFavorite) {
        button.addEventListener('click', () => {
            console.log("click");
            const id = button.getAttribute('button-favorite');
            if (!button.classList.contains('favorited')) {
                //fetch
                fetch(`/songs/favorite/favorite/${id}`, option)
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            //change
                            button.classList.add('favorited');
    
                            const icon = button.querySelector('i');
                            icon.classList.remove('fa-regular');
                            icon.classList.add('fa-solid');
    
                            const span = button.querySelector('span');
                            span.textContent = `Added to favorites`;
                        }
                    });
            } else {
                //fetch
                fetch(`/songs/favorite/unfavorite/${id}`, option)
                    .then(res => res.json())
                    .then(data => {
                        if (data.code === 200) {
                            button.classList.remove('favorited');
    
                            const icon = button.querySelector('i');
                            icon.classList.remove('fa-solid');
                            icon.classList.add('fa-regular');
                
                            const span = button.querySelector('span');
                            span.textContent = `Add to favorites`;
                        }
                    });
            }
        });
    }
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
            })
            //  else {
            //     fetch('/user/verify', {
            //         method: 'POST',
            //         headers: { 'Content-Type': 'application/json' },
            //         body: JSON.stringify(data)
            //     })
            //         .then(res => res.json())
            //         .then(data => {
            //             if (data.code === 200) {
            //                 window.location.href = '/user/verify';
            //             }
            //         });
            // }

        } catch(error) {
            console.log(error);
        }
    });
}

// show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]")
    
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}
// end show alert

//search suggest 
const boxSearch = document.querySelector('.box-search');
if (boxSearch) {
    const inputSearch = boxSearch.querySelector("input[name='keyword']");
    const boxSuggest = boxSearch.querySelector('.inner-suggest');
    inputSearch.addEventListener('keyup', (e) => {
        const keyword = inputSearch.value;

        if (keyword) {
            const link = `/search/suggest?keyword=${keyword}`;
            fetch(link)
                .then(res => res.json())
                .then(data => {
                    const songs = data.songs;
                    if (songs.length) {
                        boxSuggest.classList.add('show');
                        const htmls = songs.map(song => {
                            return `
                                <a class="inner-item" href="/songs/detail/${song.slug}">
                                    <div class="inner-image">   
                                        <img src=${song.avatar} alt="avatar song"></div>
                                    <div class="inner-info">
                                        <div class="inner-title">${song.title}</div>
                                        <div class="inner-singer"> <i class="fa-solid fa-microphone-lines"></i>${song.infoSinger.fullName}</div>
                                    </div>
                                </a>`;
                        });
                        const boxList = boxSuggest.querySelector('.inner-list');
                        boxList.innerHTML = htmls.join("");
                    } else {
                    }
    
                });
        } else {
            if (boxSuggest.classList.contains('show')) {
                boxSuggest.classList.remove('show');
            }
        }
    });
    inputSearch.addEventListener('blur', (e) => {
        if (boxSuggest.classList.contains('show')) {
            boxSuggest.classList.remove('show');
        }
    });
    inputSearch.addEventListener('focus', (e) => {
        if (inputSearch.valie != '' && !boxSuggest.classList.contains('show')) {
            boxSuggest.classList.add('show');
        }
    });
}