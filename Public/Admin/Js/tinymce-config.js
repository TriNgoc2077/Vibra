tinymce.init({
    selector: 'textarea.textarea-mce',
    plugins: 'advlist link image list',
    entity_encoding: 'raw',
    images_upload_url: '/admin/upload',
    automatic_uploads: true,
  });