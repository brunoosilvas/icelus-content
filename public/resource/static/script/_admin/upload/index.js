$(document).ready(function () {
   const socket = io('http://localhost/');

   socket.on('upload', (data) => {
      console.log(data);
      upload.progressUpdate(data.percentual);
   });

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

   var upload = icelus.ui.Upload($('#upload'), {
      onSelect: function(data) {
         //console.log(data);
      },
      onUpload: function(data) {
         upload.progressStart();

         //data.append('path', $('#upload input[name=path]').val());
         //data.append('size', $('#upload input[name=size]').val());

         $.ajax({
            url: '/api/upload',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            dataType: 'json',
            success: function(data) {
               //upload.progressStop();
            }
         });
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
