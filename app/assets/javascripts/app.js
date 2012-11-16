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

    // function checkExists(imageUrl, callback) {
    //   var img = new Image();

    //   img.onerror = function() {
    //       callback(false);
    //   };

    //   img.onload = function() {
    //       callback(true);
    //   };

    //   img.src = imageUrl;
    // }

    function switchBetweenSearchAndSites() {
        $(".google-search-container").addClass('hide');
        $(".iframe-container").removeClass('hide');
    }

    // function set_images () {
    //   var listItems = $("#siteList li");
    //   //console.log(listItems);
    //   listItems.each(function(idx, li) {
    //   var product = $(li);
    //   var data = $(this).attr('data-cookie');
    //   var url = data.substring(0,(data.length-4));

    //   checkExists('assets/'+url+'.png', function(exists) {
    //     if(exists) {
    //       product.addClass('logo_image').css("background", "url(assets/"+url+".png) no-repeat");
    //     }
    //   });
    // });
    // }
   	function get_cookies_array() {

      var cookies = { };

      if (document.cookie && document.cookie != '') {
          var split = document.cookie.split(';');
          //console.log(split);
          for (var i = 0; i < split.length; i++) {
              var name_value = split[i].split("=-");
              //console.log("name_value " + name_value[0]);
              if(name_value[1] !== undefined){
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
          var a = "<span class='close'><span></span></span>";
          var clear = "<div class='clear'></div>";
          //console.log($a)
          $item.html(cookies[name]);
          $item.attr('data-cookie', cookies[name] );
          $item.removeClass('hide site_item_first').addClass('site_item');
          $('#siteList').prepend($item);
          $item.before(a);
          $item.after(clear);
        }
     }

      $('span.close').live('click',function(e){
        //console.log("a.close");
        e.stopPropagation();
      	var data = $(this).next().attr('data-cookie');
        //console.log(data);
      	 $.cookie(data, null);
      	 $("#siteList li.site_item").remove();
         $(".close").remove();
      	 buildSitesListCookies();
      });

      $('.site_item').live('click', function(){
      	var url = $(this).text();
      	//url = url.substring(2,url.length);
        switchBetweenSearchAndSites();
        if(url == "google.com"){
          window.location.href = "/";
        }

      	$("#theiframe").attr('src',"http://" + url);
      });

      $("#addButton").click(function(){
      	var url = $("#inputAdd").val();
        if(url == "google.com"){
          $.cookie("/", "-"+"google.com");
          window.location.href = "/";
        } else if(url !== ""){
      		$.cookie(url, "-"+url);
      		$("#siteList li.site_item").remove();
          $(".close").remove();
      		buildSitesListCookies();
          $("#inputAdd").val("");
          switchBetweenSearchAndSites();
          $("#theiframe").attr('src',"http://" + url);
      	} else {
          alert("error");
        }
          //console.log(url);
      });

      buildSitesListCookies();

      // $("a.close").hover(function(){
      //   console.log($(this);
      //   //$(this).prev().css('visibility', 'visible');
      // }, function(){
      //   //$(this).prev().css('visibility', 'hidden');
      // });
      $("#gsText").keyup(function(event){
        if(event.keyCode == 13){
            $("input#gsSubmit").click();
        }
      });

      $("input#gsSubmit").click(function(e){
        e.preventDefault();
        console.log('submit...');
        var query = $("#gsText").val();
        console.log(query);
        $("#search-results").gSearch({search_text : query, count: 4});
      })

      // $("#gsSubmit").click(function(){
      //   console.log('submit...');
      //   var query = $("#gsText").val();
      //   console.log(query);
      //   $("#search-results").gSearch({search_text : val});
      // })

 });
