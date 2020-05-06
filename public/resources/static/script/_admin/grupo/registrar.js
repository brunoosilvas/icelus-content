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

   var formModelo = $('#form-modelo');
   formModelo.validate({
      errorElement: 'div',
      errorElementClass: 'is-invalid',
      validClass: 'is-valid',
      errorClass: 'invalid-feedback',
      highlight: highlight,
      unhighlight: unhighlightNone,
      errorPlacement: function(error, element) { },
      rules: {
         nomeModelo: {
            required: true,
            maxlength: 30
         }
      },
      keyup: true
   });

   var formModeloComponente = $('#form-modelo-componente');
   formModeloComponente.validate({
      errorElement: 'div',
      errorElementClass: 'is-invalid',
      validClass: 'is-valid',
      errorClass: 'invalid-feedback',
      highlight: highlight,
      unhighlight: unhighlightNone,
      errorPlacement: function(error, element) { },
      rules: {
         componente: {
            required: true
         },
         nomeComponente: {
            required: true,
            maxlength: 30
         }
      },
      keyup: true
   });

   var model = {
      modelo: [
         { nome: 'Padrão', nomeNormalizado: 'padrao', componente: [] }
      ]
   };

   var modeloSelecionado = null;

   // Events

   var onClickModeloAdicionar = function(evt) {
      if (formModelo.valid()) {
         let modelo = { };

         modelo.nome = $('#nome-modelo').val();
         modelo.nomeNormalizado = $('#nome-modelo').textFromUrn();
         modelo.componente = [];

         listModelo.add(modelo);

         $('#nome-modelo').val(STR_EMPTY)
      }
   }

   var resetFormModeloComponente = function() {
      $('#componente').val(STR_EMPTY);
      $('#nome-componente').val(STR_EMPTY);

      badgeModeloComponente.val(modeloSelecionado.componente);
   }

   var onSelectModelo = function(item) {
      modeloSelecionado = listModelo.selected();
      resetFormModeloComponente();
   }

   var onDeleteModelo = function(item) {
      listModelo.remove(item.nomeNormalizado);
   }

   var onClickComponenteAdicionar = function() {

      if (formModeloComponente.valid()) {

         let modeloComponente = { };
         modeloComponente.nome = $('#nome-componente').val();
         modeloComponente.nomeNormalizado = $('#nome-componente').textFromUrn();
         modeloComponente.componente = selComponente.val();

         badgeModeloComponente.add(modeloComponente);

         modeloSelecionado.componente = badgeModeloComponente.val();

         listModelo.refresh(modeloSelecionado);

         resetFormModeloComponente();
      }

   }

   var onDeleteModeloComponente = function(item) {
      badgeModeloComponente.remove(item.nomeNormalizado);
      modeloSelecionado.componente = badgeModeloComponente.val();

      listModelo.refresh(modeloSelecionado);
   }

   // Componentes

   icelus.ui.NavBar($('#wrapper'), { selected: 'grupo' });

   var btnModeloAdicionar = icelus.ui.Button($('#btn-modelo-adicionar'), {
      onClick: onClickModeloAdicionar
   });

   var listModelo = icelus.ui.ListContent($('#modelos'), {
      key: 'nomeNormalizado',
      display: ['nome'],
      displaySub: ['nomeNormalizado'],
      fncDisplaySub: function(item) {
         return `${item?.componente?.length ?? '0'} compoente(s)`;
      },
      onSelect: onSelectModelo,
      onDelete: onDeleteModelo
   });

   var selComponente = icelus.ui.Select($('#componente'), {
      display: ['tipo'],
      onSelect: function (item) {

      }
   });


   var btnComponenteAdicionar = icelus.ui.Button($('#btn-modelo-componente-add'), {
      onClick: onClickComponenteAdicionar
   });

   var badgeModeloComponente = icelus.ui.Badge($('#modelo-componente'), {
      key: 'nomeNormalizado',
      display: ['nomeNormalizado'],
      displaySub: ['componente.tipo'],
      onDelete: onDeleteModeloComponente
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

   listModelo.val(model.modelo);




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
