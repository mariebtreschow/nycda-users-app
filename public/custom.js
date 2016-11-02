$('.like-button').on('click', function() {
  $.post('/likes', function(data) {
    console.log('Post request is working');
    $('.like-button').text(JSON.parse(data).likes)
  });
});
