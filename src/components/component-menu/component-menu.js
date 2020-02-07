import Check from '../component-check/component-check';

import '@/styles/materialize/materialize';
import './component-menu-style.scss';

class Menu {
  constructor() {
    this.categoriesList = [
      {
        id: Date.now() + 1,
        title: 'Первые блюда',
        productList: [
          {
            id: Date.now() + 4,
            title: 'Борщ',
            quantity: 1,
            price: 50,
            img:
              'https://img.povar.ru/main/ab/23/b4/9c/samii_vkusnii_borsh-404089.jpg',
          },
          {
            id: Date.now() + 5,
            title: 'Минестроне',
            quantity: 1,
            price: 120,
            img:
              'https://grandkulinar.ru/uploads/posts/2017-10/1509267258_vegetarianskij-minestrone.jpg',
          },
        ],
        image:
          'https://juicyworld.ru/wp-content/uploads/2019/05/sup-4-800x445.jpg',
      },
      {
        id: Date.now() + 2,
        title: 'Холодные закуски',
        productList: [
          {
            id: Date.now() + 6,
            title: 'Кольца кальмара',
            quantity: 1,
            price: 90,
            img:
              'https://buyseafood.ru/upload/iblock/d96/d9680d5219fc0860823a82c02b653aeb.jpg.pagespeed.ce.uCwi-YK08S.jpg',
          },
          {
            id: Date.now() + 7,
            title: 'Бутерброд с семгой',
            quantity: 1,
            price: 120,
            img: 'https://i.ytimg.com/vi/cEALpGVB-cA/maxresdefault.jpg',
          },
        ],
        image: 'https://galaktica.ru/images/newMenu-plitka/italia-kolbasa.jpg',
      },
    ];
  }

  init(container) {
    this.addToScreen(container, 'beforeend', this.renderMenu());
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  renderMenu() {
    return `
      <div class="menu">
        ${this.renderCategoriesList()}
      </div>`;
  }

  renderCategoriesList() {
    return `
      <ul class="categories-list">
        ${this.categoriesList.reduce(
          (acc, el) => this.renderCategoriesItems(el) + acc,
          '',
        )}
      </ul>`;
  }

  renderCategoriesItems({ title, id, image }) {
    return `
      <li class="categories-list__item" data-categories-id="${id}">
        <div class="card">
          <div class="card-image">
            <img src=${image} width="300" height="100">
          </div>
          <div class="card-content">
            <p class="card-title">${title}</p>
          </div>
        </div>
      </li>`;
  }
}

export default Menu;
