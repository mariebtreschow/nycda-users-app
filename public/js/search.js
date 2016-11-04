$('.application-search').on('keyup', function(event) {
  console.log('Keyup is executing!');

  var $input = $(event.currentTarget);
  var query = $input.val();

    console.log('Value of my inpuuuut:');
    console.log(query);

    if (query !== "") {
    $.get('/api/search/' + query, function(body) {

      console.log(body);
      $('.application-search-results').html('');

      data.forEach(function(element){
        $('.application-search-results').append(
          $('<li>' + element.firstname + ' '
          + element.lastname + '</li>')
          );
        });
      });
  }
});
