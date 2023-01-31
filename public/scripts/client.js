/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetObj) {
  const $tweet = $(`
  <article class="tweet-container">
        <header>
          <div class="user-info">
          <div><img src="${tweetObj.user.avatars}" alt="user-pic"></div>
          <span>DizzySloth</span>
          </div>
          <span class="user-handle">${tweetObj.user.handle}</span>
        </header>
        <div class="tweet-content">${tweetObj.content.text}</div>
        <footer>
          <div class="timeago" datetime="2016-06-30 09:20:00>${tweetObj.created_at}</div>
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


const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $(".tweets-container").append(tweetElement);
    }
    return;
};

const postTweets = function () {
    $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(".tweet-form").serialize(),
        dataType: "json",
        success: (data) => {
            console.log(data);
        },
        error: (error) => {
            console.error(error);
        }
    });
};

const loadTweets = function () {
    $.ajax({
        url: "/tweets",
        method: "GET",
        dataType: "json",
        success: (data) => {
            console.log(data);
        },
        error: (error) => {
            console.error(error);
        }
    });
};

$(document).ready(function () {
    renderTweets(data);
    loadTweets();
  $(".tweet-form").on("submit", function(event) {
    event.preventDefault();
    postTweets();
  }) 
});
