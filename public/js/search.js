
$('#searchFor').keyup(function() {
  console.log('Keyup is executing!');

  $(".application-search input").on('keyup', function() {
    var query = $(this).val();

    console.log('Value of my inpuuuut:');
    console.log(query);

    $.get('/api/search/' + query, function(data) {
      console.log(data);
      $('.search-users').html('');
      data.forEach(function(element){
        $('.search-users').append(
          $('<li>' + element.firstname + ' ' + element.lastname + '</li>')
        );
      });
    });
  });
});
