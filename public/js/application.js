var app = {

  time_template : _.template('<%= year %>/<%= month %>/<%= day %> <%= hour %>:<%= minute %>'),

  svg_template : _.template('<figure><a href="<%= link %>"><img src="<%= endpoint %>/<%= imgsrc %>" type="image/svg+xml" /></a><figcaption><%= label %></figcaption></figure>'),

  render_root : function()
  {
    var t = this;

    $.getJSON( "/files", function(data) {
      
      $.each(data.contents, function(index, content) {
        
        var full_path = content.path.split("/");
        var folder_name = full_path[full_path.length-1];
        var folder_split = folder_name.split("_");

        var time_object = {
          year : folder_split[0],
          month : folder_split[1],
          day : folder_split[2],
          hour : folder_split[3],
          minute : folder_split[4],
          second : folder_split[5]
        };

        var link = "/run/" + folder_name;
        
        $(t.svg_template({
          endpoint : window.js_data.endpoint,
          imgsrc : folder_name + "/latest.svg",
          link : link,
          label : "Artwork generated " + t.time_template(time_object) + ". <a href='"+link+"'>Click to see process</span>."
        })).appendTo(".container");

      });
  
    });
  },

  render_run : function(folder)
  {    
    var t = this;

    $.getJSON( "/files/"+folder, function(data) {
      
      $.each(data.contents, function(index, content) {
        
        var full_path = content.path.split("/");
        var svg_file = full_path[full_path.length-1];
        if(svg_file == "latest.svg") return;

        var svg_split = svg_file.split("-");
        var generationNum = svg_split[0];
        var num = svg_split[1].split(".")[0];

        var template_object = {
          endpoint : window.js_data.endpoint,
          imgsrc : folder + "/" + svg_file,
          label : "Generation <span class='highlight'>"+generationNum+"</span> Number <span class='highlight'>"+num+"</span>",
          link : window.js_data.endpoint + "/" + folder + "/" + svg_file
        }

        var link = "/run/" + svg_file;
        
        $(t.svg_template(template_object)).appendTo(".container");

      });
  
    });

  }

};