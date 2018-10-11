/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  const createTweetElement = ({user: {avatars, handle, name}, content: {text}, created_at}) => {

    const tweetDate = created_at
    const currentDate = new Date().getTime()
    const secondsInDay = 86400000
    const daysAgo = Math.floor((currentDate - tweetDate) / secondsInDay)
    const image = `<img src="${avatars.small}">`

    const $tweet = $('<article>').addClass('tweet')

    // Header structure
    const $header = $('<header>')
    const $floatFix = $('<div>').addClass('float-fix')
    const $name = $('<h1>').text(name)
    const $userHandle = $('<div>').addClass('user-handle').text(handle)

    //Tweet content structure
    const $tweetContent = $('<section>').text(text)

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
    const container = $('#tweets-container')
    arr.forEach(function(tweet) {
      container.prepend(createTweetElement(tweet))
    })
  }

  const loadTweets = () => {
    $.ajax('/tweets').then((arr) => {
      renderTweets(arr)
    })
  }

  //Initially, error message elements are hidden
  $('.error-value').hide()

  //Initial call to load up existing tweets
  loadTweets()


  //Function for submitting and displaying new tweet
  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault()

    const errorMessage = $('.error-value')
    const textAreaValue = $(this).find('textarea').val()
    const data = $(this).serialize()

    if (textAreaValue === '') {
      if (errorMessage) {
        errorMessage.slideUp()
      }
      errorMessage.slideDown().text('You must hum about something!')
    } else if (textAreaValue.length > 140) {
      if (errorMessage) {
        errorMessage.slideUp()
      }
      errorMessage.slideDown().text('You are humming about too much!')
    } else {
      if (errorMessage) {
        errorMessage.slideUp()
      }
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
      $(this).find('textarea').focus()
    })
  })




}) // End of document ready