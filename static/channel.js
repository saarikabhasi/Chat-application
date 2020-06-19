document.addEventListener('DOMContentLoaded', () => {
    // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
  //var socket = io.connect(location.origin );
    console.log(socket);
    // When connected, configure buttons
      socket.on('connect', () => {
        socket.emit('joined');
        
          // Each button should emit a "submit msg" event
          //document.querySelector('#sendmsg').button.onclick = () => {
            document.querySelector('#sendmsg').addEventListener('click', () => {
                  console.log(document.getElementById("messagebox").value);
                  let message = document.getElementById("messagebox").value;
                  console.log(message);
                  console.log(socket);
                  socket.emit('send message' ,message);
                  document.getElementById("messagebox").value = '';
                  // socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
              }
          );
        });

      // When a new msg is announced
      socket.on('announce chat', data => {
          // var msg = data.message;
          let row =  `${data.message}`
          console.log(row);
          document.querySelector('#mesg').value += row + '\n'
        

      });
      

    
  });