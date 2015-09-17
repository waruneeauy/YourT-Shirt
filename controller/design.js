function colors(code,view){
	$('#shirt-position').css('background-image', 'url(../shirt/'+view+'-'+code+'.png)');
	$('#code').val(code);
}


function changeview(view){
	$('#view').val(view);
	colors($('#code').val(),$('#view').val());
	if(view=='front'){
		$('.view-click-front').hide();
		$('.view-click-back').show();
	}else if(view=='back'){
		$('.view-click-front').show();
		$('.view-click-back').hide();
	}
}