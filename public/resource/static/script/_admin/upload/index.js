$(document).ready(function () {

   const socket = io('http://localhost/');

   socket.on('upload', (data) => {
      if (data && data.nome) {
         upload.status(`upload do arquivo: ${data.nome}`);
      } else {
         upload.status(`gerando thumbnail...`);
      }
      upload.progressUpdate(data.percentual);
   });

   icelus.ui.NavBar($('#wrapper'), { selected: 'upload' });

   var iconeAdicionarPasta = icelus.ui.IconButton($('#icone-adicionar-pasta'), {
      icon: 'fa fa-folder',
      onClick: function() {

      }
   });

   var iconeRemoverPasta = icelus.ui.IconButton($('#icone-remover-pasta'), {
      icon: 'fa fa-trash',
      onClick: function() {

      }
   });

   var iconeRemoverArquivo = icelus.ui.IconButton($('#icone-remover-arquivo'), {
      icon: 'fa fa-trash',
      onClick: function() {

      }
   });

   var upload = icelus.ui.Upload($('#upload'), {
      onSelect: function(data) {
         console.log(data.values);
      },
      onUpload: function(data) {
         console.log(data);

         if (upload.size > 0) {

            upload.progressStart();

            $.ajax({
               url: '/api/upload',
               data: data,
               cache: false,
               contentType: false,
               processData: false,
               type: 'POST',
               dataType: 'json',
               success: function(data) {
                  console.log(data);
                  upload.progressStop();
               },
               error: function(data) {
                  upload.progressStop();
               }
            });
         }
      }
   })
   /*var btnUpload = icelus.ui.Button($('#btn-upload'), {
      label: 'Upload',
      icon: 'fa fa-upload',
      onClick: function () {
         var fd = new FormData();
         console.log($('#file'));
         console.log(fd);
      }
   });*/

});
