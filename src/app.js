$(() => {
    API.getPhotos().then(list);

    const $imageList = $('#imageList');
    const $imageTemplate = $('#imageTemplate').html();

    function list(image) {
        $imageList.html(image.map(generateImageHTML).join('\n'));
    }
    
    function generateImageHTML(image) {
        console.log('Image');
        return $imageTemplate
        .replace('{{id}}', image.id)
        .replace('{{title}}', image.title)
        .replace('{{url}}', image.url)
        .replace('{{thumbnailUrl}}', image.thumbnailUrl);
    }

    $('a[data-imagelightbox="demo"]').imageLightbox({
        selector:      'a[data-imagelightbox]',
        id:            'imagelightbox',
        allowedTypes:  'png|jpg|jpeg|gif',
        animationSpeed: 250,
        activity:      false,
        arrows:        false,
        button:        false,
        caption:       false,
        enableKeyboard:true,
        lockBody:      false,
        navigation:    false,
        overlay:       false,
        preloadNext:   true,
        quitOnEnd:     false,
        quitOnImgClick:false,
        quitOnDocClick:true,
        quitOnEscKey:  true
    });
});
