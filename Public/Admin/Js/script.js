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