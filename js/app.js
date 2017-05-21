var nextPage;

$(".search-form").submit(function(e) {
    $("#albums").empty()
    e.preventDefault()
    var $userSearch = $("#search").val()
    const spotifyAPI = `https://api.spotify.com/v1/search`

    $.ajax({

        url: spotifyAPI,
        type: 'GET',
        dataType: 'json',
        data: {
            q: $userSearch,
            type: "album"
        },

        beforeSend: function() {
            $("#search").val("Searching...")
        },

        error: function() {
            $("#albums").append(`<li class='no-albums desc'>
              <i class='material-icons icon-help'>help_outline</i>Something went wrong. Please try again...
            </li>`)
            $("#search").val("")
        }

    }).done(function(data){
        nextPage = data.albums.next

        $("#search").val("")

        $("#albums").append(`<h3 style="color: #b0b0b0">${data.albums.total} albums found... ENJOY!`)

            $.each(data.albums.items, function(i, album) {
                var albumImg;

                if (album.images.length == 0) {
                     albumImg = "http://placeimg.com/640/640/any/sepia"
                } else {
                    albumImg = album.images[0].url
                }

                    $("#albums").append(`<li>
                        <div class="album-wrap">
                        <a href="${album.artists[0].external_urls.spotify}" target="_blank" style="color: inherit">
                        <img class="album-art" src="${albumImg}" title="Listen to Album on Spotify"></a></div>
                        <span class="album-title">${album.name}</span>
                        <span class="album-artist">${album.artists[0].name}</span>`)

                });

                if($("#albums li").length === 0) {
                    $("#albums").empty()
                    $("#albums h3").remove()
                    $("#albums").append(`<li class='no-albums desc'>
                      <i class='material-icons icon-help'>help_outline</i>No albums found that match: ${$userSearch}
                    </li>`)
                };



                    });

});
$(window).scroll(function(){
    if($("#albums li").length >= 1 ){
        if($(window).scrollTop() + $(window).height() >= $(document).height()) {
            $.get(nextPage, function(data){
                $.each(data.albums.items, function(i, album) {
                    var albumImg;
                    if (album.images.length == 0) {
                         albumImg = "http://placeimg.com/640/640/any/sepia"
                    } else {
                        albumImg = album.images[0].url
                    }
                        $("#albums").append(`<li>
                            <div class="album-wrap">
                            <a href="${album.artists[0].external_urls.spotify}" target="_blank" style="color: inherit">
                            <img class="album-art" src="${albumImg}" title="Listen to Album on Spotify"></a></div>
                            <span class="album-title">${album.name}</span>
                            <span class="album-artist">${album.artists[0].name}</span>`)

                        })
                    })
               }
           }
        })

        //click event for "details" of album.. FINISH LATER
// $(".album-id").click(function(e) {
//     var $albumID = $(this).attr("album_id");
//     var $albumArt = $(this).attr("album_art")
//     var $albumTitle = $(this).attr("album_title")
//     var $albumArtist = $(this).attr("album_artist")
//     $.get($albumID, function(data){
//          var $numOfSongs = data.total
//         console.log($albumArtist);
//     })
// });
// <a class="album-id" album_artist="${album.artists[0].name}" album_art="${albumImg}"
// album_id="https://api.spotify.com/v1/albums/${album.id}/tracks" album_title="${album.name}"
// href="#" style="color: inherit">
// <span style="text-decoration: underline">Album Details
