'use strict';
import '@/styles/materialize/materialize';
import './CategoryIngridients.css';

// елемент Bадима принимает data возвращает tr
const allItem = data => {
  return data.reduce((acc, Item) => {
    acc += `
        <li class="row yesh__list" id='${Item.id}'>
            <div class="col s4 m5" id="js-category">
              <div>${Item.name}</div>
            </div>
            <div class="col s4 m5">
              <div>${Item.amount}</div>
            </div>
            <div class="col s2 m1 yesh-jcfe">
              <a href="#" class="yesh-link">edit</a>
            </div>
            <div class="col s2 m1 yesh-jcfe">
              <a href="#" class="yesh-link">...</a>
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
    this.sort = { name: null, amount: null };
  }

  // getter and setter
  get getData() {
    return this.data;
  }
  set setData(newData) {
    this.data = newData;
  }

  //Other function
  finderData(e) {
    if (e.target.elements[0].value === '') {
      this.render(this.DOM_ELEMENT);
    } else {
      const filter = this.data.filter(
        ingridient => ingridient.name === e.target.elements[0].value,
      );
      this.render(this.DOM_ELEMENT, filter);
    }
  }
  filterData({ data, key, direction }) {
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
      this.render(this.DOM_ELEMENT, result);
    }
  }
  summeryFilterData(e) {
    const { id } = e.target.parentNode;
    if (id === 'js-category') {
      this.sort.name = !this.sort.name;
      this.sort.amount = null;
      this.filterData({
        data: this.data,
        key: 'name',
        direction: this.sort.name,
      });
    }
    if (id === 'js-amount') {
      this.sort.amount = !this.sort.amount;
      this.sort.name = null;
      this.filterData({
        data: this.data,
        key: 'amount',
        direction: this.sort.amount,
      });
    }
  }
  //создание разметки шапки
  elementHeader() {
    return `
    <div class="row yesh-m0 yesh-aic yesh-fww yesh-p0">
        <div class="col s12 m9 yesh-m0 yesh-p0">
          <div class="row yesh-m0 yesh-p10-0">
            <h4 class="col yesh-m0 yesh-p0">
              Категории ингридиентов
              <span class=" grey-text text-lighten-1 yesh-m0">
                ${this.data.length}
              </span>
            </h4>
          </div>
        </div>
        <div class="col s12 m3 yesh-aic yesh-jcfe yesh-p0">
            <a href="#" class="yesh-aic yesh-btn">Добавить</a>
        </div>
    </div>
      `;
  }

  //создание разметки поиска
  elementFinder() {
    return `
    <div class="row">
      <div class="col s12 m6 yesh-p0">
        <form class="input action="" id="js__listener-finder">
          <div>
            <input class="grey-text text-lighten-1 mainLoginInput yesh-p0" type="text" placeholder="&#61442; Быстрый поиск"/>
          </div>
        </form>
      </div>
    </div>
      `;
  }
  //создание разметки таблицы + елемент Вадима
  elementList(data) {
    const icon = key => {
      return this.sort[key] !== null
        ? `<i class="material-icons yesh-fz">
              ${this.sort[key] ? 'arrow_drop_up' : 'arrow_drop_down'}
            </i>`
        : '';
    };
    return `
    <section class="row yesh yesh-m0-10">
        <ul class="col s12 yesh-p0" >
            <li class="row yesh__list yesh__list-head yesh-aic" id="js__listener-table">
                <div class="col s4 m5 yesh-aic yesh-min-h30" id="js-category">
                  <div>Категория</div>
                  <div>${icon('name')}</div>
                </div>
                <div class="col s4 m5 yesh-aic yesh-min-h30" id="js-amount">
                  <div>Кол-во ингридиентов</div>
                  <div>${icon('amount')}</div>
                </div>
                <div class="col s2 m1">
                
                </div>
                <div class="col s2 m1">
                
                </div>
            </li>
            ${allItem(data)}
        </ul>
    </section>
    `;
  }
  removeListener() {
    const listenerFinder = document.querySelector('#js__listener-finder');
    const listenerTable = document.querySelector('#js__listener-table');
    if (!listenerFinder) return;
    listenerFinder.removeEventListener('submit', e => {
      e.preventDefault();
      this.finderData(e);
    });
    if (!listenerTable) return;
    listenerTable.removeEventListener('click', e => this.summeryFilterData(e));
  }
  addListener() {
    // Слушатель поиска
    const listenerFinder = document.querySelector('#js__listener-finder');
    listenerFinder.addEventListener('submit', e => {
      e.preventDefault();
      this.finderData(e);
    });

    // Слушатель сортировки
    const listenerTable = document.querySelector('#js__listener-table');
    // console.log('add listenerTable');
    listenerTable.addEventListener('click', e => this.summeryFilterData(e));
  }

  //Render render(domElement, data = this.data)
  preRender(data = this.data) {
    return `
    <section class="container yesh-p0">
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
