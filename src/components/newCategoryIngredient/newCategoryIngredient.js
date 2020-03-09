'use strict';

import '@/styles/materialize/materialize';
import './styles.css';
import CategoryIngridients from '../component-CategoryIngridients/CategoryIngridients';

const root = document.querySelector('#root');

class NewCategoryIngredient {
  constructor() {
    this.categoryIngredient = [];
    this.addNewCategoryIngredient = this.addNewCategoryIngredient.bind(this);
  }

  //   renderNewCategoryIngredient = () => {
  //     return `
  //         <div class="col s12 m7">
  //   <div class="link">
  //     <a href="">
  //       <i class="medium material-icons dp48">chevron_left</i>
  //     </a class="link_return">
  //     <h2 class="header">Новая категория ингредиентов</h2>
  //   </div>
  //   <div class="card horizontal">

  //     <div class="card__p">
  //       <p class="ingredient__name">Название</p>
  //     </div>
  //     <div class="card-stacked">
  //       <div class="card__content">
  //         <div class="row">
  //           <form class="col s12">
  //             <div class="row">
  //               <div class="input-field col s6">
  //                 <input placeholder="Например, «Овощи» или «Мясо»" class="input-text browser-default"
  //                   id="category-validate" type="text" autofocus="true">
  //               </div>
  //             </div>
  //             <div class="button">
  //               <button class="btn" id="js-button" type="submit" name="action">
  //                 Сохранить
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // </div>`;
  //   };

  addToScreen = position => {
    const main = document.querySelector('main');
    main.innerHTML = '';
    const element = `
    <div class="col s12 m7">
<div class="link">
<a href="#" id="new-category-link-back">
  <i class="medium material-icons dp48">chevron_left</i>
</a class="link_return">
<h2 class="header">Новая категория ингредиентов</h2>
</div>
<div class="card horizontal">

<div class="card__p">
  <p class="ingredient__name">Название</p>
</div>
<div class="card-stacked">
  <div class="card__content">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input placeholder="Например, «Овощи» или «Мясо»" class="input-text browser-default"
              id="category-validate" type="text" autofocus="true">
          </div>
        </div>
        <div class="button">
          <button class="btn" id="js-button" type="submit" name="action">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
</div>
</div>`;
    main.insertAdjacentHTML(position, element);
  };

  addNewCategoryIngredient = e => {
    const inputValue = document.querySelector('#category-validate');
    e.preventDefault();
    if (inputValue.classList.contains('valid')) {
      if (inputValue.value.length) {
        this.categoryIngredient.push(inputValue.value);
      }
      if (inputValue !== null) {
        inputValue.value = '';
      }
      console.log(this.categoryIngredient);
    }
  };

  validationInput = () => {
    const inputValue = document.querySelector('#category-validate');
    const regTwo = /^[а-яА-ЯёЁa-zA-Z]+$/;
    if (inputValue.value.match(regTwo) && String(inputValue.value.length) > 3) {
      inputValue.classList.add('valid');
      inputValue.classList.remove('invalid');
    } else {
      inputValue.classList.add('invalid');
      inputValue.classList.remove('valid');
    }
  };

  addListeners = () => {
    const returnButton = document.querySelector('.medium material-icons dp48');
    const inputValue = document.querySelector('#category-validate');
    const btnSave = document.querySelector('#js-button');

    inputValue.addEventListener('input', this.validationInput);
    btnSave.addEventListener('submit', e => {
      e.preventDefault();
      console.dir(inputValue);
      if (inputValue !== null) {
        inputValue.value = '';
      }
    });
    btnSave.addEventListener('click', this.addNewCategoryIngredient);
    const btnBack = document.querySelector('#new-category-link-back');
    const main = document.querySelector('main');
    btnBack.addEventListener('click', () =>
      new CategoryIngridients().render(main),
    );
  };

  start = () => {
    this.addToScreen('beforeend');
    this.addListeners();
  };
}

export default NewCategoryIngredient;
