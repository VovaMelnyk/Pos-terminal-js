'use strict';
import '@/styles/materialize/materialize';
import './CategoryIngridients.css';

// елемент Bадима принимает data возвращает tr
const allItem = data => {
  return data.reduce((acc, Item) => {
    acc += `
        <tr id='${Item.id}'>
            <td>${Item.name}</td>
            <td>${Item.amount}</td>
            <td>
                <a href="#" class="nav-title">edit</a>
            </td>
            <td>
                <a href="#" class="nav-title">...</a>
            </td>
        </tr>`;
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
    if (e.target.id === 'js-category') {
      this.sort.name = !this.sort.name;
      this.sort.amount = null;
      this.filterData({
        data: this.data,
        key: 'name',
        direction: this.sort.name,
      });
    }
    if (e.target.id === 'js-amount') {
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
    return `
    <table class="col s12 yesh-p0">
      <thead>
        <tr id="js__listener-table">
          <th class="col s4 m5 yesh-p0" id="js-category" >Категория</th>
          <th class="col s4 m5 yesh-p0-10" id="js-amount">Кол-во ингридиентов</th>
          <th class="col s2 m1 yesh-p0"></th>
          <th class="col s2 m1 yesh-p0"></th>
        </trid="jslistener">
      </thead>
      <tbody class="row">
        ${allItem(data)}
      </tbody>
    </table>
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
