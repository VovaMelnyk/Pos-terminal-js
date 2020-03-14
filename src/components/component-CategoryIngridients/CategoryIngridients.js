'use strict';
import '@/styles/materialize/materialize';
import '@/styles/fonts/material-design-icons/material-icons.css';
import './CategoryIngridients.scss';
import IngredientsList from './IngredientsList';
import NewCategoryIngridients from '../newCategoryIngredient/newCategoryIngredient';
const ID_DOM_EL = {
  name: 'js__category-name',
  amount: 'js__category-amount',
  finder: {
    clear: 'js__finder-clear',
    submit: 'js__finder-submit',
  },
  list: { empty: 'js__list-empty' },
  listener: {
    categoryAmount: 'js__category-amount',
    categoryAdd: 'js__category-add',
    finder: 'js__listener-finder',
    table: 'js__listener-table',
    allList: 'js__listener-deleteCategory',
  },
};
class CategoryIngredients {
  constructor(renderThisDomElement) {
    this.dom = renderThisDomElement;
    this.refs = {};
    this.data = [];
    this.newData = [];
    this.filter = '';
    this.sort = { name: null, amount: null };
  }

  //-----// Функции разметки //-----//
  //создание разметки шапки
  elementHeader = () => {
    return `
    <section class="row yesh__section-header">
        <div class="col s9 m10 l11 yesh-m0 yesh-p0">
          <div class="row yesh__title">
            <h4 class="yesh__title-text">
              Категории ингредиентов
              <span class=" grey-text text-lighten-1 yesh__title-amount" id="${ID_DOM_EL.listener.categoryAmount}">
                0
              </span>
            </h4>
          </div>
        </div>
        <div class="col s3 m2 l1 yesh__header-btn" id="${ID_DOM_EL.listener.categoryAdd}">
            <span class="yesh__btn-add">Добавить</span>
        </div>
    </section>
      `;
  };

  //создание разметки поиска
  elementFinder = () => {
    return `
    <div class="row yesh__section-finder">
      <div class="col s12 m6 l4 yesh__finder-wrap" >
        <div class="row yesh__finder-input" id="${ID_DOM_EL.listener.finder}">
          <i class="material-icons yesh__input-submit" id="${ID_DOM_EL.finder.submit}">search</i>
          <input value="" autofocus tabindex="0" autocomplete="off" class="yesh-input" type="search" placeholder="Быстрый поиск"/>
          <i class="material-icons yesh__input-clear" id="${ID_DOM_EL.finder.clear}">clear</i>
        </div>
      </div>
    </div>
      `;
  };

  //создание разметки таблицы для елемента Вадима
  elementListHead = () => {
    return `
    <section class="row yesh__section-list">
            <div class="row yesh__list-head" id="${ID_DOM_EL.listener.table}">
                <div class="col s4 m5 yesh__list-name" id="${ID_DOM_EL.name}">
                  <div class="yesh__noClick">Категория</div>
                  <div class="yesh__arrow-wrap"></div>
                </div>
                <div class="col s4 m5 yesh__list-name yesh__item-amount" id="${ID_DOM_EL.amount}">
                  <div  class="yesh__noClick">Кол-во ингредиентов</div>
                  <div class="yesh__arrow-wrap"></div>
                </div>
                <div class="col s2 m1">
                </div>
                <div class="col s2 m1">
                </div>
            </div>
        <ul class="col s12 yesh__list" id="${ID_DOM_EL.listener.allList}">
        </ul>
    </section>
    `;
  };

  //-----// other function //-----//
  // get fetch
  getDataByFetch = () => {
    return fetch(
      'https://pos-terminal-caffe.firebaseio.com/categoryIngredient.json',
      {
        method: 'GET',
      },
    )
      .then(res => res.json())
      .then(data => {
        return Object.keys(data).map(key => ({
          ...data[key],
          id: key,
        }));
      })
      .catch(error => console.log(error));
  };

  updateData = data => {
    this.data = data;
    this.newData = this.data;
  };
  //---// функции поиска //---//
  // Фильтрация this.data по this.filter
  filterByFinder() {
    const filter = this.filter === null ? '' : this.filter;
    return this.data.filter(ingredient =>
      ingredient.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }
  // контролируем ввод записывая значение в this.filter. Отрисовываем очиску инпута и обновляем список.
  onChangeFinder = () => {
    this.filter = this.refs.finder.children[1].value;
    if (this.filter.length > 0) {
      this.refs.finder.children[2].classList.add('isActive');
    } else {
      this.refs.finder.children[2].classList.remove('isActive');
    }
    this.newData = this.filterByFinder();
    this.update();
  };
  // Очищаем значение инпута и this.filter. скрываем очиску инпута и обновляем список.
  onClickFinder = () => {
    this.refs.finder.children[1].value = '';
    this.filter = this.refs.finder.children[1].value;
    this.refs.finder.children[2].classList.remove('isActive');
    this.newData = this.filterByFinder();
    this.update();
  };
  // сортировка елементов в масиве по ключу и направлениям
  sortData({ data, key, direction }) {
    if (direction !== null) {
      const sortData = JSON.parse(JSON.stringify(data));

      const sortUp = function(firstEl, secondEl) {
        if (firstEl[key] === secondEl[key]) 0;
        return firstEl[key] > secondEl[key] ? 1 : -1;
      };

      const sortDown = function(firstEl, secondEl) {
        if (firstEl[key] === secondEl[key]) 0;
        return firstEl[key] < secondEl[key] ? 1 : -1;
      };

      const result = sortData.sort((a, b) => {
        function sortDirection(direction, a, b) {
          return direction ? sortUp(a, b) : sortDown(a, b);
        }
        return sortDirection(direction, a, b);
      });
      return result;
    }
  }
  // сортировка елементов по колонке
  summerySortData = () => {
    if (this.sort.name !== null) {
      const result = this.sortData({
        data: this.newData,
        key: 'name',
        direction: this.sort.name,
      });
      this.newData = result;
      return;
    }
    if (this.sort.amount !== null) {
      const result = this.sortData({
        data: this.newData,
        key: 'amount',
        direction: this.sort.amount,
      });
      this.newData = result;
      return;
    }
  };
  clickSortData = e => {
    const { id } = e.target;
    if (id === ID_DOM_EL.name) {
      this.sort.name = !this.sort.name;
      this.sort.amount = null;
      this.update();
      return;
    }
    if (id === ID_DOM_EL.amount) {
      this.sort.amount = !this.sort.amount;
      this.sort.name = null;
      this.update();
      return;
    }
  };
  //---// function remove categories ingredients
  postFetchDeleteIngredient = id => {
    return fetch(
      `https://pos-terminal-caffe.firebaseio.com/categoryIngredient/${id}.json`,
      {
        method: 'DELETE',
      },
    ).then(res => res.json());
  };
  //deleteCategory
  clickOnCategory = e => {
    const { id } = e.target;
    if (id === ID_DOM_EL.list) return;
    if (id === 'js__category-delete') {
      this.postFetchDeleteIngredient(e.target.parentElement.id).then(() => {
        this.getDataByFetch()
          .then(data => {
            this.updateData(data);
            return;
          })
          .then(() => {
            this.update();
          });
      });
    }
    if (id === 'js__category-edit') {
      // this.dom.innerHTML = '';
      alert('Страница редактирования не нейдена');
    }
  };
  addNewCategoryIngridients = () => {
    this.dom.innerHTML = '';
    new NewCategoryIngridients().start();
  };
  addListaner = () => {
    // add
    this.refs.categoryAdd.addEventListener(
      'click',
      this.addNewCategoryIngridients,
    );
    // Слушатели поиска
    this.refs.finder.addEventListener('input', this.onChangeFinder);
    this.refs.finder.addEventListener('click', this.onClickFinder);
    // Слушатель сортировки
    this.refs.table.addEventListener('click', e => this.clickSortData(e));
    // Слушатель удаления
    this.refs.allList.addEventListener('click', this.clickOnCategory);
  };
  addRefs = () => {
    this.refs.categoryAmount = document.querySelector(
      `#${ID_DOM_EL.listener.categoryAmount}`,
    );
    this.refs.categoryAdd = document.querySelector(
      `#${ID_DOM_EL.listener.categoryAdd}`,
    );
    this.refs.finder = document.querySelector(`#${ID_DOM_EL.listener.finder}`);
    this.refs.table = document.querySelector(`#${ID_DOM_EL.listener.table}`);
    this.refs.allList = document.querySelector(
      `#${ID_DOM_EL.listener.allList}`,
    );
  };
  update = () => {
    if (this.refs.categoryAmount.textContent !== this.data.length) {
      this.refs.categoryAmount.textContent = this.data.length;
    }
    this.newData = this.filterByFinder();
    this.summerySortData();
    const ingredientsList = new IngredientsList(this.newData);
    this.refs.allList.innerHTML = ingredientsList.init();
  };
  render = () => {
    return `
      <section class="yesh-container yesh-p0">
        ${this.elementHeader()}
        ${this.elementFinder()}
        ${this.elementListHead()}
      </section>
    `;
  };

  init = () => {
    this.getDataByFetch()
      .then(data => this.updateData(data))
      .then(() => {
        this.dom.innerHTML = this.render();
        this.addRefs();
        this.update();
        this.addListaner();
      });
  };
}

export default CategoryIngredients;
// const root = document.querySelector('#root');
// new CategoryIngredients(root).init();
