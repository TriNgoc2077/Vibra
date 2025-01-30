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
            //change
            buttonLike.classList.add('liked');

            const icon = buttonLike.querySelector('i');
            icon.classList.remove('fa-thin');
            icon.classList.add('fa-solid');

            const span = buttonLike.querySelector('span');
            const quantity = parseInt(span.textContent.split(' ')[0]);
            span.textContent = `${quantity + 1} Liked`;
            
            //fetch
            fetch(`/songs/like/${id}`, option)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
        } else {
            buttonLike.classList.remove('liked');

            const icon = buttonLike.querySelector('i');
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-thin');

            const span = buttonLike.querySelector('span');
            const quantity = parseInt(span.textContent.split(' ')[0]);
            span.textContent = `${quantity - 1} Like`;

            fetch(`/songs/dislike/${id}`, option);
        }
    });
}