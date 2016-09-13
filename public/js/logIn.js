var functionLogin = function () {
	var handleValidations4 = function() {
		var message = "Do not leave this space blank.";
		var message2 = "Enter a valid e-mail.";
		
       $('#logInForm').validate({
           errorElement: 'label', //default input error message container
           errorClass: 'help-inline', // default input error message class
           focusInvalid: false, // do not focus the last invalid input
           ignore: "",
           rules: {
                email: { required: true, email: true },
                password: { required: true },
           },

           messages: { // en caso de error estos son los mensajes que se muestran
                email: { required: message, email: message2 },
                password: { required: message },
           },

           invalidHandler: function (event, validator) { /*display error alert on form submit*/ },

           highlight: function (element) { // hightlight error inputs
               $(element).closest('.control-group').addClass('error'); // set error class to the control group
           },

           success: function (label) {
               label.closest('.control-group').removeClass('error');
               label.remove();
           },

           errorPlacement: function (error, element) {
               if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                   error.addClass('errorForm help-small no-left-padding').insertAfter($('#register_tnc_error'));
               } else if (element.closest('.input-icon').size() === 1) {
                   error.addClass('errorForm help-small no-left-padding').insertAfter(element.closest('.input-icon'));
               } else {
                   error.addClass('errorForm help-small no-left-padding').insertAfter(element);
               }
           },

           submitHandler: function (form) {
               form.submit();
           }
       });

       $('#logInForm input').keypress(function (e) { //valida en caso de presionar enter y que falte algun campo de digitar
           if (e.which == 13) {
           		e.stopPropagation();
               	if ($('#logInForm').validate().form()) {
					       fnLogInUser();
               	}
               return false;
           }
       });
	};

   return {
       init: function () {
       		handleValidations4();
          $('#logInButton').click(function(){
            logInUser();
          });
		   }
    };
}(); 

function logInUser(){
  if($('#logInForm').valid()) {
    fnLogInUser();
  }
}

function fnLogInUser(){
  $.ajax({
    type: "POST",
    url: "/login",
    data: $('#logInForm').serialize(),
    async:true,
    beforeSend: function() {
      $('#loadingModal').modal('show');
    }
  }).done(function(data) {
      if (data.user){
        location.reload();
      } else {
        alert('You are not authorized as an Administrator!');
      }
  }).fail(function(data) {
    console.log(data);
    alert(data.responseJSON.message);
  }).always(function(data) {
    $('#loadingModal').modal('hide');
  });
}