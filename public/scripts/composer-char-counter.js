$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    const tweetCharsLeft = 140 - $(this).val().length;
    const tweetCounter = $(this).siblings("div").children(".counter");
    tweetCounter.text(tweetCharsLeft);

    if (tweetCharsLeft < 0) {
      $(".counter").css({
        "color": "#FF0000"
      });
    } else {
      $(".counter").css({
        "color":" #545149"
      });
    }
  });
});