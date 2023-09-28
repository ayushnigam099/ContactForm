// const { json } = require("body-parser");

// SO HERE I AM STORING ALL THE DETAILS OF THE USER IN CrudCrud
let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');
let myForm = document.querySelector('#my-form');
let phn = document.querySelector('#phone');
let time = document.querySelector('#date');
let timing = document.querySelector('#timing');



// Listen for DOMContentLoaded 
document.addEventListener('DOMContentLoaded', ()=>{
axios.get("http://localhost:3000/user/get-user")
.then(({data})=> {
                                      // console.log(data);
                                      // console.log(res.data.data.length);
  for(let i=0;i<data.data.length;i++)
  {
                                      //  console.log("objectLength");                        
            let div = document.createElement('div');
            // Creating a Delete Button
            div.className= "new-div";
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute('id', data.data[i].id);
            deleteButton.textContent="Delete";
            deleteButton.addEventListener('click', onDelete);

            div.appendChild(document.createTextNode(data.data[i].name));
            div.appendChild(document.createTextNode("🔶" + data.data[i].email +"🔶"));
            div.appendChild(document.createTextNode(data.data[i].phonenumber+ " "));
            
            div.style.fontWeight= "bold";
            div.style.textAlign= "center";
            div.style.color= "brown";

            deleteButton.style.backgroundColor="red";
            deleteButton.style.color="white";
            deleteButton.style.borderColor="red"
            div.appendChild(deleteButton);

            // Add an Edit button to the div
            let editButton=document.createElement("button");
            editButton.textContent = "Edit";
            div.appendChild(editButton);
            div.lastChild.addEventListener('click', onEdit);
            
            editButton.style.backgroundColor="green";
            editButton.style.color="white";
            editButton.style.borderColor="green"

            myForm.after(div);
}
}).catch(err=> console.error(err))
})

// Listen for form submit
myForm.addEventListener('submit', onSubmit);
function onSubmit(e)
 {
    e.preventDefault();
    if(nameInput.value === '' || emailInput.value === '' || phn.value === '' || time.value === '' ) {
      alert('Please enter all fields');
    }
    else{
        alert('Details Successfully Saved!');
        const details = {
            "Name": nameInput.value,
            "Email": emailInput.value,
            "Phonenumber": phn.value,
            "Date": time.value,
            "TimeForCall":timing.value,

        };
        // Storing details on crudcrud
        // axios(
        //     {
        //       method:'post',
        //       url:"https://crudcrud.com/api/ce1ce15ec85e4f379a19d37dcd8e184c/UserDetails",
        //       data: {
        //         "Name": nameInput.value,
        //         "Email": emailInput.value,
        //         "Phonenumber": phn.value,
        //         "Date": time.value,
        //         "TimeForCall": timing.value,
    
        //     },
        //     }
        //    ).then(res=> console.log(res.data))
        //    .catch((err)=>console.error(err));
   
         axios.post("http://localhost:3000/user/add-user", details).
         then(res=> console.log(res.data))
          .catch((err)=>{
            console.error(err);
          alert("Duplicate Entry Found, Please Register Again!")});
              create();
      }

    }
function create(){
        // Lets Scale the app to more users
        let div = document.createElement('div');
        // Creating a Delete Button
        div.className="new-div";
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute('id', nameInput.value);
        deleteButton.textContent="Delete";
        deleteButton.addEventListener('click', onDelete);

        div.appendChild(document.createTextNode(nameInput.value));
        div.appendChild(document.createTextNode("🔶" + emailInput.value +"🔶"));
        div.appendChild(document.createTextNode(phn.value + " "));
        
        div.style.fontWeight= "bold";
        div.style.textAlign= "center";
        div.style.color= "brown";

        deleteButton.style.backgroundColor="red";
        deleteButton.style.color="white";
        deleteButton.style.borderColor="red"
        div.appendChild(deleteButton);

        // Add an Edit button to the div
        let editButton=document.createElement("button");
        editButton.textContent = "Edit";
        div.appendChild(editButton);
        div.lastChild.addEventListener('click', onEdit);
        
        editButton.style.backgroundColor="green";
        editButton.style.color="white";
        editButton.style.borderColor="green"

        myForm.after(div);
}
 
 
// DELETE BUTTON FUNCTIONALITY
  function onDelete() {
    const div = this.parentNode;
    // console.log(div)
    axios.delete(`http://localhost:3000/user/delete-user/${this.id}`)
    .then(res=> {
      console.log(res);
      alert("Selected User Details has been removed from Database!");})
      .catch(err=> console.error(err));
      
    div.remove();
  }

//EDIT BUTTON FUNCTIONALITY
    function onEdit(e) {
    e.preventDefault();
    const div = this.parentNode;
    const user= div.querySelector('button').id;
    div.remove();
    axios.get(`https://crudcrud.com/api/ce1ce15ec85e4f379a19d37dcd8e184c/UserDetails/${user}`)
     .then(res=> {
        nameInput.value = res.data.Name;
        emailInput.value = res.data.Email;
       phn.value = res.data.Phonenumber;
       time.value = res.data.Date;
       timing.value =res.data.TimeForCall;
       myForm.removeEventListener('submit', onSubmit);
       myForm.addEventListener('submit',(e)=>{
        
        e.preventDefault() 
        axios.put(`https://crudcrud.com/api/ce1ce15ec85e4f379a19d37dcd8e184c/UserDetails/${user}`,{
          "Name": nameInput.value,
          "Email": emailInput.value,
          "Phonenumber": phn.value,
          "Date": time.value,
          "TimeForCall":timing.value,
      }).then(()=> alert("Details has been edited to crudcrud! Refresh the page!! "))
        .catch(err=>console.error(err));
     })

     }
      
     )}
