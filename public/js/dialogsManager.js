var functionDialogs = function () {
	var handleDialogs = function() { 
		$(".confirm_dialog" ).dialog({ //muestra un dialog de confirmacion
            dialogClass: 'ui-dialog-yellow',
            autoOpen: false,
            resizable: false,
            height: 'auto',
            modal: true,
            stack:true,
            onShown: function(tour) {
              $('.ui-widget-overlay').zIndex(1201);
              $('.ui-front').zIndex(1201);
              $('.ui-dialog').zIndex(1202);
              $('.ui-widget').zIndex(1202);
              $('.ui-widget-content').zIndex(1202);
              $('.ui-corner-all').zIndex(1202);
              $('.ui-dialog-yellow').zIndex(1202);
              $('.ui-draggable').zIndex(1202);
              $('.ui-dialog-buttons').zIndex(1202);
              $('.ui-resizable').zIndex(1202);
            },
            buttons: [
                {
                    'class' : 'btn',
                    "text" : "Cancelar",
                    'id' : 'pp_confirm_cancel_btn',
                    click: function() {
                        $(this).dialog( "close" );
                    }
                },
                {
                    'class' : 'btn blue',
                    "text" : "Aceptar",
                    'id' : 'pp_confirm_accept_btn',
                    click: function() {
                        $(this).dialog( "close" );
                    }
                }
            ]
        });
//------------------
		$( ".error_dialog" ).dialog({
           autoOpen: false,
           dialogClass: 'ui-dialog-red',
           show: {
                effect: "blind",
               duration: 500
            },
           hide: {
               effect: "explode",
               duration: 500
            }
        });

//----------------------
		$( ".correct_dialog" ).dialog({ //Listener que muestra los popUp de Correcto
            autoOpen: false,
            dialogClass: 'ui-dialog-green',
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });
	};

   return {
       	init: function () {
       		handleDialogs();       		
   		}
	};
}();

function fnOpenConfirmDialog2(msn){
    $("#confirm_message").html(msn);
    $(".confirm_dialog").dialog("open");//llama a un modal de confirm
}

function fnOpenConfirmDialog(msn){
    fnCleanSmallModal();
    $('#smallModal').modal();
    $('#smallModal').on('shown.bs.modal', function () {
      $('#smallModalText').focus()
    })
    $('#smallModalText').text(msn);
    $('#smallModalText').css('font-size', "18px");
    $('#smallModalLabel').text('Warning');
    $('#smallModalLabel').css('color', '#FFFFFF');
    $('#smallModalHeader').css('background-color', '#C93026');
    $('#smallModalFooter').addClass('modal-footer');
    $('#smallModalFooter').html('<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-danger" data-dismiss="modal" id="deleteButtonX">Delete</button>');
    var new_margin = Math.ceil(($(window).height() - $('#smallModalContent').height()) / 2);
    new_margin = new_margin - 80;
    $('#smallModalContent').css('margin-top', new_margin + 'px');
}

function fnOpenErrorDialog(msg){
  new PNotify({
    title: 'Error',
    text: ''+msg+'',
    type: 'error',
    hide: false
  });
}

function fnOpenErrorDialog2(msn){
    $("#error_message").html(msn); // coloca el mensaje recibido
    $(".error_dialog").dialog("open"); //abre el dialogo con el mensaje
}

function fnOpenErrorDialog3(msn){
    fnCleanSmallModal();
    $('#smallModal').modal();
    $('#smallModal').on('shown.bs.modal', function () {
      $('#smallModalText').focus()
    })
    $('#smallModalText').text(msn);
    $('#smallModalText').css('font-size', "18px");
    $('#smallModalLabel').text('Error');
    $('#smallModalLabel').css('color', '#FFFFFF');
    $('#smallModalHeader').css('background-color', '#C93026');
    var new_margin = Math.ceil(($(window).height() - $('#smallModalContent').height()) / 2);
    new_margin = new_margin - 80;
    $('#smallModalContent').css('margin-top', new_margin + 'px');
}

function fnOpenCorrectDialog2(msn){
    $("#correct_message").html(msn);
    $(".correct_dialog").dialog("open"); //si se actualiza correctamente muestra un mensaje
}

function fnOpenCorrectDialog(msn){
    fnCleanSmallModal();
    $('#smallModal').modal();
    $('#smallModal').on('shown.bs.modal', function () {
      $('#smallModalText').focus()
    })
    $('#smallModalText').text(msn);
    $('#smallModalText').css('font-size', "18px");
    $('#smallModalLabel').text('Info');
    $('#smallModalLabel').css('color', '#FFFFFF');
    $('#smallModalHeader').css('background-color', '#55A92C');
    var new_margin = Math.ceil(($(window).height() - $('#smallModalContent').height()) / 2);
    new_margin = new_margin - 80;
    $('#smallModalContent').css('margin-top', new_margin + 'px');
}

function fnCleanSmallModal(){
    $('#smallModalText').html('');
    $('smallModalLabel').html('');
    $('#smallModalFooter').removeClass('modal-footer');
    $('#smallModalBody').css('background-color', '#FFFFFF');
    $('#smallModalFooter').css('background-color', '#FFFFFF');
    $('#smallModalFooter').html('');
}

/*fnOpenConfirmDialog('<span class="icon icon-warning-sign"></span> Seguro que desea Eliminarla ?');
   $('#pp_confirm_accept_btn').attr({ onClick:"javascript:fnDelete();" });*/