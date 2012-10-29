 $(document).ready(function() {

   	$("#plus").click(function(){
        $(".addsitesinput").toggle();
     		$("#inputAdd").focus();
        //console.log('focus on input add');
     });

    $("#inputAdd").keyup(function(event){
      if(event.keyCode == 13){
          $("#addButton").click();
      }
    });

    function set_images () {
      var listItems = $("#siteList li");
      //console.log(listItems);
      listItems.each(function(idx, li) {
      var product = $(li);
      var data = $(this).attr('data-cookie');
      if(data === "nba.com"){
        product.attr('id', 'nba');
      }
      if(data === "espn.com"){
        product.attr('id', 'espn');
      }
      if(data === "apple.com"){
        product.attr('id', 'apple');
      }
      if(data === "engadget.com"){
        product.attr('id', 'engadget');
      }
      if(data === "nytimes.com"){
        product.attr('id', 'nyt');
      }
      if(data === "techcrunch.com"){
        product.attr('id', 'tc');
      }
      if(data === "theverge.com"){
        product.attr('id', 'theverge');
      }
      if(data === "bgr.com"){
        product.attr('id', 'bgr');
      }
      // and the rest of your code
      //console.log(product + "product in list");
      });
    }
   	function get_cookies_array() {

      var cookies = { };

      if (document.cookie && document.cookie != '') {
          var split = document.cookie.split(';');
          //console.log(split);
          for (var i = 0; i < split.length; i++) {
              var name_value = split[i].split("=-");
              //console.log("name_value " + name_value[0]);
              if(name_value[1] !== undefined){
                console.log('here');
                name_value[0] = name_value[0].replace(/^ /, '');
                cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
              }

          }
      }

      return cookies;

  }
    //console.log(get_cookies_array());

     //$.cookie("example", null);


     function buildSitesListCookies(){
     		var cookies = get_cookies_array();
        for(var name in cookies) {
          var $item = $('.site_item_first').clone();
          //console.log($item, 'item clone');
          var a = "<a href='#' class='close'></a>";
          var clear = "<div class='clear'></div>";
          //console.log($a)
          $item.html(cookies[name]);
          $item.attr('data-cookie', cookies[name] );
          $item.removeClass('hide site_item_first').addClass('site_item');
          $('#siteList').append($item);
          $item.before(a);
          $item.after(clear);
        }
     }

      $('a.close').live('click',function(e){
        //console.log("a.close");
        e.stopPropagation();
      	var data = $(this).next().attr('data-cookie');
        //console.log(data);
      	 $.cookie(data, null);
      	 $("#siteList li.site_item").remove();
         $("a.close").remove();
      	 buildSitesListCookies();
         set_images();
      });

      $('.site_item').live('click', function(){
      	var url = $(this).text();
      	//url = url.substring(2,url.length);
      	$("#theiframe").attr('src',"http://" + url);
      });

      $("#addButton").click(function(){
      	var url = $("#inputAdd").val();
        console.log(url);
      	if(url !== ""){
      		$.cookie(url, "-"+url);
      		$("#siteList li.site_item").remove();
          $("a.close").remove();
      		buildSitesListCookies();
          set_images();
          $("#inputAdd").val("");
          $("#theiframe").attr('src',"http://" + url);
      	 }
          //console.log(url);
      });

      buildSitesListCookies();
      set_images();


 });
