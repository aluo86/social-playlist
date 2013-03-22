    var thePlayer = {
      player : undefined, plItems: '', debug: true,

      init : function(plItems){
        thePlayer.plItems = plItems;
        var tag = document.createElement('script');
        tag.src = "http://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      },

      setupPlayer : function(){
        this.player = new YT.Player('player', {
          height: '200',
          width: '300',
          playerVars: { 'enablejsapi': 1, 'origin' : 'http://www.wrichards.com','autoplay': 0,'controls': 1, 'showinfo': 0, 'iv_load_policy' : 3, 'autohide' : 1, 'loop' : 1, 'rel' : 0, 'playlist' : this.plItems },
          events:{'onReady':this.onPlayerReady,'onStateChange':this.onPlayerStateChange,'onError':this.onPlayerError}
          });
      },

      onPlayerError : function(event){
        thePlayer.logEvent('error');
      },
      onPlayerReady : function(event){
        thePlayer.logEvent('ready');
      },
      onPlayerStateChange : function(event){
       thePlayer.logEvent(event.data);
      },
      logEvent : function(string) {
          console.log(">> API EVENT: "+string);
        }
    }

    function onYouTubeIframeAPIReady() {
      thePlayer.setupPlayer();
    }


$(document).ready(function() {
    $items = [];
    $("#items img").each(function(i){ $items[i] = $(this).data('yt') })
    thePlayer.init($items.join());

    $("#items a.tl, #items a.il").click(function(){
        var cindex  = thePlayer.player.getPlaylistIndex();
        var itindex = $(this).parent().index();
          if(cindex != itindex){
            thePlayer.player.playVideoAt(itindex);
          } else {
            if(thePlayer.player.getPlayerState() == 1){
              thePlayer.player.pauseVideo();
            } else {
              thePlayer.player.playVideo();
            }
          }
        return false;
    })
});