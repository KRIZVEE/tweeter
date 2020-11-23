/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $('.error-message').hide();

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      let newlyTweet = createTweetElement(tweet)
      console.log('on line 12 : ',newlyTweet);
      $('.tweet-container').append(newlyTweet);
    }
  }

  const escape = function (str) {

    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;

  }

  const createTweetElement = function (tweet) {

    const safeHTML = `<p>${escape(tweet.content.text)}</p>`;
    const unixTimestamp = Date(tweet.created_at);
    const milliseconds = unixTimestamp.toString();
    let $tweet = $(`
                      <article class="tweet"><header><div class="header-left">
                      <img src=${tweet.user.avatars}><span>${tweet.user.name}</span>
                      </div><div class="header-right"><span>${tweet.user.handle}</span>
                      </div></header>${safeHTML}<hr><footer><div class="footer-left">
                      <span>${milliseconds}</span></div><div class="footer-right"><i class="fas fa-flag"></i>
                      <i class="fas fa-sync"></i><i class="fas fa-heart"></i></div></footer></article>
                  `)
    return $tweet;
  }
  $('form').submit(function (e) {
    console.log('Button clicked, performing ajax call...');
    e.preventDefault();
    console.log($('form').serialize());
    if ($('#tweet-text').val() === '' || $('#tweet-text').val === null) {
      $('.error-message').slideDown();
      $('.error-message strong').text("Tweet is empty !")
      setTimeout(() => {
        $('.error-message').slideUp();
      }, 2000);
    }
    if ($('#tweet-text').val().length > 140) {
      $('.error-message').slideDown()
      $('.error-message strong').text("Your tweet exceeds the maximum characters!");
      setTimeout(() => {
        $('.error-message').slideUp();
      }, 2000);
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $('form').serialize()
    }).then(() => {
      $('.tweet-container').empty()
      $('#tweet-text').val('');
      loadTweets();
    });
  });
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then((data) => {
        renderTweets(data);
      });
  }

});