$(document).ready(function () {

   $('form').submit(function (e) {
      e.preventDefault();
   });

   var formModelo = $('#form-modelo');
   formModelo.validate({
      errorElement: 'div',
      errorElementClass: 'is-invalid',
      validClass: 'is-valid',
      errorClass: 'invalid-feedback',
      highlight: highlight,
      unhighlight: unhighlightNone,
      errorPlacement: function (error, element) { },
      rules: {
         nomeModelo: {
            required: true,
            maxlength: 30
         }
      },
      keyup: false
   });

   var formModeloComponente = $('#form-modelo-componente');
   formModeloComponente.validate({
      errorElement: 'div',
      errorElementClass: 'is-invalid',
      validClass: 'is-valid',
      errorClass: 'invalid-feedback',
      highlight: highlight,
      unhighlight: unhighlightNone,
      errorPlacement: function (error, element) { },
      rules: {
         componente: {
            required: true
         },
         nomeComponente: {
            required: true,
            maxlength: 30
         }
      },
      keyup: false
   });

   var model = {
      modelo: [
         { nome: 'Padrão', nomeNormalizado: 'padrao', componente: [] }
      ]
   };

   var modeloSelecionado = null;

   // Events

   var onClickModeloAdicionar = function (evt) {
      if (formModelo.valid()) {
         let modelo = {};

         modelo.nome = $('#nome-modelo').val();
         modelo.nomeNormalizado = $('#nome-modelo').textFromUrn();
         modelo.componente = [];

         listModelo.add(modelo);

         $('#nome-modelo').val(STR_EMPTY)
      }
   }

   var resetFormModeloComponente = function () {
      $('#componente').val(STR_EMPTY);
      $('#nome-componente').val(STR_EMPTY);

      badgeModeloComponente.val(modeloSelecionado.componente);
   };

   var refreshBtnContruirModelo = function () {
      if (modeloSelecionado) {
         if (modeloSelecionado.componente && modeloSelecionado.componente.length > 0) {
            btnContruirModelo.enable();
         } else {
            btnContruirModelo.disable();
         }
      }
   };

   var onSelectModelo = function (item) {
      modeloSelecionado = listModelo.selected();

      resetFormModeloComponente();

      refreshBtnContruirModelo();
   };

   var onDeleteModelo = function (item) {
      listModelo.remove(item.nomeNormalizado);
   };

   var onClickComponenteAdicionar = function () {

      if (formModeloComponente.valid()) {

         let modeloComponente = {};
         modeloComponente.nome = $('#nome-componente').val();
         modeloComponente.nomeNormalizado = $('#nome-componente').textFromUrn();
         modeloComponente.componente = selComponente.val();

         badgeModeloComponente.add(modeloComponente);

         modeloSelecionado.componente = badgeModeloComponente.val();

         listModelo.refresh(modeloSelecionado);

         resetFormModeloComponente();

         refreshBtnContruirModelo();
      }

   };

   var onDeleteModeloComponente = function (item) {
      badgeModeloComponente.remove(item.nomeNormalizado);
      modeloSelecionado.componente = badgeModeloComponente.val();

      listModelo.refresh(modeloSelecionado);

      refreshBtnContruirModelo();
   }

   // Componentes

   icelus.ui.NavBar($('#wrapper'), { selected: 'grupo' });

   var tab = icelus.ui.Tab($('#tab'), {
      onSelect: function (evt) {
         //console.log($(evt.target).data('selected'));
      }
   });

   var btnModeloAdicionar = icelus.ui.Button($('#btn-modelo-adicionar'), {
      label: 'Adicionar',
      icon: 'fa fa-check',
      iconPosition: 'right',
      onClick: onClickModeloAdicionar
   });

   var listModelo = icelus.ui.ListGroup($('#modelos'), {
      key: 'nomeNormalizado',
      display: ['nome'],
      displaySub: ['nomeNormalizado'],
      fncDisplaySub: function (item) {
         let render = (item?.componente?.length ?? '0');
         return `${render} compoente(s)`;
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
      label: 'Adicionar',
      icon: 'fa fa-check',
      iconPosition: 'right',
      onClick: onClickComponenteAdicionar
   });

   var btnContruirModelo = icelus.ui.Button($('#btn-construir-modelo'), {
      label: 'Construir modelo',
      icon: 'fa fa-arrow-right',
      iconPosition: 'right',
      onClick: function () {
         tab.change('modelo-tab');
      }
   });
   btnContruirModelo.disable();

   var badgeModeloComponente = icelus.ui.Badge($('#modelo-componente'), {
      key: 'nomeNormalizado',
      display: ['nomeNormalizado'],
      displaySub: ['componente.tipo'],
      onDelete: onDeleteModeloComponente
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



   //$('.toast').toast('show');

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
