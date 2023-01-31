/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    }

const createTweetElement = function(tweetObj) {
  let $tweet = $(`
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
          <span>${tweetObj.created_at}</span>
          <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
  `)
  return $tweet;
}


const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $("#tweets-container").append($tweetElement);
    }
    return;
  }


$(document).ready(function () {
  renderTweets(data);
});
