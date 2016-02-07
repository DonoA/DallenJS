$(function(){
    var path = window.location.pathname;
    $('#login').attr('href', $('#login').attr('href') + path);
});

function MapController(map, self){
  if($(self).hasClass("active") == false){
    $("#mapFrame").attr("src", "/Maps/html/"+map+".html");
    $("a").each(function(){$(this).toggleClass("active");});
  }
}
