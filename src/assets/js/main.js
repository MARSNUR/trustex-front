(function () {

  // Blocks
  let sliderELem = document.querySelector('.slider');

  if (sliderELem) {
    let newssSlider = tns({
      "container": "#news",
      "nav": false,
      "controlsContainer": '#newsArrows',
      "items": 1,
      "center": true,
      "slideBy": 3,
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 600,
      "edgePadding": 40,
      "gutter": 40,
      "responsive": {
        "768": {
          "items": 2,
          "center": false,
        },
        "992": {
          "items": 3,
        }
      },
    });


    let partnersSlider = tns({
      "container": "#partners",
      "nav": false,
      "controlsContainer": '#partnersArrows',
      "items": 1,
      "center": true,
      "slideBy": 3,
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 600,
      "edgePadding": 40,
      "gutter": 40,
      "responsive": {
        "768": {
          "items": 2,
          "center": false
        },
        "992": {
          "items": 3,
        }
      },
    });
  }

  // Scripts used on all pages
  (function() {

    console.log('0.0')

  })();

})();