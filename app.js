$(document).ready(function() {
  //get list of imgs from Instagram
  var imgs = ["./pics/IMG_2528.jpg", "./pics/IMG_2572.jpg", "./pics/IMG_3226.jpg", "./pics/IMG_3638.jpg", "./pics/IMG_5771.jpg", "./pics/IMG_3135.jpg", "./pics/IMG_5929.jpg", "./pics/IMG_5963.jpg", "./pics/IMG_5925.jpg", "./pics/IMG_5733.jpg"];

  var arrayOfBoxes = $('li').toArray();

  var randomBoxNumber = function() {
    return Math.floor(Math.random()* (arrayOfBoxes.length - 1));
  };

  function assignPic() {
    for(var i = 0; i < imgs.length; i++) {
      var counter = 1;
      while(counter < 3) {
        var currentNumber = randomBoxNumber();
        var img = $('<img>');
        img.attr('src', imgs[i]);
        $(arrayOfBoxes[currentNumber]).find('a').append(img);
        img.hide();

        $(arrayOfBoxes[currentNumber]).click(handleClick);

        var index = arrayOfBoxes.indexOf(arrayOfBoxes[currentNumber]);
        if (index > -1) {
          arrayOfBoxes.splice(index, 1);
        }
        counter++;
      }
    }

    var openImgNumber = 0;
    function handleClick(e) {
      var liElement = $(e.target);

      if(openImgNumber === 0) {
        handleFirstClick(liElement);
      }
      else if(openImgNumber === 1) {
        handleSecondClick(liElement);
      }
    }

    var firstLiElement;
    function handleFirstClick(liElement) {
      openImgNumber++;
      console.log(openImgNumber);
      firstLiElement = liElement;
      firstLiElement.find('img').show();
      if(openImgNumber === 2) {
        firstLiElement.off();
      }
    }

    function handleSecondClick(liElement) {
      openImgNumber++;
      console.log(openImgNumber);
      liElement.find('img').show();

      if(liElement.find('img')[0].currentSrc !== firstLiElement.find('img')[0].currentSrc) {
        liElement.find('img').slideDown( 300 ).delay( 300 ).fadeIn( 400 ).fadeOut();
        firstLiElement.find('img').slideDown( 300 ).delay( 300 ).fadeIn( 400 ).fadeOut();
      }
      else {
        firstLiElement.find('img').show().off();
        liElement.find('img').show().off();
      }
      openImgNumber = 0;
    }
  }

  assignPic();
});
