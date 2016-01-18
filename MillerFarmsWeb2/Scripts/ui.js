$(function(){
	$(".form-group").each(function(){
		if(($(this).children().length) > 2){
			$(this).addClass('full-width')	;
		};
	})
});