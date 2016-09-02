$(document).ready(function() {
    //alert("document ready occurred!");

	var funContent= $('.fun-body > p').text();
	var sharpIndex=funContent.indexOf('#');
	var targetFunContent='';
	var tempFunContent=funContent;
	while(sharpIndex!=-1){
		targetFunContent=targetFunContent+tempFunContent.substring(0,sharpIndex)+'<strong>#';
		tempFunContent=tempFunContent.substring(sharpIndex+1,tempFunContent.length);
		sharpIndex=tempFunContent.indexOf('#');
		targetFunContent=targetFunContent+tempFunContent.substring(0,sharpIndex+1)+'</strong>';
		tempFunContent=tempFunContent.substring(sharpIndex+1,tempFunContent.length);
		sharpIndex=tempFunContent.indexOf('#');
	}
	$('.fun-body > p').html(targetFunContent);
});
