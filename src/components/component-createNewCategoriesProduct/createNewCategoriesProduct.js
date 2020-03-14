import '@/styles/materialize/materialize'; // import materialize styles
import './createNewCategoriesProduct.scss';
import request from './fetch.js';

export default class createNewCategoriesProduct {
    constructor() {}

    start = container => {
        this.addToScreen(container, 'beforeend', this.renderItem());
        this.listener();
    };

    addToScreen(container, position, element) {
        container.insertAdjacentHTML(position, element);
    }

    renderItem() {
        return `<div class="nav-wrapper nav-wrapper__container">
        <a href="#!" class="brand-logo nav-wrapper__arrow"><i class="material-icons">keyboard_arrow_left</i></a>
        <p class="title">Новая Категория</p>
    </div>
       <form action="#">
    <div class="collection">
        <div class="collection__input-name">
        <p class="input_title">Название</p>
        <input class="categories-product-input categories-product-input__title" type="text" />
    </div>        
    <div class="collection__input-img">
      <p class="input_title">Фотография</p>
      <input class="categories-product-input categories-product-input__img" type="text" />    
    </div>
    </div>
        <a class="waves-effect waves-light btn categories-product-btn">button</a>
    </form>`;
    }

    listener() {
        const btnForm = document.querySelector('.categories-product-btn');
        btnForm.addEventListener('click', this.addObj);

        const btnBack = document.querySelector('.nav-wrapper__arrow');
        btnBack.addEventListener('click');
    }

    addObj = () => {
        const obj = {
            name: document.querySelector('.categories-product-input__title').value,
            imag: document.querySelector('.categories-product-input__img').value,
        };
        request('categoriGoods.json', 'POST', obj);
        console.log(obj);
    };
}