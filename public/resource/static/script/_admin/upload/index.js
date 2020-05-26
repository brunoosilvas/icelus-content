$(document).ready(function () {
   const socket = io('http://localhost/');

   socket.on('message', (msg) => {
      console.log(msg);
   });

   $.get('/api/upload', function (data) {

   });
});
