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

   /**
    * Variáveis
    */

   var model = {
      modelo: [
         { nome: 'Padrão', nomeNormalizado: 'padrao', componente: [] }
      ]
   }

   /**
    * Eventos
    */

   var onSelectModelo = function(item) {
      console.log(item);
   }

   var onDeleteModelo = function(item) {
      modeloListContent.remove(item.nomeNormalizado);

      if ($.isNullOrEmpty(modeloListContent.val())) {
         model.modelo = [];
      } else {
         model.modelo = modeloListContent.val();
      }

   }


   /**
    * Componentes
    */
   var navBar = new $.NavBar($('#wrapper'), { selected: 'grupo' });

   var selectMenu = new $.Select($('#componente'), {
      display: ['tipo'],
      onSelect: function (item) {
         console.log(item);
      }
   });

   var modeloListContent = new $.ListContent($('#modelos'), {
      key: 'nomeNormalizado',
      display: ['nome'],
      displaySub: ['nomeNormalizado'],
      evtDisplaySub: function(item) {
         return `${item.componente.length} compoente(s)`;
      },
      onSelect: onSelectModelo,
      onDelete: onDeleteModelo
   });

   modeloListContent.val(model.modelo);

   var modeloInputGroup = Icelus.ui.InputGroup($('#modelo'), {
      text: function() {
         return $('#modelo input').textFromUrn();
      },
      onChange: function(item) {
         console.log(item);
      }
   });

   var buttonModeloAdicionar = Icelus.ui.Button($('#button-modelo-adicionar'), {
      onClick: function() {

         let modelo = modeloInputGroup.val();
         modelo.componente = [];

         if (!$.isNullOrEmpty(modelo)) {
            model.modelo.push(modelo);

            modeloListContent.val(model.modelo);
         }

      }
   })

   $.get('/api/componente', function (data) {
      selectMenu.val(data.values);
   });

   $('#tab').on('shown.bs.tab', function (event) {
      event.preventDefault();

      switch ($(event.target).data('selected')) {
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

   $('#nome').change(function () {
      var identificador = $("#nome").textFromUrn();
      $('#identificador').val(identificador);
   });

   $('#example').DataTable({

   });





   /*CKEDITOR.config.fullPage = true;
   CKEDITOR.config.allowedContent = true;

   CKEDITOR.replace('modelo', {
      height: 360,

      on: {
         instanceReady: function (evt) {

         }
      },

      // Toolbar adjustments to simplify the editor.
      toolbar: [{
         name: 'document',
         items: ['Source', '-', 'Undo', 'Redo']
      },
      {
         name: 'basicstyles',
         items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
      },
      {
         name: 'insert',
         items: ['Format']
      },
      {
         name: 'tools',
         items: ['Maximize', 'ShowBlocks']
      }
      ],
   });*/

   function save() {

   }

});
