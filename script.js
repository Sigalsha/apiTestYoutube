var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var fetch = function () {
    return $.ajax({
        method: 'GET',
        url: createUrl(),
    })
    .then((data) => {
        console.log(data.items[0].id.videoId);
        var my_video_id = data.items[0].id.videoId;

        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: my_video_id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

    })
    .catch((error)=>{
        if (error) throw error;
        console.log(error);
        $('.result').html('It seems that something is not working...Try refreshing the page');
    })
};

var createUrl = function() {
    var exerciseType = $('.input').val();
    var baseUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=relevance&q=10+minutes+';
    var endUrl = '&type=video&videoCategoryId=17&videoDuration=medium&videoEmbeddable=true&videoType=any&key=AIzaSyA0xbusuINEtRr8PBIreJwSR8XbiQZ7ZaM';
    var newUrl = baseUrl + exerciseType + endUrl;
    return newUrl;
};

$('.btn').on('click', function () {
    fetch();
});

// $('.btn').off();

var player;
function onYouTubeIframeAPIReady() {
    // $('.btn').on()
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {

}