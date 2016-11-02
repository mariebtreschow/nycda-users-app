$('.like-button').on('click', function() {
  $.post('/likes', function(data) {
    console.log('Post request is working for like-button!');
    $('.like-button').text(JSON.parse(data).likes)
  });
});
