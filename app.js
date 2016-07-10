$(document).ready(function(){
    app.init();
});

var app = {
  init : function(){
    app.searchModule.init();
  },
  searchModule : {
    init : function(){
      app.searchModule.prepareEvents(); // app????????????????
    },
    prepareEvents : function(){
      $("#search-field").on("keypress", function(e){
        var songName = $("#search-field").val();
        if(e.which === 13){
          app.searchModule.getSongs(songName);
          $('#main-search').addClass('moved-to-top');
        }
      });

      $(".btn-search-songs").on("click", function(e){
        var songName = $("#search-field").val();
        $('#main-search').addClass('moved-to-top');
        app.searchModule.getSongs(songName);
      });
    },
    getSongs : function(songName){//?????????????
      $.ajax({
          url: "https://api.spotify.com/v1/search",
          data: {
            type : 'track', // ???????????
            q: songName //????????????????
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
      })

    }
  }
}

$(document).ready(function(){
    app.init();
});

var app = {
  init : function(){
    app.searchModule.init();
  },
  searchModule : {
    init : function(){
      app.searchModule.prepareEvents(); // app????????????????
    },
    prepareEvents : function(){
      $("#search-field").on("keypress", function(e){
        var songName = $("#search-field").val();
        if(e.which === 13){
          app.searchModule.getSongs(songName);
          $('#main-search').addClass('moved-to-top');
        }
      });

      $(".btn-search-songs").on("click", function(e){
        var songName = $("#search-field").val();
        $('#main-search').addClass('moved-to-top');
        app.searchModule.getSongs(songName);
      });
    },
    getSongs : function(songName){//?????????????
      $.ajax({
          url: "https://api.spotify.com/v1/search",
          data: {
            type : 'track', // ???????????
            q: songName //????????????????
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
      })

    }
  }
}

//you tube

//https://api.spotify.com/v1/search
//przesuniecie napisu, lista li, empty search field


/*  $(".btn-search-songs").click(function(){
    var songName = $("#search-field").val();
    app.searchModule.getSongs(songName); */
