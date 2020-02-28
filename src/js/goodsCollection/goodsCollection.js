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
    this.isFiltered = false;
    this.filteredList = [];
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
          <select class="categories-list">
            <option value="" selected>Категория</option>
          </select>
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
      categories.insertAdjacentHTML(
        'beforeend',
        `<option class="categories-list__item">${unit}</option>`,
      );
    });
  }

  ///////////////////---------------кількість товарів------------////////////////
  goodsAmount(list) {
    document.querySelector('.goods-amount').textContent = list.length;
  }

  // ////////////////------------список товарів---------------------///////////
  renderGoodsList(list) {
    const markup = list.reduce(
      (str, el) => str + this.renderGoodsListItem(el).outerHTML,
      '',
    );
    const goodsList = document.querySelector('.goods-list');
    goodsList.innerHTML = markup;
  }

  /////////////------пошук за введеною назвою--------------///////////////
  inputSearchLogic(event) {
    const filteredGoods = this.list.filter(good =>
      good.name.includes(event.target.value.toLowerCase()),
    );
    this.renderGoodsList(filteredGoods);
    this.goodsAmount(filteredGoods);
    if (event.target.value) {
      this.isFiltered = true;
      this.filteredList = filteredGoods;
    } else {
      this.isFiltered = false;
      this.filteredList = [];
    }
  }

  inputSearch() {
    const inputField = document.querySelector('#search-input');
    inputField.addEventListener('input', this.inputSearchLogic);
  }
  // ////////////--------------пошук по категорії-----------------------////////////

  findByCategoryLogic(event) {
    if (event.target.value !== '') {
      const neededCategoryGoods = this.list.filter(
        good => good.category === event.target.value,
      );
      this.renderGoodsList(neededCategoryGoods);
      this.goodsAmount(neededCategoryGoods);
      this.isFiltered = true;
      this.filteredList = neededCategoryGoods;
    } else {
      this.renderGoodsList(this.list);
      this.goodsAmount(this.list);
      this.isFiltered = false;
      this.filteredList = [];
    }
  }

  findByCategory() {
    const categories = document.querySelector('.categories');
    categories.addEventListener('click', this.findByCategoryLogic);
  }

  // //////////////------------------сортування--------------///////////////////
  sortGoodsLogic(event) {
    const goodClass = event.target.getAttribute('id');
    let list = [];
    if (this.isFiltered) {
      list = this.filteredList;
    } else {
      list = this.list;
    }

    if (event.target !== event.currentTarget) {
      list.sort(function(a, b) {
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
        list.sort(function(a, b) {
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
      this.renderGoodsList(list);
      console.log('ss');
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
  }
}

export default GoodsCollection;
