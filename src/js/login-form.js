'use strict';
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

    this.openModal();
    this.registerNow();
    this.submit();
  }
  renderMarkup() {
    return ` <div id="modal1" class="modal">
    <div class="modal-content">
    <form class="login-form">
    <div class="row input-wrapper">
    <i class="small material-icons">mail_outline</i>
      <div class="input-field login-form__input">
        <input id="email" type="email" class="validate" required>
        <label for="email">Email</label>
      </div>
    </div>
    <div class="row input-wrapper">
    <i class="small material-icons">lock_outline</i>
        <div class="input-field login-form__input">
          <input id="password" type="password" class="validate" required minlength="6">
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
  </div>
  </div>`;
  }
  addMarkup() {
    this.root.insertAdjacentHTML('afterbegin', this.renderMarkup());
  }
  openModal() {
    M.Modal.init(this.modal).open();
  }
  cloceModal() {
    M.Modal.init(this.modal).close();
  }
  transferToRegister() {
    this.cloceModal();
  }
  registerNow() {
    this.register.addEventListener('click', this.transferToRegister.bind(this));
  }
  preventDef(event) {
    event.preventDefault();
  }
  submit() {
    this.btn.addEventListener('click', this.isFillingForm.bind(this));
  }
  isIncludes(arr) {
    for (let obj of arr) {
      if (
        obj.ligin !== this.loginInput.value.trim() &&
        obj.password !== this.passInput.value.trim()
      ) {
        this.error.textContent = 'невірний логін або пароль';
        return false;
      }
      return true;
    }
  }
  isFillingForm() {
    if (
      this.loginInput.value.trim() === '' ||
      this.passInput.value.trim() === ''
    ) {
      this.form.addEventListener(
        'submit',
        this.preventDef.bind(this),
        (this.error.textContent = 'Fields are required!'),
      );
      return;
    }
    this.isValid();
    return;
  }
  isValid() {
    if (
      !this.isIncludes([{ ligin: 'nazarkynash16@gmail.com', password: 123456 }])
    ) {
      this.preventDef.bind(this);
      this.error.textContent = 'невірний логін або пароль';
      return;
    }
    this.cloceModal();
    return;
  }
}

export default LoginForm;
