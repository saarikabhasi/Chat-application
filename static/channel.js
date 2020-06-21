
    document.addEventListener('DOMContentLoaded', () => {
        // Connect to websocket
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
        console.log(socket);

        // When connected, configure buttons
        socket.on('connect', () => {
        socket.emit('joined');     
        // Each button should emit a "submit msg" event
        //document.querySelector('#sendmsg').button.onclick = () => {
        document.querySelector('#sendbutton').addEventListener('click', () => {
        console.log(document.getElementById("writemessageID").value);
        let message = document.getElementById("writemessageID").value;
        let currenttime = new Date();
        let timestamp = currenttime.toUTCString()
        console.log("time",timestamp);
        console.log(timestamp)  
        console.log("message in #sendbutton",message);
        console.log("socket in #sendbutton",socket);
        
        socket.emit('send message' ,message,timestamp);
        //addmsg = (message)=>{
          // var newmessageDiv = document.createElement('div');
          // newmessageDiv.className ="container--msg"
          // container-new-msg.innerHTML = message + currenttime + timestamp;
          
        //}
        document.getElementById("writemessageID").value = '';
        
        // socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
        });
    });
    // When a new msg is announced
    socket.on('announce message', data => {
        // var msg = data.message;
        console.log("in announce data",data);
        values =  `${data.username} ${data.message} ${data.timestamp}`
       
        console.log("in announce values",values);
        //console.log("displaychanneltextarea",document.querySelector('#displaychannelmessagesID').value)
        //document.querySelector('#displaychannelmessagesID').value += row + '\n'

        //console.log(document.getElementById('displayallmessagesID').getAttribute('value'))
        //var newmessageDiv = document.createElement('div'),
        //newmessageDiv = document.getElementById("container-new-msg");
        
        //var newmessageDiv = getElementsById('container-new-msg');
        // if(document.getElementById('container-msg') != null){

        //      document.getElementById('container-msg').innerHTML += values+'\n';
        // }  
        // else{
        //     document.getElementById('container-msg').innerHTML =  values+'\n';
       
        // }

        let newDiv = document.createElement('div');
        newDiv.className = 'containers float-right';

        let newP1 = document.createElement('p');
        newP1.innerHTML = data.username;

        let newP2 = document.createElement('p');
        newP2.className = 'lead text-secondary';
        newP2.innerHTML =  data.message;

        let newP3 = document.createElement('p');
        newP3.className = 'lead text-secondary';
        newP3.innerHTML = data.timestamp;

        newDiv.appendChild(newP1);
        newDiv.appendChild(newP2);
        newDiv.appendChild(newP3);
        //document.body.appendChild(newDiv);
        console.log(newDiv);
       // var x = document.getElementsByClassName("container-msg");
        
        let length = document.getElementsByClassName("container-msg").length;
        console.log(length);
        if (length == 0){
            //document.getElementsByClassName("container-msg")[0].appendChild(newDiv);
            
            document.querySelector(".container-msg").innerHTML = newDiv;
        }
        else{
            document.getElementsByClassName("container-msg")[length-1].appendChild(newDiv);
        }
        
        //document.querySelector(".container-msg").appendChild(newDiv);
    });
      
  //oldmessage 
  
    
  });

