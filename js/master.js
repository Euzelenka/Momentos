$('.carousel').carousel();

let cb = new Codebird;
cb.setProxy("https://cb-proxy.herokuapp.com/");

$(document).ready(function() {
  cb.setConsumerKey("tdBPNs1qFs95m3DFOfccAOk23", "MbzrYohbdxEgtrAXKpEafhuIiAVL9bMjAidJ1nIhspypSi7QTs");
  cb.setToken("925789691177308160-KGNn0GHOYx9gtl2VamRo4AZ8DyDHSUS", "DZO5VVDfaDkbvJIrZUBmm8lqD904oF9EF74h5dQTT6EjP");
});

$(".small-nav").hide();
$(".carousel").hide();
$(".grid").hide();
$('.controls').hide();
$('.loading').hide();

$("#tweet").click(function(event) {
  $('.loading').show();

  event.preventDefault();
  $(".index").hide();
  $(".small-nav").show();

  let params = {
    q: $("#tweet-search").val(),
    count: 100
  };

  cb.__call(
    "search_tweets",
    params,
    function (reply) {

      var photosArray = [];
      if(reply.statuses.length == 0){
        $('.nohay').html("No hay imagenes!");
      }
      else{
        for (var i = 0; i < reply.statuses.length; i++) {
          let tweet = reply.statuses[i];
          if(tweet.extended_entities && tweet.extended_entities.media[0].type == "photo") {
            let urlImg = tweet.extended_entities.media[0].media_url_https;
            
            if(!photosArray.includes(urlImg)){
              if(tweet.extended_entities.media.length > 0){
                let json = {
                  src : urlImg ,
                  likes: tweet.favorite_count
                };
                photosArray.push(json);

              }
            }
          }
        }
        for (var i = 0; i < photosArray.length; i++) {
          $('.loading').hide();
          $(".carousel").show();
          $('.d-block').css({
            "width": "900",
            "height":"550"
          });
          $('.d-block').attr('src', photosArray[0].src);
          $('.likes').html(photosArray[0].likes);
        }

        for (var i = 1; i < 6; i++) {
          $('#insert-img').append('<img id="'+i+'" src="'+photosArray[i].src+'">');
        }

      }
    },
  );
});

//icons usage
$('.fa-picture-o').click(function(event){
  event.preventDefault();
  $(".grid").hide();
  $('.carousel').show();
})

$('.fa-th').click(function(event){
  event.preventDefault();
  $(".carousel").hide();
  $('.grid').show();

  if(carousel()==0){
    $('.carousel').show();
  }
});

function carousel(){
  $(".fa-picture-o").click(function(){
    return 0;
  });
}

//controls big-image carousel
$('.big-image').mouseover(function() {
  $('.controls').show();
})

$('.big-image').mouseleave(function() {
  $('.controls').hide();
})

$('.controls').mouseover(function() {
  $('.controls').show();
})
