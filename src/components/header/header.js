'use strict';

import './header.scss';
import { startAdminPage } from '../../js/controller';
import LoginForm from '../../js/login-form';
// import admin from "../component-admin-page"
class Header {
  constructor() {
    this.root = document.querySelector('#root');
    const head = `<div class="header">
        <nav class="burger-menu">
        <div class="menu-header">
        <span class="title">Меню</span>
        <ul class="items-header">
        <li><a class="burger-link" id="hall-btn" href="#">Зал</a></li>
        <li><a class="burger-link" id="admin-btn" href="#">Admin</a></li>
        </ul>
        </nav>
        <div class="users-data">
        <a href="#" class="user login-name">Template</a>
        <div class="user logout">Logout</div>
        </div>
        </div>`;

    this.root.insertAdjacentHTML('beforebegin', head);
    this.addListeners();
    // this.adminWindowClick = this.adminWindowClick.bind(this);
  }

  closeMenu() {
    const menuElem = document.querySelector('.menu-header');
    const adminBtn = document.querySelector('#admin-btn');
    adminBtn.addEventListener('click', function() {
      menuElem.classList.remove('open');
    });
  }
  adminWindowClick = () => {
    this.closeMenu();
    this.root.innerHTML = '';
    startAdminPage(this.root);
    const menuElem = document.querySelector('.menu-header');
    menuElem.classList.remove('open');
  };
  addListeners() {
    const menuElem = document.querySelector('.menu-header');
    const titleElem = document.querySelector('.title');
    const adminBtn = document.querySelector('#admin-btn');
    titleElem.addEventListener('click', function() {
      menuElem.classList.toggle('open');
    });
    adminBtn.addEventListener('click', this.adminWindowClick);

    const btnCloser = document.querySelector('.logout');
    const root = document.querySelector('#root');
    const header = document.querySelector('.header');
    btnCloser.addEventListener('click', () => {
      root.innerHTML = '';
      header.remove();
      new LoginForm();
    });
  }
}
export default Header;
