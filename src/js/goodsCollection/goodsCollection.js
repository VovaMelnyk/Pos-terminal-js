import M from 'materialize-css';
import '../../styles/materialize/materialize.scss';
import '@/styles/materialize/materialize';
import './goodsCollection.css';
class GoodsCollection {
  constructor() {
    this.list = [
      {
        image: 'some image',
        name: 'bonaqua',
        category: 'вода',
        value: 100,
        price: 150,
        profit: 50,
        profitPercent: 500,
      },
      {
        image: 'some image',
        name: 'кекс',
        category: 'торт',
        value: 90,
        price: 110,
        profit: 80,
        profitPercent: 500,
      },
      {
        image: 'some image',
        name: 'evian',
        category: 'вода',
        value: 120,
        price: 100,
        profit: -20,
        profitPercent: 500,
      },
      {
        image: 'some image',
        name: 'cola',
        category: 'вода',
        value: 130,
        price: 170,
        profit: 40,
        profitPercent: 500,
      },
      {
        image: 'some image',
        name: 'coca-cola',
        category: 'вода',
        value: 180,
        price: 250,
        profit: 70,
        profitPercent: 500,
      },
    ];
    this.inputSearchLogic = this.inputSearchLogic.bind(this);
    this.findByCategoryLogic = this.findByCategoryLogic.bind(this);
    this.sortGoodsLogic = this.sortGoodsLogic.bind(this);
  }

  renderLayOut(container) {
    container.insertAdjacentHTML(
      'beforeend',
      `<header class="goods-header">
      <h2 class="goods-title">Товары <span class="goods-amount"></span></h2>
      <button class="add"><a href="#" class="add__link">Добавить</a></button>      
    </header>
    <main>
      <section class="search">
        <input type="text" id="search-input" placeholder="Быстрый поиск..." />
        <div class="categories">
          <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>категория </a>
          <ul id='dropdown1' class='dropdown-content categories-list'>
            
          </ul>
        </div>
      </section>
      <section class="list">
      <div class="title">
      <p id="image">img</p>
      <p id="name">название</p>
      <p id="category">категория</p>
      <p id="value">себестоимость</p>
      <p id="price">цена</p>
      <p id="profit">наценка</p>
      <p id="profitPercent">прибыль</p>
     </div>
      <ul class="goods-list"></ul>
      </section>
    </main>`,
    );
  }

  ////////////-----------------це робить клас Сергія-------------//////////////
  //тут tr
  renderGoodsListItem(good) {
    const goodsListItem = document.createElement('li');
    goodsListItem.classList.add('goodsListItem');
    for (const prop in good) {
      goodsListItem.insertAdjacentHTML(
        'beforeend',
        `<p class="${prop}">${good[prop]}</p>`,
      );
    }
    return goodsListItem;
  }
  /////////////---------------список категорій------------------///////////////////////
  categoriesListCreator() {
    const categoryList = this.list.map(el => el.category);
    const unique = [...new Set(categoryList)];
    const categories = document.querySelector('.categories-list');
    unique.map(unit => {
      categories.insertAdjacentHTML('beforeend', `<li><p>${unit}</p></li>`);
    });
  }

  ///////////////////---------------кількість товарів------------////////////////
  goodsAmount(list) {
    document.querySelector('.goods-amount').textContent = list.length;
  }

  // ///////////////////////-----------------список товарів---------------------///////////
  renderGoodsList(list) {
    const markup = list.reduce(
      (str, el) => str + this.renderGoodsListItem(el).outerHTML,
      '',
    );
    const goodsList = document.querySelector('.goods-list');
    goodsList.innerHTML = markup;
  }

  // ////////////////////---пошук за введеною назвою--------------///////////////
  inputSearchLogic(event) {
    const filteredGoods = this.list.filter(good =>
      good.name.includes(event.target.value.toLowerCase()),
    );
    this.renderGoodsList(filteredGoods);
    this.goodsAmount(filteredGoods);
  }

  inputSearch() {
    const inputField = document.querySelector('#search-input');
    inputField.addEventListener('input', this.inputSearchLogic);
  }
  // ////////////-------------- пошук по категорії  -----------------------////////////

  findByCategoryLogic(event) {
    const neededCategoryGoods = this.list.filter(
      good => good.category === event.target.textContent,
    );
    this.renderGoodsList(neededCategoryGoods);
    this.goodsAmount(neededCategoryGoods);
  }

  findByCategory() {
    const categories = document.querySelector('.categories-list');
    categories.addEventListener('click', this.findByCategoryLogic);
  }

  // //////////////------------------сортування--------------///////////////////
  sortGoodsLogic(event) {
    const goodClass = event.target.getAttribute('id');
    if (event.target !== event.currentTarget) {
      this.list.sort(function(a, b) {
        if (typeof a[goodClass] === 'string') {
          const x = a[goodClass].toLowerCase();
          const y = b[goodClass].toLowerCase();
          if (x > y) {
            return 1;
          } else if (x < y) {
            return -1;
          } else return 0;
        }
        return a[goodClass] - b[goodClass];
      });
      if (event.target.classList.contains('increase')) {
        this.list.sort(function(a, b) {
          if (typeof a[goodClass] === 'string') {
            const x = a[goodClass].toLowerCase();
            const y = b[goodClass].toLowerCase();
            if (x > y) {
              return -1;
            } else if (x < y) {
              return 1;
            } else return 0;
          }
          return b[goodClass] - a[goodClass];
        });
      }

      event.target.classList.toggle('increase');
      this.renderGoodsList(this.list);
    }
  }
  sortGoods() {
    const title = document.querySelector('.title');
    title.addEventListener('click', this.sortGoodsLogic);
  }

  ////////////////////////----------------старт---------------------////////////////////
  start(container) {
    this.renderLayOut(container);
    this.goodsAmount(this.list);
    this.categoriesListCreator();
    this.renderGoodsList(this.list);
    this.inputSearch();
    this.findByCategory();
    this.sortGoods();
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems);
    });
  }
}

export default GoodsCollection;
