// SO HERE I AM STORING ALL THE DETAILS OF THE USER IN LOCAL STORAGE
let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');
let myForm = document.querySelector('#my-form');
let phn = document.querySelector('#phone');
let time = document.querySelectorAll('#date');


// Listen for form submit
myForm.addEventListener('submit', onSubmit);
function onSubmit(e)
 {
    e.preventDefault();
    if(nameInput.value === '' || emailInput.value === '' || phn.value === '' || time[0].value === '' ) {
      alert('Please enter all fields');
    }
    else{
        alert('Details saved to local storage');
        const details = {
            Email: emailInput.value,
            Phonenumber: phn.value,
            Date: time[0].value,
            TimeForCall: time[1].value,

        };

        localStorage.setItem(nameInput.value, JSON.stringify(details));
        // localStorage.setItem(nameInput.value, emailInput.value);

        // Lets Scale the app to more users
        let div = document.createElement('div');
        // Creating a Delete Button
        div.className=" new-div";
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
 }
 
// DELETE BUTTON FUNCTIONALITY
  function onDelete() {
    const div = this.parentNode;
    // console.log(div)
    const name = div.childNodes[0].nodeValue.trim();
    // console.log(name)
    localStorage.removeItem(name);
    div.remove();
  }

  // EDIT BUTTON FUNCTIONALITY
    function onEdit(e) {
    e.preventDefault();
    const div = this.parentNode;
    const name = this.parentNode.childNodes[0].nodeValue.trim();
    const details = JSON.parse(localStorage.getItem(name));
    nameInput.value = name;
    emailInput.value = details.Email;
    phn.value = details.Phonenumber;
    time[0].value = details.Date;
    time[1].value = details.TimeForCall;
    localStorage.removeItem(name);
    div.remove();
}
