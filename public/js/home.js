var homeFunctions = function () {
	return {
		init: function ( basket, minimumValue, appId, jsKey, serverUrl ) {
			scroll_up(1000);
			$("#logOutBtn").click(function(e){
				fnLogOutUser();
			});
		}
	}
}();

function scroll_up(speed){
	$("html, body").animate({
		scrollTop: 0
	}, speed);
}

function commaSeparateNumber(val){
	while (/(\d+)(\d{3})/.test(val.toString())){
		val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	}
	return val;
}

function fnLogOutUser(){
  $.ajax({
    type: "POST",
    url: "/logout",
    async:true,
    beforeSend: function() {
      $('#loadingModal').modal('show');
    }
  }).done(function(data) {
        location.reload();
  }).fail(function(data) {
    console.log(data);
    alert(data.responseJSON.message);
  }).always(function(data) {
    $('#loadingModal').modal('hide');
  });
}