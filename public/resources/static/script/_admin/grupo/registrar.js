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

   var model = {
      modelo: [
         { nome: 'Padrão', nomeNormalizado: 'padrao', componente: [] }
      ]
   };

   var modeloSelected = null;

   // Events

   var onClickModeloAdicionar = function() {
      let modelo = { };
      modelo.nome = $('#modelo').val();
      modelo.nomeNormalizado = $('#modelo').textFromUrn();
      modelo.componente = [];

      if (!$.isNullOrEmpty(modelo)) {
         modeloListContent.add(modelo);
      }
   }

   var onSelectModelo = function(item) {
      let selected = modeloListContent.selected();
      console.log(selected);
   }

   var onDeleteModelo = function(item) {
      console.log(item);
      modeloListContent.remove(item.nomeNormalizado);
   }

   // Componentes

   icelus.ui.NavBar($('#wrapper'), { selected: 'grupo' });

   var igModelo = icelus.ui.InputGroup($('#ig-modelo'), {
      text: function() {
         return $('#ig-modelo input').textFromUrn();
      },
      onChange: function(item) {

      }
   });

   var btnModeloAdicionar = icelus.ui.Button($('#btn-modelo-adicionar'), {
      onClick: onClickModeloAdicionar
   });
   console.log(btnModeloAdicionar);

   var modeloListContent = icelus.ui.ListContent($('#modelos'), {
      key: 'nomeNormalizado',
      display: ['nome'],
      displaySub: ['nomeNormalizado'],
      fncDisplaySub: function(item) {
         return `${item?.componente?.length} compoente(s)`;
      },
      onSelect: onSelectModelo,
      onDelete: onDeleteModelo
   });

   var selComponente = icelus.ui.Select($('#componente'), {
      display: ['tipo'],
      onSelect: function (item) {

      }
   });

   var igNomeComponente = icelus.ui.InputGroup($('#ig-nome-componente'), {
      text: function() {
         console.log($('#ig-nome-componente input').textFromUrn());
         return $('#ig-nome-componente input').textFromUrn();
      },
      onChange: function(item) {

      }
   });

   var btnComponenteAdicionar = icelus.ui.Button($('#btn-modelo-componente-add'), {
      onClick: function(e) {


      }
   });

   var badgeModeloComponente = icelus.ui.Badge($('#modelo-componente'), {
      key: 'nomeNormalizado',
      display: ['nomeNormalizado'],
      onSelect: function(item) {

      },
      onDelete: function(item) {
         badgeModeloComponente.remove(item.nomeNormalizado);
      }
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

   // Init

   $.get('/api/componente', function (data) {
      selComponente.val(data.values);
   });

   modeloListContent.val(model.modelo);




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

});
