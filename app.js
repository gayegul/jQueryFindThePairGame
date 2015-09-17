$(document).ready(function() {
  //get list of imgs from Instagram
  var imgs = ["url('./pics/IMG_2528.jpg')", "url('./pics/IMG_2572.jpg')", "url('./pics/IMG_3226.jpg')", "url('./pics/IMG_3638.jpg')", "url('./pics/IMG_5771.jpg')", "url('./pics/IMG_3135.jpg')", "url('./pics/IMG_5929.jpg')", "url('./pics/IMG_5963.jpg')", "url('./pics/IMG_5925.jpg')", "url('./pics/IMG_5733.jpg')"];

  var randomBoxNumber = Math.floor(Math.random()* ($('li').length - 1) + 1);
  console.log(randomBoxNumber);

  function assignPic() {
    for(var i = 0; i < imgs.length; i++) {
      if(isBoxEmpty(randomBoxNumber)) {
        if(!imgs[i].usedNumber) {
          $(':nth-child(' + randomBoxNumber + ')').css({content: imgs[i]});
          jQuery.data(imgs[i], "usedNumber", 1);
          console.log(imgs[i].usedNumber);
          break;
        }
        else if(imgs[i].usedNumber == 1) {
          $(':nth-child(' + randomBoxNumber + ')').css({content: imgs[i]});
          jQuery.data(imgs[i], "usedNumber", 2);
          console.log(imgs[i].usedNumber);
          break;
        }
      }
    }
  }

  function isBoxEmpty(n) {
    if($(':nth-child(' + n + ')').has()) {
      return true;
    }
    return false;
  }

  assignPic();
});
