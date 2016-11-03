$('.like-button').on('click', function() {
  $.post('/likes', function(data) {

    $('.like-button').text('Like this app: ' + data.likeCount)
  });
});
