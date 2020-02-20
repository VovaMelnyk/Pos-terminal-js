import '@/styles/materialize/materialize';
import "@/styles/style.scss"
import M from 'materialize-css';

class Form {
  constructor(name, email, password) {
    this.users = [
{
      name: name,
      email: email,
      password: password,  }

    ];
  
  }

  
  renderForm() {
    return `  

  <div class="register-menu">
    <p class="register-menu__head">Register</p>
    <p class="register-menu__text">Join to our community now !</p>
    <form class="register_form">


      <div class="input-field">
        <i class="material-icons prefix">account_circle</i>
        <input id="first_name" type="text" class="validate" required name = "name">
        <label for="first_name">Enter username</label>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">mail</i>
        <input id="email" type="email" class="validate" name = "email" required>
        <label for="email">Enter email</label>
     
      </div>   

      <div class="input-field">
        <i class="material-icons prefix">lock</i>
        <input  id="password icon_prefix" type="password" name= "password" autocomplete="off"
        class="validate" required  min="6">
        <label for="password icon_prefix">Enter password</label>
      </div>

    
      <div class="input-field confirm-password">
        <i class="material-icons prefix">vpn_key</i>
        <input id="password" type="password" autocomplete="off" name = "password"
         class="validate input-field__confirm-password" required>
        <label for="password">Confirm password</label>
      </div>


      <div class="link-box">
        <span>Already have an account? <a href="#" class = "register_link">login</a> </span>


      </div>

      <button class="unlock btn register-menu__btn">REGISTER</button>

  </div>
  </form>
  </div>
  
    `

  }
  renderAnotherForm() {

    return `<h1>Login menu</h1>`
  }
  renderAnotherWindows(){
return "<h2>Desk of order</h2>"
  }


  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element)
  }

  start(container) {
    this.addToScreen(container, "beforeend", this.renderForm());
    const registerLink = document.querySelector(".register_link");
    const registerForm = document.querySelector(".register_form");
    this.changeForm(registerLink);
    this.activeBtn(registerForm);
    this.saveForm(registerForm);
    // this.validForm(registerForm);
    console.log(this.users)
  }

  removeForm() {
    const root = document.querySelector("#root")
    const registerForm = document.querySelector(".register-menu");
    registerForm.remove();
    this.addToScreen(root, "beforeend", this.renderAnotherForm());

  }

  changeForm(el) {
    el.addEventListener("click", this.removeForm.bind(this));
  }



  changeRegisterBtn(e) {
    e.preventDefault()
    const form = e.currentTarget;
    const userName = form.elements.name.value;
    const userEmail = form.elements.email.value;
    const userPassword = form.elements.password[0].value;
    const passwordConfirm = form.elements.password[1].value;
    const registerBtn = document.querySelector(".register-menu__btn");
    if (userName.length > 0 && userEmail.length > 0
       && userPassword.length > 0
        && passwordConfirm.length > 0) {
      registerBtn.classList.remove("unlock");
      registerBtn.classList.add("waves-effect", "waves-light");
    }
  }

  activeBtn(el) {    
    el.addEventListener("input", this.changeRegisterBtn.bind(this));
  }

  validateForm (e) {
    e.preventDefault()
    const userName = document.querySelector("#first_name");
    const userEmail = document.querySelector("#email");
    const userPassword = document.querySelector("#password");
    const passwordConfirm = document.querySelector(".input-field__confirm-password");
    const registerBtn = document.querySelector(".register-menu__btn");

    if(!userName.classList.contains("invalid") 
    && !userEmail.classList.contains("invalid")
    && !userPassword.classList.contains("invalid") 
    && !passwordConfirm.classList.contains("invalid")){
      registerBtn.classList.remove("waves-effect", "waves-light");
      registerBtn.classList.add("unlock");

    }

  } 
  validForm(el) {    
    el.addEventListener("change", this.validateForm.bind(this));

  }


messageMistake(e) {
  e.preventDefault()
    const form = e.currentTarget;
    alert("You have mistake")
}  

handleSubmit(e){
  e.preventDefault()
  const root = document.querySelector("#root")
  const registerForm = document.querySelector(".register-menu");
  const {elements} = e.currentTarget;
  const nameInput = elements.name;
  const emailInput = elements.email;
  const passwordInput = elements.password[0];
  const data = {
    [nameInput.name]:nameInput.value,
    [emailInput.name]:emailInput.value,
    [passwordInput.name]:passwordInput.value
  }
  this.users.push(data)
 
  if(this.users.includes(data)){
 
    registerForm.remove();
    this.addToScreen(root, "beforeend", this.renderAnotherWindows());
    console.log(this.users)
  } else {
    alert("You have mistake")
  }
 
}
saveForm(el) {    
  el.addEventListener("submit", this.handleSubmit.bind(this));

}

}
//===For control
// import Form from "@/js/register_form";
// const root = document.querySelector("#root");
// const form = new Form();
// form.start(root);

export default Form;