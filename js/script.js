
$(document).ready(function () {

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });
});

// SCROLL to ID
$("a[href^='#']").click(function (e) {
  e.preventDefault();

  var position = $($(this).attr("href")).offset().top;

  $("body, html").animate({
    scrollTop: position
  } /* speed */);
});


function myResume() {
  $('#data-googlesheet').html('');

  $.ajax({
      url: 'http://omdbapi.com',
      type: 'get',
      dataType: 'json',
      data: {
          'apikey': 'dca61bcc'
      },
      success: function (result) {
          if (result.Response == "True") {
              let movies = result.Search;

              $.each(movies, function (i, data) {
                  $('#movie-list').append(`
                      <div class="col-md-4">
                          <div class="card mb-3">
                              <img src="${data.Poster}" class="card-img-top" alt="...">
                              <div class="card-body">
                              <h5 class="card-title">${data.Title}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                              <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                              </div>
                          </div>
                      </div>
                  `);
              });

              $('#search-input').val('');

          } else {
              $('#movie-list').html(`
                  <div class="col">
                      <h1 class="text-center">` + result.Error + `</h1>
                  </div>
              `)
          }
      }
  });
}