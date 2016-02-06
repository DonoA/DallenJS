function MapController(map, self){
  if($(self).hasClass("active") == false){
    $("#mapFrame").attr("src", "/Maps/html/"+map+".html");
    $("a").each(function(){$(this).toggleClass("active");});
  }
}
