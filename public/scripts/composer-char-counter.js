$(document).ready(function() {

  $('.new-tweet form textarea').on('keyup', function(event) {
    let counter = 140 - ($(this).val().length)
    const counterNode = $(this).parent('form').children('span')

    counterNode.text(counter)

    if (counterNode.text() < 0) {
      counterNode.addClass('invalid-text')
    } else if (counterNode.hasClass('invalid-text')) {
      counterNode.removeClass('invalid-text')
    }
  })

  // $('#tweet-container article').on('mouseout', function(event) {
  //   $('.tweet').removeClass('tweet-lightup')
  //   $('.tweet').addClass('tweet-dim')
  // })

  // $('#tweet-container article').on('mouseover', function(event) {
  //   $('.tweet').addClass('tweet-lightup')
  // })
}) // End of document ready