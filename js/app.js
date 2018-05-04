function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 25,
            order: "rating",
            publishedAfter: "2015-02-01T00:00:00Z"
       }); 
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            var request2= gapi.client.youtube.videos.list({
              part: "recordingDetails",
              id: item.id.videoId,
            });
            request2.execute(function(response2) {
             $.each(response2.result.items,function(index,item1) {
               if(item1.recordingDetails && item1.recordingDetails.location!=undefined){
                   $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data,[{"title":item.snippet.title,"videoid":item.id.videoId}])+"Nombre del Canal: "+item.snippet.channelTitle+"<br>"+"Descripcion del video: "+item.snippet.description+"<br>"+"Url:"+item.snippet.thumbnails.url+"<br>"+"Latitud: "+item1.recordingDetails.location.latitude+"<br>"+"Longitud: "+item1.recordingDetails.location.longitude);
               mostrarMapa(item1.recordingDetails.location.latitude,item1.recordingDetails.location.longitude,mapa);
            });
               }
               else{
                  $.get("tpl/item.html", function(data) {
                $("#results").append(tplawesome(data,[{"title":item.snippet.title,"videoid":item.id.videoId}])+"Nombre del Canal: "+item.snippet.channelTitle+"<br>"+"Descripcion del video: "+item.snippet.description);
            });
               }
             });
            });
          
          });
          resetVideoHeight();
       });
    });
    
    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey(" AIzaSyC_4V6LZfegYjclcCl5j8DFNV3OP6e_rU4");
    gapi.client.load("youtube", "v3", function() {
 
    });
}
function mostrarMapa(latitud, longitud, mapa) {
  var coordenadas = {lat: latitud, lng: longitud};
  var mapa = new google.maps.Map(document.getElementById('mapa'), {
    zoom: 20,
    center: coordenadas
  });
  var marcador = new google.maps.Marker({
    position: coordenadas,
    map: mapa
  });
  console.log(latitud);
  console.log(longitud);
  console.log(mapa);
}