'use strict';

import './header.scss';
// import admin from "../component-admin-page"
class Header {
    constructor() {
        const root = document.querySelector('#root');
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
        <input type="button" class="user logout" onClick="location.href='action=logout'" value="Logout">
        </div>
        </div>`

        root.insertAdjacentHTML('beforebegin', head);
        this.addListeners()
    }
    addListeners() {
        const menuElem = document.querySelector('.menu-header');
        const titleElem = document.querySelector('.title');
        const adminBtn = document.querySelector('#admin-btn')
        titleElem.addEventListener('click', function() {
            menuElem.classList.toggle('open');
        })
    }
}
export default Header