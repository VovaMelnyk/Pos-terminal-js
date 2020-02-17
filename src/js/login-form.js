'use strict';
import M from 'materialize-css'; // add materialize js logic
import '@/styles/materialize/materialize';
import '@/styles/login-form';

class LoginForm {
  constructor() {
    this.addMarkup();
    this.openModal();
    this.register();
    this.submit();
  }
  accessToItems() {
    const root = document.querySelector('#root');
    const form = document.querySelector('.login-form');
    let error = document.querySelector('.error-box');
    const btn = document.querySelector('.login-form__button');
    const loginInput = document.querySelector('input[type="email"]');
    const passInput = document.querySelector('input[type="password"]');
    const register = document.querySelector('.register');
    const modal = document.querySelector('#modal1');
    return {
      root,
      form,
      error,
      btn,
      loginInput,
      passInput,
      register,
      modal,
    };
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
    this.accessToItems().root.insertAdjacentHTML(
      'afterbegin',
      this.renderMarkup(),
    );
  }
  openModal() {
    M.Modal.init(this.accessToItems().modal).open();
  }
  cloceModal() {
    M.Modal.init(this.accessToItems().modal).close();
  }
  transferToRegister() {
    this.cloceModal();
  }
  register() {
    this.accessToItems().register.addEventListener(
      'click',
      this.transferToRegister.bind(this),
    );
  }
  preventDef(event) {
    event.preventDefault();
  }
  submit() {
    this.accessToItems().btn.addEventListener(
      'click',
      this.isFillingForm.bind(this),
    );
  }
  isIncludes(arr) {
    for (let obj of arr) {
      if (
        obj.ligin !== this.accessToItems().loginInput.value.trim() &&
        obj.password !== this.accessToItems().passInput.value.trim()
      ) {
        this.accessToItems().error.textContent = 'невірний логін або пароль';
        return false;
      }
      return true;
    }
  }
  isFillingForm() {
    if (
      this.accessToItems().loginInput.value.trim() === '' ||
      this.accessToItems().passInput.value.trim() === ''
    ) {
      this.accessToItems().form.addEventListener(
        'submit',
        this.preventDef.bind(this),
        (this.accessToItems().error.textContent = 'Fields are required!'),
      );
      return false;
    }
    this.isValid();
    return true;
  }
  isValid() {
    if (
      !this.isIncludes([{ ligin: 'nazarkynash16@gmail.com', password: 123456 }])
    ) {
      this.preventDef.bind(this);
      this.accessToItems().error.textContent = 'невірний логін або пароль';
      return false;
    }
    this.cloceModal();
    return true;
  }
}

export default LoginForm;
