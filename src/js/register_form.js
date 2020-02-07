import '@/styles/materialize/materialize';
import "@/styles/style.scss"


class Form {
  constructor() {
    this.inputEmail = "";
    this.inputPassword = "";
    this.checkBox = false;
    this.registerLink = "";
    this.forgotLink = ""; 
    
    
  }
  renderForm() {
    return `
   
    <div class = "row register-menu">
    <p class = "register-menu__head">Register</p>
    <span class = "register-menu__text">Join to our community now!</span>
    <form class = "col s4 register_form">

    <div class="row">
    <div class="input-field col s8">
    <i class="material-icons">account_circle</i>    
    <input placeholder="Enter username" id="first_name" type="text" class="validate">
    <label for="first_name"></label>
  </div>
        <div class="input-field col s8">
        <i class="material-icons">mail</i>           
        <input placeholder="Enter email" id="email" type="email" class="validate">          
          <label for="email"></label>
        </div>
      </div>
    
      <div class="row">
      <div class="input-field col s8">
        <input placeholder="Enter password" id="password" type="password" class="validate">
        <i class="material-icons">lock</i>  
          
        <label for="password"></label>
      </div>
    </div>
    
    <div class="row">
    <div class="input-field col s8">
      <input placeholder="Confirm password" id="password" type="password" class="validate">
      <i class="material-icons">vpn_key</i>  
        
      <label for="password"></label>
    </div>
  </div>

  <div class="link-box row">
  <span>Already have an account? </span> 
    <a  href="#">login</a>
 
    </div>
  <div class="row">
  <button class="waves-effect waves-light btn col s8">REGISTER</button>
  </div>
 
    </div>
    </form> </div>
  
    `
    
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element)
    
  }
  
  start(container){
    this.addToScreen(container, "beforeend", this.renderForm())
  }
}



export default Form;

