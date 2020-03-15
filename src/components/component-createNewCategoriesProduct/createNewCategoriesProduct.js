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
        <p class="title">Нова Категорія</p>
    </div>
       <form action="#">
    <div class="collection">
        <div class="collection__input-name">
        <p class="input_title">Назва</p>
        <input class="categories-product-input categories-product-input__title" type="text" />
    </div>        
    <div class="collection__input-img">
      <p class="input_title">Картинка</p>
      <input class="categories-product-input categories-product-input__img" type="text" />    
    </div>
    </div>
        <a class="waves-effect waves-light btn categories-product-btn">Добавити</a>
    </form>`;
    }

    listener() {
        const btnForm = document.querySelector('.categories-product-btn');
        btnForm.addEventListener('click', this.addObj);
    }

    addObj = () => {
        let title = document.querySelector('.categories-product-input__title')
            .value;
        let img = document.querySelector('.categories-product-input__img').value;
        const obj = {
            name: title,
            imag: img,
        };

        if (title !== '' && img !== '') {
            const btnForm = document.querySelector('.categories-product-btn');
            btnForm.classList.add('disabled');
            request('categoriGoods.json', 'POST', obj).then(() => {
                document.querySelector('.categories-product-input__title').value = '';
                document.querySelector('.categories-product-input__img').value = '';
                btnForm.classList.remove('disabled');
            });
        }
    };
}