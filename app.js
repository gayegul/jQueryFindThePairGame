$(document).ready(function() {
  //get list of imgs from Instagram
  var imgs = ["./pics/IMG_2528.jpg", "./pics/IMG_2572.jpg", "./pics/IMG_3226.jpg", "./pics/IMG_3638.jpg", "./pics/IMG_5771.jpg", "./pics/IMG_3135.jpg", "./pics/IMG_5929.jpg", "./pics/IMG_5963.jpg", "./pics/IMG_5925.jpg", "./pics/IMG_5733.jpg"];
  var arrayOfBoxes = $('li').toArray();
  var numberOfClicks = 0;

  var randomBoxNumber = function() {
    return Math.floor(Math.random()* (arrayOfBoxes.length - 1));
  };

  function assignImages() {
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
      numberOfClicks++;
      var liElement = $(e.target);
      if(!liElement.is('li')) {
        return;
      }

      if(openImgNumber === 0) {
        openImgNumber++;
        handleFirstClick(liElement);
      }
      else if(openImgNumber === 1) {
        openImgNumber = 0;
        handleSecondClick(liElement);
      }
    }

    var firstLiElement;
    function handleFirstClick(liElement) {
      console.log("number of clicks " + numberOfClicks);
      firstLiElement = liElement;
      firstLiElement.find('img').show();
    }

    function handleSecondClick(liElement) {
      liElement.find('img').show();
      console.log(liElement);
      console.log(firstLiElement);

      if(liElement.find('img')[0].currentSrc !== firstLiElement.find('img')[0].currentSrc) {
        liElement.find('img').delay(800).fadeOut();
        firstLiElement.find('img').delay(800).fadeOut();
      }
      else {
        firstLiElement.off();
        liElement.off();
        firstLiElement.find('img').show();
        liElement.find('img').show();
      }
    }
  }

//reset button
//show number of clicks
//customize number of li's and don't put li's in html
//get pics from Instagram API
//find a scoreboard service to keep track of scores
  assignImages();
  var result = $('<p id="number">' + numberOfClicks + '</p>');
  var resultEl = document.createElement("p");
  $('#clickCounter').append(result);
});
