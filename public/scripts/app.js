/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

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
      $('#tweets-container').prepend(createTweetElement(tweet))
    })
  }

  const loadTweets = () => {
    $.ajax('/tweets').then((arr) => {
      renderTweets(arr)
    })
  }

  //Initial call to load up existing tweets
  loadTweets()


  //Function for submitting and displaying new tweet
  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault()

    const textAreaValue = $(this).find('textarea').val()
    const data = $(event.target).serialize()

    if (textAreaValue === '') {
      alert('You must hum about something!')
    } else if (textAreaValue.length > 140) {
      alert('You are humming too much at once!')
    } else {
      //For the below, I didn't like the fact that .empty() would cause a quick flash even though
      //the page didn't refresh. I decided to do the below in order for it to look more seamless.
      //I imagine it would not work if order of the tweets change, in which case I would have gone with a different approach.
      $.ajax('/tweets', { method: 'POST', data }).then(() => {
        $.ajax('/tweets').then((arr) => {
          $('#tweets-container').prepend(createTweetElement(arr[arr.length - 1]))
        })
      })
    }
  })

  $('#compose-button').on('click', (event) => {
    $('.new-tweet').slideToggle(400, function() {
      $('.new-tweet form textarea').focus()
    })
  })


}) // End of document ready