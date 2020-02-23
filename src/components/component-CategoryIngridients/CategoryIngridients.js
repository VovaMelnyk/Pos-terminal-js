'use strict';
import '@/styles/materialize/materialize';
import '@/styles/fonts/material-design-icons/material-icons.css';
import './CategoryIngridients.scss';
const ID_DOM_EL = {
  name: 'js-category',
  amount: 'js-amount',
  finder: {
    clear: 'js__finder-clear',
    submit: 'js__finder-submit',
  },
};
// елемент Bадима принимает data возвращает li
const allItem = data => {
  return data.reduce((acc, Item) => {
    acc += `
        <li class="row yesh__item" id='${Item.id}'>
            <div class="col s4 m5" id="js-category">
              <div>${Item.name}</div>
            </div>
            <div class="col s4 m5">
              <div class="yesh__item-amount">${Item.amount}</div>
            </div>
            <div class="col s2 m1 yesh__item-btn">
              <a href="#" class="yesh-link">edit</a>
            </div>
            <div class="col s2 m1 yesh__item-btn">
              <span class="yesh-link">
                <i class="material-icons" id='${Item.id}'>clear</i>
              </span>
            </div>
        </li>`;
    return acc;
  }, '');
};
// конец елемента Bадима

// Moй елемент ничего не принемает
// Обязательно нужно вызвать два метода setData и render()
// render() принимает Дом родителя.
// Пример:
//    import data from './testData';
//    const root = document.querySelector('#root');
//    const module = new CategoryIngridients();
//    module.setData = data;
//    module.render(root);
class CategoryIngridients {
  constructor() {
    this.data = [];
    this.filter = null;
    this.timeoutID = null;
    this.sort = { name: null, amount: null };
  }

  // getter and setter
  get getData() {
    return this.data;
  }
  set setData(newData) {
    this.data = newData;
  }

  //-----// Other function //-----//

  // поиск в списке по значению не мутирует this.data
  filterByFinder(data) {
    const filter = this.filter === null ? '' : this.filter;
    return data.filter(ingridient =>
      ingridient.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  renderForSubmit() {
    if (this.filter === '') {
      this.render(this.DOM_ELEMENT);
    } else {
      const result = this.filterByFinder(this.data);
      this.render(this.DOM_ELEMENT, result);
    }
  }
  //onChangeFilter and finderData on timeout
  onChangeFilter(e) {
    this.filter = e.target.value;
    window.clearTimeout(this.timeoutID);
    this.timeoutID = window.setTimeout(() => this.renderForSubmit(), 800);
  }
  // clear filter on click X
  onClickFilter(e) {
    const { id } = e.target;
    const { clear } = ID_DOM_EL.finder;
    if (id === clear) {
      this.filter = '';
      this.render(this.DOM_ELEMENT);
      return;
    }
    // else if( id === submit ){
    //   this.renderForSubmit()
    // }
  }
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
        return firstEl[key] > secondEl[key] ? -1 : 1;
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
  summerySortData(id) {
    if (id === ID_DOM_EL.name) {
      this.sort.name = !this.sort.name;
      this.sort.amount = null;
      const result = this.sortData({
        data: this.data,
        key: 'name',
        direction: this.sort.name,
      });
      this.render(this.DOM_ELEMENT, this.filterByFinder(result));
    }
    if (id === ID_DOM_EL.amount) {
      this.sort.amount = !this.sort.amount;
      this.sort.name = null;
      const result = this.sortData({
        data: this.data,
        key: 'amount',
        direction: this.sort.amount,
      });
      this.render(this.DOM_ELEMENT, this.filterByFinder(result));
    }
  }
  // удаление елемента
  filterDataById(data, id) {
    return data.filter(category => category.id !== id);
  }
  deleteCategory(e) {
    const { id } = e.target;

    const args = newData => {
      if (this.sort.name !== null) {
        return {
          data: newData,
          key: 'name',
          direction: this.sort.name,
        };
      } else if (this.sort.amount !== null) {
        return {
          data: newData,
          key: 'amount',
          direction: this.sort.amount,
        };
      } else {
        return {
          data: newData,
          key: 'name',
          direction: this.sort.name,
        };
      }
    };
    const filterData = this.filterByFinder(this.data, this.filter);
    this.data = this.filterDataById(this.data, id);
    if (filterData.length > 0) {
      const filterDataId = this.filterDataById(filterData, id);
      const result = this.sortData(args(filterDataId));
      this.render(this.DOM_ELEMENT, result);
      return;
    } else if (id.length > 0) {
      const result = this.sortData(args(this.data));
      this.render(this.DOM_ELEMENT, result);
    }
  }
  //создание разметки шапки
  elementHeader() {
    return `
    <section class="row yesh__section-header">
        <div class="col s9 m10 l11 yesh-m0 yesh-p0">
          <div class="row yesh__title">
            <h4 class="col yesh__title-text">
              Категории ингридиентов
              <span class=" grey-text text-lighten-1 yesh__title-amount">
                ${this.data.length}
              </span>
            </h4>
          </div>
        </div>
        <div class="col s3 m2 l1 yesh__header-btn">
            <a href="#" class="yesh__btn-add">Добавить</a>
        </div>
    </section>
      `;
  }

  //создание разметки поиска
  elementFinder() {
    const value = this.filter === null ? '' : this.filter;
    const inputClass =
      value.length > 0 ? 'yesh__input-clear isActive' : 'yesh__input-clear';
    return `
    <div class="row yesh__section-finder">
      <div class="col s12 m6 l4 yesh__finder-wrap" >
        <div class="row yesh__finder-input" id="js__listener-finder">
          <i class="material-icons yesh__input-submit" id="js__finder-submit">search</i>
          <input value="${value}" autofocus tabindex="0" autocomplete="off" class="yesh-input" type="search" placeholder="Быстрый поиск" id="js__finder-Input"/>
          <i class="material-icons ${inputClass}" id="js__finder-clear">clear</i>
        </div>
      </div>
    </div>
      `;
  }
  //создание разметки таблицы + елемент Вадима
  elementList(data) {
    const icon = key => {
      return this.sort[key] !== null
        ? `<i class="material-icons yesh__sort-arrow">
              ${this.sort[key] ? 'arrow_drop_up' : 'arrow_drop_down'}
            </i>`
        : '';
    };
    return `
    <section class="row yesh__section-list">
            <div class="row yesh__list-head" id="js__listener-table">
                <div class="col s4 m5 yesh__list-name" id="js-category">
                  <div>Категория</div>
                  <div class="yesh__arrow-wrap">${icon('name')}</div>
                </div>
                <div class="col s4 m5 yesh__list-name yesh__item-amount" id="js-amount">
                  <div>Кол-во ингридиентов</div>
                  <div class="yesh__arrow-wrap">${icon('amount')}</div>
                </div>
                <div class="col s2 m1">
                
                </div>
                <div class="col s2 m1">
                
                </div>
            </div>
        <ul class="col s12 yesh__list" id="js__listener-deleteCategory">
            ${allItem(data)}
        </ul>
    </section>
    `;
  }
  removeListener() {
    const listenerFinder = document.querySelector('#js__listener-finder');
    const listenerTable = document.querySelector('#js__listener-table');
    const listenerDeleteCategory = document.querySelector(
      '#js__listener-deleteCategory',
    );
    if (!listenerFinder) return;
    listenerFinder.removeEventListener('input', e => {
      this.onChangeFilter(e);
    });
    if (!listenerFinder) return;
    listenerFinder.removeEventListener('click', e => {
      this.onClickFilter(e);
    });
    if (!listenerTable) return;
    listenerTable.removeEventListener('click', e =>
      this.summerySortData(e.target.parentNode.id),
    );
    if (!listenerDeleteCategory) return;
    listenerTable.removeEventListener('click', e => this.deleteCategory(e));
  }
  addListener() {
    // Слушатели поиска
    const listenerFinder = document.querySelector('#js__listener-finder');
    listenerFinder.addEventListener('input', e => {
      this.onChangeFilter(e);
    });
    listenerFinder.addEventListener('click', e => {
      this.onClickFilter(e);
    });

    // Слушатель сортировки
    const listenerTable = document.querySelector('#js__listener-table');
    // console.log('add listenerTable');
    listenerTable.addEventListener('click', e =>
      this.summerySortData(e.target.parentNode.id),
    );

    // Слушатель удаления
    const listenerDeleteCategory = document.querySelector(
      '#js__listener-deleteCategory',
    );
    listenerDeleteCategory.addEventListener('click', e =>
      this.deleteCategory(e),
    );
  }

  //Render render(domElement, data = this.data)
  preRender(data = this.data) {
    return `
    <section class="yesh-container yesh-p0">
      ${this.elementHeader()}
      ${this.elementFinder()}
      ${this.elementList(data)}
    </section>
      `;
  }
  render(domElement, data) {
    this.removeListener();
    this.DOM_ELEMENT = domElement;
    this.DOM_ELEMENT.innerHTML = `${this.preRender(data)}`;
    this.addListener();
  }
}

export default CategoryIngridients;

// Дата для проверки
import data from './testData';
const root = document.querySelector('#root');
// создаем екземпляр
const module = new CategoryIngridients();
//записываем данные с сервера или файла в data
module.setData = data;
//рендер в нужный DOM елемент
module.render(root);
