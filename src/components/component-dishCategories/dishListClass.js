import array from './js/arrayOfList.js';
// import dishCategories from './js/fetchDishCategories';
import dishCategories from './js/dishCategories';
import '@/components/component-dishCategories/css/style';
import '@/components/category-list/category-list.scss';

class ClassOfProducts {
  constructor() {
    this.array = array;
    this.dishCategories = dishCategories;
    this.selectCategoryFilter = this.selectCategoryFilter.bind(this);
    this.startToFilter = this.startToFilter.bind(this);
    this.searchProductFast = this.searchProductFast.bind(this);
    console.log(this.dishCategories);
  }

  // ----Renders

  renderTechCard() {
    return `<div class="content-header">
    <div class="pull-left">
        <h2 class="content-header__title">Тех. карты <span class="content-header__quantity quantity">13</span></h2>
    </div>
    <div class="pull-right">
        <div class="segmented-buttons">
        </div>
        <div class="ib">
            <a href="#"><button class="content-header__button">Добавить</button></a>
        </div>
</div>`;
  }

  renderFilterArea() {
    return `<div class="filters-container">
    <div class="fast-search form-search ib">
        <input type="search" value="" class="form-control search-form__input" placeholder="Быстрый поиск">
    </div>


    <select id="select1" name="select" class="select_style">
${this.addDataOfSelect()}
    <option selected="selected">Все категории</option>
  </select>
        
</div>`;
  }

  addOptionOfSelect(obj) {
    return `<option>${obj.name}</option>`;
  }

  addDataOfSelect() {
    return this.dishCategories.map(el => this.addOptionOfSelect(el)).join('');
  }


  
  // addDataOfSelect() {
  //   return this.dishCategories()
  //   .then(data => { addOptionOfSelect(data); console.log(data)})
  // }

  renderTableHead() {
    return ` <table id="table-of-dishes" class="table simple-little-table">
   <thead class="false">
    <tr>
        <th class="name-of-dish" style="text-align: left; width: 400px;">Название<span class="caret caret-up"></span>
        </th>
        <th class="category" style="text-align: left;">Категория
        </th>
        <th class="cost-of-production" style="text-align: right;">Себестоимость
        </th>
        <th class="final-price" style="text-align: right;">Цена
        </th>
        <th class="extra-charge" style="text-align: right;">Наценка
        </th>
        <th class="" style="text-align: right;"> Состав
        </th>
        <th class="" style="text-align: right;"> Ред.
        </th>
        <th class="" style="text-align: left;"> ...
        </th>
    </tr>
</thead>

<tbody class="lines">
</tbody>

</table>`;
  }

  addToScreen(container, place, element) {
    container.insertAdjacentHTML(place, element);
  }

  insertPartsOfHTML(container) {
    // const container = document.querySelector(".module");

    this.addToScreen(container, 'afterbegin', this.renderFilterArea());
    this.addToScreen(container, 'afterbegin', this.renderTechCard());
    this.addToScreen(container, 'beforeend', this.renderTableHead());
  }

  //________filters

  selectCategoryFilter(arr) {
    const select = document.querySelector('#select1');
    const value = select.value;
    if (select.value === 'Все категории') {
      return arr;
    } else {
      let a = arr.filter(el => el.dishSelectCategory === value);
      return a;
    }
  }

  searchProductFast(arr) {
    let input = document.querySelector('.form-control');
    let value = input.value.toLowerCase();
    let searchArray = arr.filter(obj =>
      obj.dishName.toLowerCase().includes(value),
    );
    return searchArray;
  }

  // ___render table data

  renderTableLine(obj) {
    return `        
      <tr class="line">
          <td class="products-name" title=${obj.dishName} style="text-align: left; width: 200px;">
              <div class="table-product-name">
                  <div class="item-img"><img src=${obj.dishImg} width="48" height="35">
                  </div>
                  <div class="item-desc">${obj.dishName}
                  </div>
              </div>
          </td>
          <td class="" title=${obj.dishSelectCategory} style="text-align: left; width: 10%"><span><span class="table-cell-value">${obj.dishSelectCategory}</span></span>
          </td>
          <td class="" title=${obj.dishSelfPrice} style="text-align: right; font-weight: bold; width: 8%"><span><span class="table-cell-value"><span><span style="color: inherit;"></span><span style="color: inherit;">${obj.dishSelfPrice} </span><span style="color: inherit;">₴</span></span></span></span>
          </td>
          <td class="editable" title=${obj.dishFinalPrice} style="text-align: right; font-weight: bold; width: 8%"><span><span class="table-cell-value"><span><span style="color: inherit;"></span><span style="color: inherit;">${obj.dishFinalPrice} </span><span style="color: inherit;">₴</span></span></span></span>
          </td>
          <td class="editable" title=${obj.dishExtraCharge} style="text-align: right; width: 8%"><span><span class="table-cell-value"><span>${obj.dishExtraCharge}%</span></span></span>
          </td>
          <td class="" title="Состав" style="text-align: right; width: 8%"><span><span class="table-cell-value"><a href="#" class="consist">Состав</a></span></span>
          </td>
          <td class="" title="Ред." style="text-align: right; width: 8%"><span><span class="table-cell-value">
              <a href="#">Ред.
              </a></span></span>
          </td>
          <td class="no-overflow actions-cell" title="" style="text-align: left; max-width: 40px;"><span><span class="table-cell-value">
              <div><div class=""><button type="button" class="btn btn-edit-ellipsis btn-open"></button>
              </div></div></span></span>
              </td>
              </tr>
`;
  }

  renderTableData(arrFin) {
    let render = arrFin.map(el => this.renderTableLine(el)).join('');
    return render;
  }

  addScreen(arrFin) {
    let addScreen = document.querySelector('.lines');
    addScreen.innerHTML = '';
    this.addToScreen(addScreen, 'beforeend', this.renderTableData(arrFin));
  }

  quantityOfDishes(arrFin) {
    const quantity = document.querySelector('.quantity');
    return (quantity.textContent = arrFin.length);
  }

  searchListener() {
    let input = document.querySelector('.form-control');
    input.addEventListener('input', this.startToFilter);
  }

  listenCategoryFilter() {
    const category = document.querySelector('#select1');
    category.addEventListener('change', this.startToFilter);
  }

  // ____ startToFilter

  startToFilter() {
    let filterCategory = this.selectCategoryFilter(this.array);
    let filterFast = this.searchProductFast(filterCategory);
    this.quantityOfDishes(filterFast);
    this.addScreen(filterFast);
  }

  // Sort datas of table

  sortFunction() {
    document.addEventListener('DOMContentLoaded', () => {
      const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) =>
          order *
          collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML,
          );

        for (const tBody of target.closest('table').tBodies)
          tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for (const cell of target.parentNode.cells)
          cell.classList.toggle('sorted', cell === target);
      };

      document
        .querySelectorAll('.table thead')
        .forEach(tableTH =>
          tableTH.addEventListener('click', () => getSort(event)),
        );
    });
  }

  // ___startProgramm

  start(container) {
    this.insertPartsOfHTML(container);
    this.startToFilter();
    this.listenCategoryFilter();
    this.searchListener();
    this.sortFunction();
  }
}

export default ClassOfProducts;

// const app = new ClassOfProducts();
// const insert = document.querySelector('#root');
// app.start(insert)
