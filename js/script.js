searchMovie = () => {
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'a0f46869',
            's': $('#search-input').val()
        },
        success: function(data) {
            if (data.Response == "True") {
                
                let movies = data.Search;

                $.each(movies, function(i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                    <div class="card mb-3" >
                    <img src=${data.Poster} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                        <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal"  data-id="`+ data.imdbID  +`">Detail</a>
                    </div>
                    </div>
                   </div>
                    `);
                });

                $('#search-input').val('');


            } else {
                $('#movie-list').html(`
                <div class = "col">
                <h1 class="text-center">${data.Error}</h1>
                </div>`);
            }
        }
    });
};






$('#search-button').on('click', function() {
    searchMovie();
});




$('#search-input').on('keyup', function(e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
});



$('#movie-list').on('click', '.see-detail' , function() {
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'a0f46869',
            'i': $(this).data('id')
        },
        success: function(data) {
            if (data.Response === "True") {
                

                $('.modal-body').html(`
                
                <div class="container-fluid">
                <div class="row">
                <div class="col-md-4">
                
                <img src="`+ data.Poster  +`" class="img-fluid">
                </div>
                <div class="col-md-8">
                <ul class="list-group">
                
                <li class="list-group-item"> ${data.Title}  </li>
                <li class="list-group-item">Release: ${data.Year}  </li>
                <li class="list-group-item">Rating: ${data.Rated}  </li>
                <li class="list-group-item">Genre: ${data.Genre}  </li>
                <li class="list-group-item">Actor: ${data.Actors}  </li>
                <li class="list-group-item">Director ${data.Director}  </li>
                
                </ul>
                
                </div>
                </div>
                </div>
                
                `)


            }
        }
    });
});