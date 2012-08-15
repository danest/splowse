// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

 $(document).ready(function() {

 	$("#plus").click(function(){
   		console.log('click');
   		$(".addsitesinput").toggle();
   });

 	function get_cookies_array() {

    var cookies = { };

    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 2; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }

    return cookies;
   
}

   $.cookie("example", "foo");

   function buildSitesListCookies(){
   			var cookies = get_cookies_array();
   			var li_list = "";
			for(var name in cookies) {
  			 li_list +="<li class='site_item' data-cookie='"+ cookies[name]+ "' >" + name  + "</li>";
		}
		return li_list;
   }
    $("#siteList").append(buildSitesListCookies());
    

 });
