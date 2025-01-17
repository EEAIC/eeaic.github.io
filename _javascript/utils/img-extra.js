/**
  Lazy load images (https://github.com/ApoorvSaxena/lozad.js)
  and popup when clicked (https://github.com/dimsemenov/Magnific-Popup)
*/

$(function() {

  const IMG_SCOPE = '#main > div.row:first-child > div:first-child';

  if ($(`${IMG_SCOPE} img`).length <= 0 ) {
    return;
  }

  /* lazy loading */

  const imgList = document.querySelectorAll(`${IMG_SCOPE} img[data-src]`);
  const observer = lozad(imgList);
  observer.observe();

  /* popup */

  $(`${IMG_SCOPE} p > img[data-src],${IMG_SCOPE} img[data-src].preview-img`).each(
    function() {
      const src = $(this).attr('data-src'); // created by lozad.js

      $(this).wrap(`<a href="${src}" class="popup"></a>`);
    }
  );

  $('.popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    showCloseBtn: false,
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out'
    },
    image : {
      titleSrc: function(item) {
          let nextTag = $(item.el).next();
          const title = nextTag.prop('tagName') === 'EM' ? nextTag.html() : '';
          return title;
        }
    }
  });

  /* markup the image links */

  $(`${IMG_SCOPE} a`).has('img').addClass('img-link');

});
