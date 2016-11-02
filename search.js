$('#searchFor').keyup(function() {
 $get('/search-navbar', function(req, res) {
   console.log('Searching in navbar!');
 });
});
