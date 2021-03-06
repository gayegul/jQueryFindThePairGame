$(document).ready(function() {
  var imgs = [];
  $('#search').keyup(function(e) {
    if(e.which == 13) {
      var search;
      var key1 = '1b04a24609';
      var key2 = 'a04cecbef8';
      var key3 = 'dc4aac619e96';
      search = $('#search').val();
      $.ajax({
        type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/tags/" + search + "/media/recent?client_id=" + key1 + key2 + key3,
        success: function(data) {
          imgs = [];
          for (var i = 0; i < 10; i++) {
            imgs.push(data.data[i].images.low_resolution.url);
          }
          assignImages();
        }
      });
    }
  });

  var numberOfClicks = 0;

  function assignImages() {
    $('#clickCounter').removeClass('hidden');
    $('#reset').removeClass('hidden');
    $('#search').hide();
    $('#pickTheme').hide();
    $('#search').val('');
    numberOfClicks = 0;
    $('#clickNum').html(numberOfClicks);
    var arrayOfBoxes = [];

    for(var i = 0; i < 20; i++) {
      var li = $('<li>');
      arrayOfBoxes.push(li);
      $('#picBoxes').append(li);
    }

    var randomBoxNumber = function() {
      return Math.floor(Math.random() * (arrayOfBoxes.length - 1));
    };

    for(var j = 0; j < imgs.length; j++) {
      var counter = 1;
      while(counter < 3) {
        var currentNumber = randomBoxNumber();
        var img = $('<img>');
        img.attr('src', imgs[j]);
        $(arrayOfBoxes[currentNumber]).append(img);
        img.hide();
        $(arrayOfBoxes[currentNumber]).click(handleClick);
        arrayOfBoxes.splice(currentNumber, 1);
        counter++;
      }
    }
  }

  var openImgNumber = 0;
  function handleClick(e) {
    numberOfClicks++;
    $('#clickNum').html(numberOfClicks);

    var liElement = $(e.target);

    // do nothing if clicked item is not li (when it is the img)
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
    firstLiElement = liElement;
    firstLiElement.find('img').show();
  }

  function handleSecondClick(liElement) {
    liElement.find('img').show();

    if(liElement.find('img')[0].currentSrc !== firstLiElement.find('img')[0].currentSrc) {
      liElement.find('img').delay(800).fadeOut();
      firstLiElement.find('img').delay(800).fadeOut();
    }
    else {
      firstLiElement.off();
      liElement.off();
    }
  }

  $('#reset').on('click', function() {
      $('#search').show();
      $('#reset').addClass('hidden');
      $('#clickCounter').addClass('hidden');
      $('#picBoxes').empty();
  });

//TO DO List
//what happens after game ends?
//find a scoreboard service to keep track of scores
});
