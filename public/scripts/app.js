$(() => {

  const createTweetElement = ({user: {avatars, handle, name}, content: {text}, created_at}) => {

    const tweetDate = moment(created_at)
    const currentDate = moment()
    const daysAgo = tweetDate.from(currentDate)
    const image = `<img src="${avatars.small}">`

    // DOM structure begins here
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
    const $date = $('<span>').addClass('date-track').text(daysAgo)
    const $flag = $('<i>').addClass('fas fa-flag select-icons')
    const $retweet = $('<i>').addClass('fas fa-retweet select-icons')
    const $heart = $('<i>').addClass('fas fa-heart select-icons')

    $tweet.append($header, $tweetContent, $footer)
    $header.append($floatFix)
    $floatFix.append(image, $name, $userHandle)
    $footer.append($date, $flag, $retweet, $heart)

    return $tweet
  }

  const renderTweets = (arr) => {
    const $container = $('#tweets-container')
    arr.forEach(function(tweet) {
      $container.prepend(createTweetElement(tweet))
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

    const $errorMessage = $('.error-value')
    const $textAreaValue = $(this).find('textarea').val()
    const data = $(this).serialize()

    if ($errorMessage.is(':visible')) {
      $errorMessage.slideUp(100)
    }

    if ($textAreaValue === '') {
      $errorMessage.slideDown(400, () => {
        $errorMessage.text('You must hum about something!')
      })
    } else if ($textAreaValue.length > 140) {
      $errorMessage.slideDown(400, () => {
        $errorMessage.text('You are humming about too much!')
      })
    } else {
      //For the below, I didn't like the fact that .empty() would cause a quick flash even though
      //the page didn't refresh. I decided to do the below in order for it to look more seamless.
      //I imagine it would not work if order of the tweets change, in which case I would have gone
      //with a different approach. A better way would probably be just emptying the tweet container
      //in the render tweets function instead of here.
      $.ajax('/tweets', { method: 'POST', data }).then(() => {
        $.ajax('/tweets').then((arr) => {
          $('#tweets-container').prepend(createTweetElement(arr[arr.length - 1]))
        })
      })

      $(this).find('textarea').val('')
      $(this).find('span').text(140)
    }
  })

  $('#compose-button').on('click', (event) => {
    $('.new-tweet').slideToggle(400, function() {
      $(this).find('textarea').focus()
    })
  })

})