
function hello(){ 
    const name = document.querySelector('#name').value;
    let welcomemessage = "Hello "+ name  


                
    }
    // window.onload = function(){
  document.addEventListener('DOMContentLoaded', () => {
    // Connect to websocket

  //var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    //var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    var socket =io.connect(window.location.hostname+':'+ window.location.port);
    // When connected, configure buttons
      socket.on('connect', () => {
        
          // Each button should emit a "submit msg" event
         // document.querySelector('#sendmsg').button.onclick = () => {
            document.querySelector('#sendmsg').addEventListener('click', () => {
                  let message = document.getElementById("messagebox").value;
                  socket.emit('send message' , {'message': message});
              }
          );
        });

      // When a new msg is announced
      socket.on('announce message', data => {
          var msg = document.getElementById("messagebox").value;
          console.log(msg);
          const li = document.createElement('li');
        
          //document.getElementById("mesg").innerHTML = `Message: ${data.message}`;
           li.innerHTML = `Message: ${data.message}`;
           document.querySelector('#mesg').append(li);
      });
      

    
  });