import '@/styles/materialize/materialize';
import './createOneIngrClass.scss';
const imagineFetch = [
  {
    id: '1',
    name: 'Перец молотый',
    category: 'без категории',
    weight: 0,
    price: 0,
    detailsInfo: false,
    details: [
      {
        name: 'Минестроне',
        brutto: 0,
        netto: 0,
        price: 0,
        url: '/manage/dish_form/172',
      },
      {
        name: 'Плов',
        brutto: 0,
        netto: 0,
        price: 0,
        url: '/manage/dish_form/173',
      },
    ],
  },
  {
    id: '2',
    name: 'Aвокадо',
    category: 'без категории',
    weight: 0,
    price: 0,
    details: [],
  },
  {
    id: '3',
    name: 'Bода',
    category: 'без категории',
    weight: 0,
    price: 0,
    details: [
      {
        name: 'Американо',
        brutto: 0,
        netto: 0,
        price: 0,
        url: '/manage/dish_form/172',
      },
    ],
  },
];
export default class Ingredient {
  constructor(DOM) {
    this.dom = DOM;
    this.ingredients = [];
  }
  getDataByFetch = () => {
    this.ingredients = imagineFetch;
  };

  renderDetails = data => {
    return `
    <div class="row MS_details">
      <div class="col s12">
        <div class="MS__table">
          <div class="row MS__table-name">
            <b class="col s12">Используется в тех. картах:</b>
          </div>
          <div class="row ">
            <div class="col s12">
              <span class="col s6 MS__detail-header">
              <b>Название</b>
              </span>
              <span class="col s2 center MS__detail-header">
                <b>Брутто</b>
              </span>
              <span class="col s2 center MS__detail-header">
                <b>Нетто</b>
              </span>
              <span class="col s2 center MS__detail-header">
                <b>Цена, ₴</b>
              </span>
            </div>
          </div>
          <ul class="row MS__detailsList">
            ${data.reduce((acc, meal) => {
              acc += ` 
                <li class="col s12">
                    <span class="col s6 MS__detail-item">
                      <a href="/manage/dish_form/172">${meal.name}</a>
                    </span>
                    <span class="col s2 center MS__detail-item">${meal.brutto} г</span>
                    <span class="col s2 center MS__detail-item">${meal.netto} г</span>
                    <span class="col s2 center MS__detail-item">${meal.price}</span>
                </li>`;
              return acc;
            }, '')}
          </ul>
        </div>
      </div>
    </div>
    `;
  };
  renderIngredients = () => {
    const lis = this.ingredients.reduce((acc, ingredient) => {
      acc += `
      <li class="row MS__item">
        <div class="MS__item-head">
          <span class="col s2">
          ${ingredient.name}
          </span>
          <span class="col s2">
            ${ingredient.category}
          </span>
          <span class="col s2 center">
            ${ingredient.weight}кг
          </span>
          <span  class="col s2 center">${ingredient.price}₴</span>
          <span class="col s2 center">
            <span class="MS__link jsDetails" id="${ingredient.id}">Детали</span>
          </span>
          <span class="col s1 center">
            <a class="MS__link" href="#">Ред.</a>    
          </span>
          <div class="MS__icons-remove col s1 center" >
            <i class="material-icons MS__material-icons jsRemoveItem" id="${ingredient.id}">remove_circle_outline</i>
          </div>
        </div>
        <div class="col s12 MS__showDetail">
        </div>
      </li>`;
      return acc;
    }, '');

    return `<ul class="MS__section">${lis}</ul>`;
  };
  getDetailsByIngridients = id => {
    const thisDetails = this.ingredients.filter(
      ingredient => ingredient.id === id,
    );
    return `${
      thisDetails[0].details.length > 0
        ? this.renderDetails(thisDetails[0].details)
        : '<span class="MS__useless">Этот ингредиент ещё нигде не используется</span>'
    }`;
  };
  showDetails = e => {
    const test =
      e.target.parentElement.parentElement.parentElement.lastElementChild;
    test.classList.toggle('MS__open');
    if (!test.className.includes('MS__open')) {
      test.innerHTML = '';
      return;
    }
    test.innerHTML = this.getDetailsByIngridients(e.target.id);
  };
  removeIngredients = id => {
    const newIngredients = JSON.parse(JSON.stringify(this.ingredients));
    this.ingredients = newIngredients.filter(
      ingredient => ingredient.id !== id,
    );
  };
  customListener = e => {
    if (e.target.className.includes('jsDetails')) {
      this.showDetails(e);
    }
    if (e.target.className.includes('jsRemoveItem')) {
      this.removeIngredients(e.target.id);

      this.render();
    }
  };
  listener = () => {
    const list = document.querySelector('.MS__section');
    list.addEventListener('click', e => this.customListener(e));
  };
  render = () => {
    this.dom.innerHTML = this.renderIngredients(this.ingredients);
    this.listener();
  };
  init = () => {
    this.getDataByFetch();
    this.render();
  };
}

// const root = document.querySelector('#root');
// const test = new Ingredient(root);
// test.init();
