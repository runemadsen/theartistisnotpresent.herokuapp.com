$(function() {

  // load JSON
  $.getJSON( "/files", function(data) {
    
    $.each(data.contents, function(index, content) {
      
      var path_split = content.path.split("/")
      var path_name = path_split[path_split.length-1];
      var name_split = path_name.split("-");
      
      $('<figure><img src="'+window.endpoint+'/'+path_name+'" type="image/svg+xml" /><figcaption>Generation <span class="highlight">'+name_split[0]+'</span> Work <span class="highlight">'+name_split[1]+'</span> '+name_split[2]+'/'+name_split[3]+'/'+name_split[4]+' '+name_split[5]+':'+name_split[6]+'</figcaption></figure>').appendTo(".container");

    });

  });

});