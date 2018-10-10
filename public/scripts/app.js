/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
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
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


const createTweetElement = (tweetObj) => {
  const tweetDate = tweetObj.created_at
  const currentDate = new Date().getTime()
  const secondsInDay = 86400000
  const daysAgo = Math.floor((currentDate - tweetDate) / secondsInDay)

  const $tweet = $('<article>').addClass('tweet')
  const $header = $('<header>')
  const $floatFix = $('<div>').addClass('float-fix').html(`<img src="${tweetObj.user.avatars.small}">`)
  const $name = $('<h1>').text(tweetObj.user.name)
  const $userHandle = $('<div>').addClass('user-handle').text(tweetObj.user.handle)
  const $tweetContent = $('<section>').text(tweetObj.content.text)
  const $footer = $('<footer>')
  const $date = $('<span>').addClass('date-track').text(`${daysAgo} days ago`)
  const $icons = $('<span>').addClass('select-icons').text('icons')

  $tweet.append($header)
  $header.append($floatFix)
  $floatFix.append($name)
  $floatFix.append($userHandle)
  $tweet.append($tweetContent)
  $tweet.append($footer)
  $footer.append($date)
  $footer.append($icons)

  return $tweet
}

const renderTweets = (arr) => {
  arr.forEach(function(obj) {
    $('#tweets-container').append(createTweetElement(obj))
  })
}

renderTweets(data)