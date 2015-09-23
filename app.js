$(document).ready(function() {
  //var imgs = ["./pics/IMG_2528.jpg", "./pics/IMG_2572.jpg", "./pics/IMG_3226.jpg", "./pics/IMG_3638.jpg", "./pics/IMG_5771.jpg", "./pics/IMG_3135.jpg", "./pics/IMG_5929.jpg", "./pics/IMG_5963.jpg", "./pics/IMG_5925.jpg", "./pics/IMG_5733.jpg"];
  var imgs = [];

  function getInstaImages() {
    //$('button').off();
    $('#search').keyup(function(e) {
      if(e.which == 13) {
        var search;
        search = $('#search').val();
        $('search').submit();
        $.ajax({
          type: "GET",
          dataType: "jsonp",
          cache: false,
          url: "https://api.instagram.com/v1/tags/" + search + "/media/recent?client_id=1b04a24609a04cecbef8dc4aac619e96",
          success: function(data) {
            for (var i = 0; i < 10; i++) {
              //$("#picBoxes").append("<li><a target='_blank' href='" + data.data[i].link + "'><img src='" + data.data[i].images.low_resolution.url + "'></img></a></li>");
              imgs.push(data.data[i].images.low_resolution.url);
            }
            console.log(imgs);
          }
        });
      }
    });
  }

  var numberOfClicks = 0;

  function assignImages() {
    getInstaImages();
    $('ul').empty();
    numberOfClicks = 0;
    $('#clickNum').html(numberOfClicks);
    var arrayOfBoxes = [];

    for(var i = 0; i < 20; i++) {
      var li = $('<li>');
      var a = $('<a href="#">');
      li.append(a);
      arrayOfBoxes.push(li);
      $('ul').append(li);
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
        img.css({"height": "40px", "width": "70px", "margin": "none"});
        $(arrayOfBoxes[currentNumber]).find('a').append(img);
        //img.hide();
        $(arrayOfBoxes[currentNumber]).click(handleClick);
        var index = arrayOfBoxes.indexOf(arrayOfBoxes[currentNumber]);
        if (index > -1) {
          arrayOfBoxes.splice(index, 1);
        }
        counter++;
      }
    }
  }
    var openImgNumber = 0;
    function handleClick(e) {
      numberOfClicks++;
      $('#clickNum').html(numberOfClicks);

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
        firstLiElement.find('img').show();
        liElement.find('img').show();
      }
    }

    $('button').on('click', function() {
        assignImages();
    });

//find a scoreboard service to keep track of scores
  assignImages();
});
