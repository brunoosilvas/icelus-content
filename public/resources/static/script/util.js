
function highlight(element, errorClass, validClass) {
   $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
}

function unhighlight(element, errorClass, validClass) {
   $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
}

$('input').keydown( function(e) {
   var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
   if(key == 13) {
       e.preventDefault();
       var inputs = $(this).closest('form').find(':input:visible');
       inputs.eq( inputs.index(this)+ 1 ).focus();
   }
});
