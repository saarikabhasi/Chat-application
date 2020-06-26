// Login
document.body.style.backgroundColor = 'rgb(' + [0,156,184].join(',') + ')';


if (!localStorage.getItem('name')){
   
        //if no name found in local storage
        getname=()=>{
            let name = document.querySelector('#name').value;
            
            localStorage.setItem('name', name);
            document.getElementById('form').submit();
        
            
        };
    } 
else {
    
    //login with previous display name
    let name = localStorage.getItem('name')
    document.querySelector('#name').value = name;

   

    document.getElementById('form').submit();

}



