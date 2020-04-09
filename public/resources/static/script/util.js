
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

$.fn.extend({
   textFromUrn: function() {
      var text = $(this).val();

      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
         .replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
         .replace(/\-\-+/g, '-')	// Substitui multiplos hífens por um único hífen
         .replace(/(^-+|-+$)/, '') // Remove hífens extras do final ou do inicio da string
         .toLowerCase();
   },
   textNotAccents: function(text) {
      var normalize = text;
      var regex = null;
      for (var char in globalAcentos) {
         regex = globalAcentos[char];
         normalize = normalize.replace(regex, char);
      }
      return normalize;
   }
});
