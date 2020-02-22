'use strict';
import Form from "@/js/register_form";
import M from 'materialize-css'; // add materialize js logic
import '@/styles/materialize/materialize';
import '@/styles/login-form';


class LoginForm {
  constructor() {
    this.root = document.querySelector('#root');
    this.addMarkup();
    this.form = document.querySelector('.login-form');
    this.error = document.querySelector('.error-box');
    this.btn = document.querySelector('.login-form__button');
    this.loginInput = document.querySelector('input[type="email"]');
    this.passInput = document.querySelector('input[type="password"]');
    this.register = document.querySelector('.register');
    this.modal = document.querySelector('#modal1');

    this.registerNow();
    this.submit();
  }
  renderMarkup() {
    return ` 
    <div class="form-wrapper">
    <form class="login-form">
    <div class="row input-wrapper">
    <i class="small material-icons">mail_outline</i>
      <div class="input-field col s12 login-form__input">
        <input id="email" type="email" class="validate" required>
        <label for="email">Email</label>
      </div>
    </div>
    <div class="row input-wrapper">
    <i class="small material-icons">lock_outline</i>
        <div class="input-field col s12 login-form__input">
          <input id="password" type="password" class="validate" required>
          <label for="password">Password</label>
        </div>
      </div>
      <p class="error-box"></p>
      <p class="checkbox-container">
      <label>
        <input type="checkbox" class="filled-in" />
        <span>Remember me</span>
      </label>
    </p>
    <input type="submit" value="log in" class="login-form__button card-panel teal lighten-2">
  </form>
  <div class="links-box">
    <a class="register" href="#">Rergister Now!</a>
    <a href="#">Forgot password?</a>
  </div>`;
  }
  addMarkup() {

    this.root.innerHTML = this.renderMarkup();
  }

  transferToRegister() {
    this.root.innerHTML = '';
    const form = new Form();
    form.start(this.root);
  }
  registerNow() {
    this.register.addEventListener('click', this.transferToRegister.bind(this));
  }

  submit() {
    this.btn.addEventListener('click', this.isFillingForm.bind(this));
  }
  isIncludes(arr) {
    for (let obj of arr) {
      if (
        obj.ligin === this.loginInput.value.trim() &&
        obj.password === this.passInput.value.trim()
      ) {
        return true;
      }
      return false;
    }
  }
  isFillingForm(e) {
    if (
      this.loginInput.value.trim() === '' ||
      this.passInput.value.trim() === ''
    ) {
      this.form.addEventListener('submit', e.preventDefault());
      this.error.textContent = 'Fields are required!';
      return;
    }
    this.error.textContent = '';
    this.isValid(e);
    return;
  }
  isValid(e) {
    if (
      !this.isIncludes([{
        ligin: 'nazarkynash16@gmail.com',
        password: '123456'
      }, ])
    ) {
      this.form.addEventListener('submit', e.preventDefault());
      this.error.textContent = 'невірний логін або пароль';
      return;
    }
    this.error.textContent = '';
    return;
  }
}

export default LoginForm;