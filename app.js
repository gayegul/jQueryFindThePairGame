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
        $(img).hide();
        var index = arrayOfBoxes.indexOf(arrayOfBoxes[currentNumber]);
        if (index > -1) {
          arrayOfBoxes.splice(index, 1);
        }
        counter++;
      }
    }
  }

  assignPic();
});
