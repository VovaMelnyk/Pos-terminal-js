'use strict';
import M from 'materialize-css';
import styles from '../styles/addNewIngridients.css';

class AddNewIngridient {
  constructor(categoryIng, unitIng) {
    this.categoryIng = [{ name: 'first', value: '1' }, { name: 'second', value: '2' }, { name: 'third', value: '3' }];
    this.unitIng = [{ name: 'kilogram', value: '1' }, { name: 'gram', value: '2' }, { name: 'cup', value: '3' }];
  }


  renderForm() {
    return `
              <div class="container">
                  <div class="row">
                      <div class="col s12">
                          <div>
                            <a href="#">
                                <i class="medium material-icons dp48">chevron_left</i>
                            </a>
                                <h2 class="header">Добавление ингридиента</h2>
                            </div>
                          <div class="card horizontal">
                              <form action="">
                                  <div class="card-stacked">
                                      <div class="card-content">
                                      <div class="nameIngridient"></div>
                                      <div class="categoryIngridient"></div>
                                      <div class="unitIngridient"></div>
                                      </div>
                                      <div class="card-action">
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
            `;
  }

  renderInput() {
    return `
          Название
          <div class="input-field inline">
            <input id="email_inline" type="text" class="validate">
          </div>
    `;
  }

  renderCategorySelect() {
    return `
      <div class="input-field col s12">
        <select id="category">
          <option value="" disabled selected>Choose your option</option>
        </select>
        <label>Категория</label>
       </div>
    `;
  }

  renderUnitSelect() {
    return `
    <div class="input-field col s12">
        <select id="unit">
          <option value="" disabled selected>Choose your option</option>
        </select>
        <label>Единица измерения</label>
       </div>
    `;
  }


  initSelect(id) {
    document.addEventListener('DOMContentLoaded', function() {
      let elems = document.querySelector(id);
      let instances = M.FormSelect.init(elems);
    });
  }

  initOption(data, selector) {
    let option = data.map(function({ name, value }) {
      return `<option value="${value}">${name}</option>`;
    }).join('');
    const parent = document.querySelector(selector)
    parent.insertAdjacentHTML('beforeend', option);
  }


  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  start(container) {
    this.addToScreen(container, 'beforeend', this.renderForm());
    const nameIngridient = document.querySelector('.nameIngridient');
    this.addToScreen(nameIngridient, 'beforeend', this.renderInput());
    const categoryIngridient = document.querySelector('.categoryIngridient');
    this.addToScreen(categoryIngridient, 'beforeend', this.renderCategorySelect());
    const unitIngridient = document.querySelector('.unitIngridient');
    this.addToScreen(unitIngridient, 'beforeend', this.renderUnitSelect());
    this.initSelect('#category');
    this.initSelect('#unit');
    this.initOption(this.categoryIng, '#category');
    this.initOption(this.unitIng, '#unit');
  }
}

const newIng = new AddNewIngridient();
const root = document.querySelector('#root');
newIng.start(root);
export default AddNewIngridient;