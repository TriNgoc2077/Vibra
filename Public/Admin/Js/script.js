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

// Preview image upload
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    
    uploadImageInput.addEventListener("change", e => {
        console.log(e);
        const [file] = e.target.files;
        if (file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
// End preview image upload
// play audio upload
const uploadAudio = document.querySelector("[upload-audio]");
if (uploadAudio){
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
    const source = uploadAudio.querySelector('source');

    uploadAudioInput.addEventListener("change", e => {
        if (e.target.files.length) {
            uploadAudioPlay.classList.remove('d-none');
            uploadAudioPlay.classList.add('d-flex');
            const audio = URL.createObjectURL(e.target.files[0]);
            source.src = audio;
            uploadAudioPlay.load();
        }
    });
}
// End pplay audio upload