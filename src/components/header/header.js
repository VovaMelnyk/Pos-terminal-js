'use strict';

import './header.scss';
class Header {
    constructor () {
        const root = document.querySelector('#root');
        const head = `<div class="header">
        <nav class="burger-menu">
        <div class="menu">
        <span class="title">Меню</span>
        <ul class="items">
        <li><a class="burger-link" href="#">Зал</a></li>
        <li><a class="burger-link" href="#">Admin</a></li>
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
        const menuElem = document.querySelector('.menu');
        const titleElem = document.querySelector('.title');
        titleElem.addEventListener('click', function() {
            menuElem.classList.toggle('open');
        })
    }
}
export default Header




