'use strict';
import './hall.scss';
import { initOrder } from '@/js/controller';
export default class Hall {
  constructor() {
    this.table = [
      { id: '1', guest: 0 },
      { id: '2', guest: 0 },
      { id: '3', guest: 0 },
      { id: '4', guest: 0 },
      { id: '5', guest: 0 },
      { id: '6', guest: 0 },
      { id: '7', guest: 0 },
      { id: '8', guest: 0 },
      { id: '9', guest: 0 },
      { id: '10', guest: 0 },
      { id: '11', guest: 0 },
      { id: '12', guest: 0 },
      { id: '13', guest: 0 },
      { id: '14', guest: 0 },
      { id: '15', guest: 0 },
      { id: '16', guest: 0 },
    ];
    this.inputValue = 'Кількість гостей';
    this.guest = {};
    this.g = 0;
    this.isnElement = this.isnElement.bind(this);
    this.listTextContent = this.listTextContent.bind(this);
    this.objKey = this.objKey.bind(this);
  }

  renderHall() {
    return this.table.length
      ? `<div class="container">${this.table.reduceRight(
          (acc, el) => this.renderTable(el) + acc,
          '',
        )}       
        </div>`
      : null;
  }

  renderTable({ id }) {
    return `<div class="table" id="${id}">${id}<span class="table_item"></span>
            </div>`;
  }

  renderList() {
    return `<div class="list">
<ul>
            <li class="list_item">Кількість гостей</li>
            <li class="list_item">1</li>
            <li class="list_item">2</li>
            <li class="list_item">3</li>
            <li class="list_item">4</li>
            <li class="list_item">5</li>
            <li class="list_item">6</li>
            <li class="list_item">7</li>
            <li class="list_item">8</li>
            <li class="list_item">9</li>
            <li class="list_item">10</li>
        </ul></div>`;
  }

  renderListLastTable() {
    return `<div class="list list_last">
<ul>
            <li class="list_item">Кількість гостей</li>
            <li class="list_item">1</li>
            <li class="list_item">2</li>
            <li class="list_item">3</li>
            <li class="list_item">4</li>
            <li class="list_item">5</li>
            <li class="list_item">6</li>
            <li class="list_item">7</li>
            <li class="list_item">8</li>
            <li class="list_item">9</li>
            <li class="list_item">10</li>
        </ul></div>`;
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  renderListToClick(e) {
    e.preventDefault();
    if (e.target.tagName !== 'DIV') return;

    if (+e.target.firstChild.textContent <= 12) {
      e.target.insertAdjacentHTML('beforeend', this.renderList());
    } else {
      e.target.insertAdjacentHTML('beforeend', this.renderListLastTable());
    }
  }

  listTextContent(e) {
    e.preventDefault();
    if (e.target.tagName !== 'LI') return;
    let allGuest = Number(e.target.textContent);
    this.g.guest = allGuest;
    let tableNumber = this.table.find(item => item.guest === allGuest).id;

    const root = document.querySelector('#root');
    root.innerHTML = '';
    initOrder(root, allGuest, tableNumber);
  }

  objKey(e) {
    e.preventDefault();
    if (e.target.tagName !== 'DIV') return;
    this.g = this.table.find(
      table => table.id === e.target.firstChild.textContent,
    );
    if (this.g.guest !== 0) {
      e.target.classList.add('table_bgr');
    }
  }

  isnElement(e) {
    const list = document.querySelector('.list');
    if (list) {
      list.remove();
    } else {
      this.renderListToClick(e);
    }
  }

  addLisners() {
    const container = document.querySelector('.container');
    container.addEventListener('click', this.isnElement);
    container.addEventListener('click', this.listTextContent);
    container.addEventListener('click', this.objKey);
  }

  start(container) {
    this.addToScreen(container, 'beforeend', this.renderHall());
    this.addLisners();
  }
}
