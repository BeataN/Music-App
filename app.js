$(document).ready(function(){
    app.init();
    appYT.init();
});

var app = {
  init : function(){
    app.searchModule.init();
  },
  searchModule : {
    init : function(){
      app.searchModule.prepareEvents();
    },
    prepareEvents : function(){
      /*$("#search-field").on("keypress", function(e){
        var songName = $("#search-field").val();
        if(e.which === 13){
          app.searchModule.getSongs(songName);
          $('#main-search').addClass('moved-to-top');
        }
      });*/

      $(".btn-search-songs").on("click", function(e){
        var songName = $("#search-field").val();
        $('#main-search').addClass('moved-to-top');
        app.searchModule.getSongs(songName);
      });
    },
    getSongs : function(songName){
      $.ajax({
          url: "https://api.spotify.com/v1/search",
          data: {
            type : 'track',
            q: songName
          },
          success: function(result){
            app.songsListModule.showSongs(result);



          },
          error: function(result){
            console.log('error=', result)
          }

        });
    }
  },

  songsListModule : {
    showSongs : function(result){
      $("#tracks-list li").remove();

      $.each(result.tracks.items, function(i,track){ //????????????????????? track/s
        console.log(track);
        var nameHtml = '<p class = "generated-song">' + track.name + '</p>';
        var imgHtml = '<img class = "track-cover" src="' + track.album.images[0].url + '"/>';
        var artistHtml = '<p class = "generated-artist">' + track.artists[0].name +  '</p>';
        var previewPlayer = '<audio controls class = "audio-play"><source src="' + track.preview_url + '" type="audio/mpeg"></audio>';
        $("#tracks-list").append('<li>' + imgHtml + '<div class="track-details">' + artistHtml +' '+ '-'+ ' '+nameHtml + previewPlayer + '</div></li>');
        $('#tracks-list').addClass('moved-to-top-ul');
    });

    }
  }
};

var appYT = {
    init : function(){
        appYT.searchModuleYouTube.init();
    },
    searchModuleYouTube : {
        init : function(){
            appYT.searchModuleYouTube.prepareEvents();
        },
        prepareEvents : function(){
            $(".btn-search-songs-yt").on("click", function(e){
                var songName = $("#search-field").val();
                $('#main-search').addClass('moved-to-top');
                appYT.searchModuleYouTube.getYouTubeSongs(songName);
            });
        },
        getYouTubeSongs : function(songName){
            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/search",
                data: {
                  part: 'snippet',
                  key: 'AIzaSyDRiHqtrdxrs9wiMPUr595ys9h6CJwFwiY',
                  q: songName
                },
                success: function(result){
                  appYT.songsListModule.showSongs(result);

                },
                error: function(result){
                  console.log('error=', result);
                }

              });
        }
    },

    songsListModule : {
      showSongs : function(result){
        $("#tracks-list li").remove();
        

        $.each(result.items, function(i,track){
          console.log(result)
          var videoHtml = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+track.id.videoId+'" frameborder="0" allowfullscreen>' + '</iframe>';
          $('#tracks-list').append('<li class="yt-list">' + videoHtml + '</li>');
          $('#tracks-list').addClass('moved-to-top-ul');
        });

      }
    }
};
