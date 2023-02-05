/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Escape text to prevent cross-site scripting
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Generate tweet element template
const createTweetElement = function(tweetObj) {
  const user = tweetObj.user;
  const $tweet = $(`
  <article class="tweet-container">
        <header>
          <div class="user-info">
          <div><img src="${user.avatars}" alt="user-pic"></div>
          <span>${user.name}</span>
          </div>
          <span class="user-handle">${user.handle}</span>
        </header>
        <div class="tweet-content">${escape(tweetObj.content.text)}</div>
        <footer>
          <div class="timeago">${timeago.format(tweetObj.created_at)}</div>
          <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
  `)
  return $tweet; 
};

//Prepends array of tweets to the tweets-container 
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $(".tweets-container").prepend(createTweetElement(tweet));
  }
};

//Ajax get request to get data json
const loadTweets = function () {
    $.get("/tweets", function(data) {
      $(".tweets-container").empty();
      renderTweets(data);
    });
};

loadTweets();

//Ajax post requests on submit 
const newTweetData = function () {
  $.ajax({
    url: "/tweets",
    method: "POST",
    data: $(".tweet-form").serialize(),
    success: () => {
      $("#tweet-text").val("");
      $(".counter").val(140);
      $(".alert").text("");
      loadTweets();
    },
    error: (error) => {
      console.error(error);
    },
  });
};

$(document).ready(function () {
$(".alert").css("display", "none");
   
//Validates tweet
$(".tweet-form").on("submit", function(event) {
event.preventDefault();

//error messages
const tweet = $("#tweet-text").val();
  if (!tweet) {
    return $(".alert").html('<i class="fa-solid fa-triangle-exclamation"></i> Empty tweet!').slideDown();
  }
  if (tweet.length > 140) {
    return $(".alert").html('<i class="fa-solid fa-triangle-exclamation"></i> Too long! Plz rspct our arbitrary limit of 140 chars.<i class="fa-solid fa-triangle-exclamation"></i> ').slideDown();
  }
  newTweetData();
  });
  
});
