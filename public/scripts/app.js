/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const createTweetElement = (tweetObj) => {
  const tweet = $('<article>').addClass('tweet')
  let convertDate = new Date(tweetObj.created_at)

  const header = $('<header>')
  const floatFix = $('<div>').addClass('float-fix').html("<img src=" + tweetObj.user.avatars.small + ">")
  const name = $('<h1>').text(tweetObj.user.name)
  const userHandle = $('<div>').addClass('user-handle').text(tweetObj.user.handle)
  const tweetContent = $('<section>').text(tweetObj.content.text)
  const footer = $('<footer>')
  const date = $('<span>').addClass('date-track').text(tweetObj.created_at)
  const icons = $('<span>').addClass('select-icons').text('hi')

  tweet.append(header)
  header.append(floatFix)
  floatFix.append(name)
  floatFix.append(userHandle)
  tweet.append(tweetContent)
  tweet.append(footer)
  date.appendTo(footer)
  icons.appendTo(footer)

  return tweet
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make su