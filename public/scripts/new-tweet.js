$(() => {

  $('.new-tweet form').on('submit', (event) => {
    event.preventDefault()

    let data = $(event.target).serialize()

    $.ajax('/tweets', { method: 'POST', data: data }).then(() => {
      console.log('Tweet submitted')
    })

  })

}) // End of document ready