$(document).ready(function () {
   /*var form = $("#grupo");
   if (form) {

      //form.enterAsTab({ 'allowSubmit': true});

      form.validate({
         errorElement: 'div',
         errorElementClass: 'is-invalid',
         validClass: 'is-valid',
         errorClass: 'invalid-feedback',
         highlight: function(element, errorClass, validClass) {
            $(element).removeClass(validClass);
            $(element).addClass(this.settings.errorElementClass).removeClass(errorClass);
         },
         unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(this.settings.errorElementClass).removeClass(errorClass);
            $(element).addClass(validClass);
         },
         onkeyup: false,
         errorPlacement: function(error, element) { error.insertAfter(element); },
         rules: {
            codigoInep: {
               required: true,
               maxlength: 6
            },
            nome: {
               required: true,
               maxlength: 100
            },
            sigla: {
               required: true,
               maxlength: 5
            },
            nacionalidade: {
               required: true,
               maxlength: 100
            }
         },
         messages: {
            codigoInep: {
               required: 'Por favor informe o código',
               maxlength: 'O código não pode ter mais que ${0} caracteres'
            },
            nome: {
               required: 'Por favor informe o nome',
               maxlength: 'O nome não pode ter mais que ${0} caracteres'
            },
            sigla: {
               required: 'Por favor informe a sigla',
               maxlength: 'A sigla não pode ter mais que ${0} caracteres'
            },
            nacionalidade: {
               required: 'Por favor informe a nacionalidade',
               maxlength: 'A nacionalidade não pode ter mais que ${0} caracteres'
            }
         }
      })
   }*/

   $('#tab').on('shown.bs.tab', function(event) {
      event.preventDefault();

      switch($(event.target).data('selected')) {
         case 'principal-tab':
            console.log('principal');
            break;
         case 'modelo-tab':
            console.log('modelo');
            break;
         default:
            break;
      }

   });

   $('#modelo').ckeditor();

   $('#nome').change(function() {
      var identificador = $("#nome").textFromUrn();
      $('#identificador').val(identificador);
   });

});

function save() {
   /*var validForm = $("#paises").valid();
   if (validForm) {

      var data = $("#paises").serializeJSON();
      console.log(data);

      $.ajax({
         type: "POST",
         url: "/api/paises/save",
         data: data,
         success: function(response) {
            console.log(response);
         }
       });
   }*/
}
