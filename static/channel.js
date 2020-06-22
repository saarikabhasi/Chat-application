    document.addEventListener('DOMContentLoaded', () => {

        // Connect to websocket
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
        

        //socket connect
        socket.on('connect', () => {
            console.log("socket connect")
            socket.emit('joined');     
            console.log("socket after join")
            document.querySelector('#sendbutton').addEventListener('click', () => {
                
                let message = document.getElementById("writemessageID").value;
                let currenttime = new Date();
                
                time = ` ${currenttime.toLocaleTimeString() }`;
                date = `  ${currenttime.toLocaleDateString()} `;
                console.log("send attachments",document.getElementById('img').value,document.getElementById('doc').value)
                if (document.getElementById('img').value){
                    attachimg= document.getElementById('img').value.replace("C:\\fakepath\\", "");
                }
                else{ attachimg= ""}
                if (document.getElementById('doc').value){
                    attachdoc= document.getElementById('doc').value.replace("C:\\fakepath\\", "");
                }
                else{
                    attachdoc =""
                }
                
                   
                    
                
                

                console.log("Send",attachimg,attachdoc)
                socket.emit('send message' ,message,time,date,attachimg,attachdoc);

                document.getElementById("writemessageID").value = '';
        
       
            });
        });

    // When a new msg is announced

        socket.on('announce message', data => {

            //set current channel
            // console.log("currentchannel",localStorage.getItem('currentchannel'))
            if  (localStorage.getItem('currentchannel')){
                localStorage.removeItem('currentchannel');
            }
        
            localStorage.setItem('currentchannel', data.currentchannel);
            console.log("current channel", localStorage.getItem('currentchannel'))

            //create new div for displaying new messages
            let newDiv = document.createElement('div');
            
            // place new div to right if current user is sending message
            if (data.username == localStorage.getItem('name')){
                newDiv.className = 'containers container-right';
            }
            //place new div to left if other users are sending message
            else{
                newDiv.className = 'containers container-left ';
            }

            
            // creating other elements of new messages div
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
            console.log("attachments",data.attachment)

            if (data.attachment){
                console.log(data.attachment[0],data.attachment[1])
                if (data.attachment[0]){
                    var extension = data.attachment[0].split('.').pop();
                    if (extension == "jpg") {
                        var newP5 = document.createElement('img');
                        let attachimg = data.attachment[0].replace("C:\\fakepath\\", "");
                        
                        console.log("A",attachimg)
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
                console.log("P5",newP5)
                newDiv.appendChild(newP5);
            }
            if (newP6){
                console.log("P6",newP6)
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

