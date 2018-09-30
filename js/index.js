$(document).ready(function(){
	function gundong(){
	     var liH = $(".ui-inform>ul>li>a").height();
	     var gunH = 0;
//	     console.log(liH);
	     $(".ui-inform>ul").append($(".ui-inform>ul>li").eq(0).clone());
	     setInterval(function() {
	         gunH += liH;
//	         console.log(gunH);
	         $(".ui-inform>ul").animate({
	             marginTop: -gunH + "px"
	         }, 500);
	         if (gunH >= ($(".ui-inform>ul>li>a").length) * 30) {
	             gunH = 0;
	             $(".ui-inform>ul").animate({
	                 marginTop: gunH + "px"
	             },1);
	         }
	     }, 2000);
	 }
	 gundong();
})

 