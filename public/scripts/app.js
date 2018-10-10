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
  const image = `<img src="${tweetObj.user.avatars.small}">`

  const $tweet = $('<article>').addClass('tweet')

  // Header structure
  const $header = $('<header>')
  const $floatFix = $('<div>').addClass('float-fix')
  const $name = $('<h1>').text(tweetObj.user.name)
  const $userHandle = $('<div>').addClass('user-handle').text(tweetObj.user.handle)

  //Tweet content structure
  const $tweetContent = $('<section>').text(tweetObj.content.text)

  //Footer structure
  const $footer = $('<footer>')
  const $date = $('<span>').addClass('date-track').text(`${daysAgo} days ago`)
  const $icons = $('<span>').addClass('select-icons').text('icons')


  $tweet.append($header, $tweetContent, $footer)
  $header.append($floatFix)
  $floatFix.append(image, $name, $userHandle)
  $footer.append($date, $icons)

  return $tweet
}

const renderTweets = (arr) => {
  arr.forEach(function(tweet) {
    $('#tweets-container').append(createTweetElement(tweet))
  })
}

renderTweets(data)