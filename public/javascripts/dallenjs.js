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

        // We can attach the `fileselect` event to all file inputs on the page
        $(document).on('change', ':file', function() {
          var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
          input.trigger('fileselect', [numFiles, label]);
        });

        // We can watch for our custom `fileselect` event like this
        $(document).ready( function() {
            $(':file').on('fileselect', function(event, numFiles, label) {

                var input = $(this).parents('.input-group').find(':text'),
                    log = numFiles > 1 ? numFiles + ' files selected' : label;

                if( input.length ) {
                    input.val(log);
                } else {
                    if( log ) alert(log);
                }

            });
        });
});

function MapController(map, self){
  if($(self).hasClass("active") == false){
    $("#mapFrame").attr("src", "/Maps/html/"+map+".html");
    $("a").each(function(){$(this).removeClass("active");});
    $(self).addClass("active");
  }
}
