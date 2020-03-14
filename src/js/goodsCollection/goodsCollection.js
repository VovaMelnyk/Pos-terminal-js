import Add_OneClass_Good from '../one-class-good/add_class_one_good';
const oneGood = new Add_OneClass_Good();
import './goodsCollection.scss';

class GoodsCollection {
  constructor() {
    this.list = [];

    this.isFiltered = false;
    this.filteredList = [];
    this.inputSearchLogic = this.inputSearchLogic.bind(this);
    this.findByCategoryLogic = this.findByCategoryLogic.bind(this);
    this.sortGoodsLogic = this.sortGoodsLogic.bind(this);
    /////////////////
    this.modalOpenLogic = this.modalOpenLogic.bind(this);
    this.modalCloseLogic = this.modalCloseLogic.bind(this);
    this.addGoodLogic = this.addGoodLogic.bind(this);
    //////////
    this.renderLayOut = this.renderLayOut.bind(this);
  }

  renderLayOut(container) {
    const layout = `<div class="content-header">
    <h2 class="content-header__title">Товары <span class="content-header__quantity"></span></h2>
    <a href="#" class="add__link"><button class="content-header__button goodsCollectionAddButton">Добавить</button> </a>     
  </div>
  <main>
    <section class="search">
    <form class="search-form">
      <input type="text" class="search-form__input" placeholder="Быстрый поиск..."/>
    </form>
      <div class="categories">
      <select class="categories-list">
      <option selected>Категория </option>
        </select>
      </div>
    </section>
    <section class="goodsCollection__modal goodsCollection__modal--hiden">
    <input type="text" class="goodName" placeholder="назва" />
    <input type="text" class="goodCategory" placeholder="категорія" />
    <input type="text" class="goodValue" placeholder="вартість" />
    <input type="text" class="goodPrice" placeholder="ціна" />
    <button class="goodsCollection__modal--close">X</button>
    <button type="submit" class="goodsCollection__addGood--submit">submit</button>

  </section>
    <section class="list">
      <div class="goods-title">
        <p id="name">название</p>
        <p id="category">категория</p>
        <p id="value">себестоимость</p>
        <p id="price">цена</p>
        <p id="profit">прибыль</p>
        <p id="profitPercent">наценка</p>
        <p class="reductGood"></p>
        <p class="deleteGood"></p>
      </div>
      <ul class="goods-list"></ul>
    </section>
 

  </main>`;
    container.insertAdjacentHTML('beforeend', layout);
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
    document.querySelector('.content-header__quantity').textContent =
      list.length;
  }

  // ////////////////------------список товарів---------------------///////////
  renderGoodsList(list) {
    const markup = list.reduce(
      (str, el) => str + oneGood.renderGoodsListItem(el).outerHTML,
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
    const inputField = document.querySelector('.search-form__input');
    inputField.addEventListener('input', this.inputSearchLogic);
  }
  // ////////////--------------пошук по категорії-----------------------////////////

  findByCategoryLogic(event) {
    if (event.target.value !== 'Категория') {
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

  /////////////------------------сортування--------------///////////////////
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
    }
  }

  sortGoods() {
    const title = document.querySelector('.goods-title');
    title.addEventListener('click', this.sortGoodsLogic);
  }

  //////////////////////

  modalOpenLogic() {
    const modal = document.querySelector('.goodsCollection__modal');
    modal.classList.replace(
      'goodsCollection__modal--hiden',
      'goodsCollection__modal--show',
    );
  }

  modalOpen() {
    const addButton = document.querySelector('.goodsCollectionAddButton');
    addButton.addEventListener('click', this.modalOpenLogic);
  }

  modalCloseLogic() {
    const modal = document.querySelector('.goodsCollection__modal');
    modal.classList.replace(
      'goodsCollection__modal--show',
      'goodsCollection__modal--hiden',
    );
  }

  modalClose() {
    const closeButton = document.querySelector(
      '.goodsCollection__modal--close',
    );
    closeButton.addEventListener('click', this.modalCloseLogic);
  }

  ///////////////////////////////

  clearFields() {
    const nameField = document.querySelector('.goodName');
    const categoryField = document.querySelector('.goodCategory');
    const valueField = document.querySelector('.goodValue');
    const priceField = document.querySelector('.goodPrice');

    nameField.value = '';
    categoryField.value = '';
    valueField.value = '';
    priceField.value = '';
  }

  addGoodLogic() {
    const nameField = document.querySelector('.goodName');
    const categoryField = document.querySelector('.goodCategory');
    const valueField = document.querySelector('.goodValue');
    const priceField = document.querySelector('.goodPrice');

    const newGood = {};

    newGood.name = nameField.value;

    newGood.category = categoryField.value;

    newGood.value = valueField.value;

    newGood.price = priceField.value;

    const url = 'https://pos-terminal-caffe.firebaseio.com/';
    const folder = 'goods';

    fetch(url + folder + '.json', {
      method: 'POST',
      body: JSON.stringify(newGood),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resolve => resolve.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));

    this.clearFields();
  }

  addGood() {
    const button = document.querySelector('.goodsCollection__addGood--submit');
    button.addEventListener('click', this.addGoodLogic);
  }

  thisListCreator() {
    const url = 'https://pos-terminal-caffe.firebaseio.com/goods.json';
    fetch(url)
      .then(resolve => resolve.json())
      .then(data => Object.values(data))
      .then(arr => {
        this.list = arr;
        this.goodsAmount(arr);
        this.categoriesListCreator(arr);
        this.renderGoodsList(arr);
        this.inputSearch();
        this.findByCategory();
        this.sortGoods();
      });
  }

  /////////////////////////

  ////////////////////////----------------старт---------------------////////////////////
  start(container) {
    this.renderLayOut(container);

    //////////////
    this.modalOpen();
    this.modalClose();
    this.addGood();

    //////////
    this.thisListCreator();
  }
}

export default GoodsCollection;
