    document.addEventListener('DOMContentLoaded', () => {

        // Connect to websocket
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
        
            // Send button activate only if there is a message or attachments. 
            document.querySelector('#sendbutton').disabled = true;

            // Message check
            document.getElementById('writemessageID').onkeyup = () => {

              if (document.getElementById('writemessageID').value.length > 0){

                document.querySelector('#sendbutton').disabled = false;
              }
              else{
                    //Check if document or image is attached
                    if (document.getElementById('doc').value.length >0 || document.getElementById('img').value.length >0) {
        
                        document.querySelector('#sendbutton').disabled = false;
                    }
                    else{
                        document.querySelector('#sendbutton').disabled = true;
                    }
                }
                   
            }
            
            document.getElementById('doc').onchange=()=>{
                
                //Check if document attached

                if (document.getElementById('doc').value.length > 0){
                    document.querySelector('#sendbutton').disabled = false;
                }
                else {
                    //Check if image is attached or if there is a message 

                    if (document.getElementById('img').value.length >0 || document.getElementById('writemessageID').value.length >0) {
                        document.querySelector('#sendbutton').disabled = false;
                    }
                    else{
                        document.querySelector('#sendbutton').disabled = true;
                    }
                }
            }

              
            document.getElementById('img').onchange=()=>{
                //Check if img attached

                if (document.getElementById('img').value.length > 0){
                    document.querySelector('#sendbutton').disabled = false;
                }
                else {
                      //Check if document is attached or if there is a message 
                    if (document.getElementById('doc').value.length >0 || document.getElementById('writemessageID').value.length >0) {
                        document.querySelector('#sendbutton').disabled = false;
                    }
                    else{
                        document.querySelector('#sendbutton').disabled = true;
                    }
                }

            }

            // Send message button
            submitted =()=>{
       
                document.querySelector('#sendbutton').disabled = true;
              
                // Stop form from submitting
                return false;
            }
       
           


        //Socket connect
        socket.on('connect', () => {

            //Emit joined message
            socket.emit('joined');     
        
            // When user click send button 
            document.querySelector('#sendbutton').addEventListener('click', () => {
                
                // Get message, time and date
                let message = document.getElementById("writemessageID").value;
                let currenttime = new Date();
                
                time = ` ${currenttime.toLocaleTimeString() }`;
                date = `  ${currenttime.toLocaleDateString()} `;

                //If there are attachments, removing their path 
                if (document.getElementById('img').value){
                    attachimg= document.getElementById('img').value.replace("C:\\fakepath\\", "");
                }
                else{ 
                    attachimg= ""
                }

                if (document.getElementById('doc').value){
                    attachdoc= document.getElementById('doc').value.replace("C:\\fakepath\\", "");
                }
                else{
                    attachdoc =""
                }
                
               // Send message to socket
                socket.emit('send message' ,message,time,date,attachimg,attachdoc);

                //Set all values to be empty
                document.getElementById("writemessageID").value = '';
                document.getElementById('img').value = '';
                document.getElementById('doc').value ='';
        
       
            });
        });

    // When a new msg is announced

        socket.on('announce message', data => {

            //Set current channel
            if  (localStorage.getItem('currentchannel')){
                localStorage.removeItem('currentchannel');
            }
        
            localStorage.setItem('currentchannel', data.currentchannel);
            

            //Create new div for displaying new messages
            let newDiv = document.createElement('div');
            
            // Place new div to right if current user is sending message
            if (data.username == localStorage.getItem('name')){
                newDiv.className = 'containers container-right';
            }
            //Place new div to left if other users are sending message
            else{
                newDiv.className = 'containers container-left ';
            }

            
            // Creating other elements of new messages div
            let newP1 = document.createElement('h2');
            newP1.innerHTML = data.username;

            let newP2 = document.createElement('h3');
            newP2.className = 'lead text-secondary';
            newP2.innerHTML =  data.message;

            let newP3 = document.createElement('p');
            newP3.className = 'lead';
            newP3.innerHTML = data.time;

            let newP4 = document.createElement('p');
            newP4.className = 'lead';
            newP4.innerHTML = data.date;


            if (data.attachment){
       
                if (data.attachment[0]){
                    var extension = data.attachment[0].split('.').pop();
                    if (extension == "jpg") {
                        var newP5 = document.createElement('img');
                        let attachimg = data.attachment[0].replace("C:\\fakepath\\", "");
                        
                     
                        newP5.alt = attachimg
                        newP5.width="100"
                        newP5.height="100"
                        // newP5.className = 'lead float-right';
                        newP5.innerHTML = attachimg;
                    }
                }
                if (data.attachment[1]){
                    var extension = data.attachment[1].split('.').pop();
                    if (extension === "pdf" || extension === "doc" || extension === "docx") {
                        var newP6 = document.createElement('p');
                        let attachdoc = data.attachment[1].replace("C:\\fakepath\\", "");
                        
                        newP6.className = 'lead';
                        newP6.innerHTML = attachdoc ;
                    }
                
                }
            }
               

            newDiv.appendChild(newP1);
            newDiv.appendChild(newP2);
            newDiv.appendChild(newP3);
            newDiv.appendChild(newP4);
            if (newP5){
              
                newDiv.appendChild(newP5);
            }
            if (newP6){
     
                newDiv.appendChild(newP6);
            }
        
        
       
        
        let length = document.getElementsByClassName("container-msg").length;
        
        if (length == 0){
            //if first message to this channel

            document.getElementsByClassName("container-msg")[0].appendChild(newDiv);
        }
        
        else{
           
            document.getElementsByClassName("container-msg")[length-1].appendChild(newDiv);
        }
        

    });
      
  
    
  });

