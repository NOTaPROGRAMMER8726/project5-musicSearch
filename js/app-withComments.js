//empty variable to later give its value.. will be used for adding more albums on scroll
var nextPage;

//submit event for album search
$(".search-form").submit(function(e) {
    $("#albums").empty()        //empty everything in <ul> tag
    e.preventDefault()      //prevent submit default
    var $userSearch = $("#search").val()        //store users seach input
    const spotifyAPI = `https://api.spotify.com/v1/search`      //store spotify's api

//start ajax
    $.ajax({

        url: spotifyAPI,        //set url to spotifyAPI
        type: 'GET',        //type "GET"
        dataType: 'json',       //"json" data type
        data: {
            q: $userSearch,     //user's input
            type: "album"       //type album
        },

        beforeSend: function() {
            $("#search").val("Searching...")        //"searching..." text until complete
        },
        //if any errors throw msg "Something went wrong. Please try again..."
        error: function() {
            $("#albums").append(`<li class='no-albums desc'>
              <i class='material-icons icon-help'>help_outline</i>Something went wrong. Please try again...
            </li>`)
            $("#search").val("")
        }
//do something when ajax returns data
    }).done(function(data){
        nextPage = data.albums.next         //add "next" link to nextPage. This will give 20 more albums
//search back to blank
        $("#search").val("")
//text telling user how many albu were found
        $("#albums").append(`<h3 style="color: #b0b0b0">${data.albums.total} albums found... ENJOY!`)
//display albums
            $.each(data.albums.items, function(i, album) {
                var albumImg;
//if statement incase img object is empty
                if (album.images.length == 0) {
                     albumImg = "http://placeimg.com/640/640/any/sepia"
                } else {
                    albumImg = album.images[0].url
                }
//append to display the albums img, artist and album name.. (muck-up was given)
                    $("#albums").append(`<li>
                        <div class="album-wrap">
                        <a href="${album.artists[0].external_urls.spotify}" target="_blank" style="color: inherit">
                        <img class="album-art" src="${albumImg}" title="Listen to Album on Spotify"></a></div>
                        <span class="album-title">${album.name}</span>
                        <span class="album-artist">${album.artists[0].name}</span>`)

                });
//if users search returns no results..
                if($("#albums li").length === 0) {
                    $("#albums").empty()
                    $("#albums h3").remove()
                    $("#albums").append(`<li class='no-albums desc'>
                      <i class='material-icons icon-help'>help_outline</i>No albums found that match: ${$userSearch}
                    </li>`)
                };



                    });

});
//scroll function to display more albums as user scrolls to bottom of page
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
