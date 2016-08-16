$(function(){
    var path = window.location.pathname;
    $('#login').attr('href', $('#login').attr('href') + path);
    tinyMCE.init({
          selector: "textarea.tinymce",
          toolbar: ["undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify",
          "bullist numlist outdent indent | link image hr | code"],
          plugins: "advlist,autolink,charmap,anchor,searchreplace,visualblocks,insertdatetime,media,table,contextmenu,paste,hr,spellchecker,image,link,textpattern,code",
          valid_elements : '*[*]',
          height : "480"
        });
});

function MapController(map, self){
  if($(self).hasClass("active") == false){
    $("#mapFrame").attr("src", "/Maps/html/"+map+".html");
    $("a").each(function(){$(this).removeClass("active");});
    $(self).addClass("active");
  }
}
