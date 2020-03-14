import GoodsCollection from '../goodsCollection/goodsCollection';
let arrProd = [];

class newProduct {
  renderNewWindow = container => {
    container.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="page-product-form">
        <div class="content-header">
            <div class="pull-left" style="display: inline-block; margin-right: 10px;">
                <a href="#" class="btn-back">
                    <svg width="11px" height="18px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g fill="#3E8ACC">
                                <polygon id="Fill-34" transform="translate(5.500000, 9.000000) scale(-1, 1) translate(-5.500000, -9.000000) " points="0 16 7 9 0 2 2 0 11 9 2 18"></polygon>
                            </g>
                        </g>
                    </svg>
                </a>
            </div>
            <h2 class="ib" style="display: inline-block; font-weight: bold; font-size: 24px;">Новый товар</h2>
        </div>
        <form class="form-horizontal" method="POST" enctype="multipart/form-data" id="update_product_save_form">
            <!-- Название товара -->
            <div class="form-group" style="margin: 20px 10px;">
                <div style="display: inline-block; width: 20%">
                    <label for="product_name" class="control-label">Название</label>
                </div>
                <div class="tax-type-change" style="display: inline-block; width: 55%;">
                    <input required type="text" name="product_name" value="" class="form-control" id="title" autofocus="true">
                </div>
            </div>
            <!-- Выбрать категорию -->
            <div class="form-group" style="margin: 20px 10px;">
                <div style="display: inline-block; width: 20%">
                    <label for="item-category" class="control-label">Категория</label>
                </div>
                <div class="select-category tax-type-change" style="display: inline-block; width: 55%;" id="category" >
                    <select name="menu_category_id" class="form-control" id="item-category">
                        <option value="0" selected="selected" data-tax_id="0">Главный экран</option>
                        <option value="32" data-tax_id="4">Первые блюда</option>
                        <option value="34" data-tax_id="4">Холодные закуски</option>
                        <option value="31" data-tax_id="4">Салаты</option>
                        <option value="30" data-tax_id="4">Бар</option>
                        <option value="10" data-tax_id="4">&nbsp; &nbsp;Кофе</option>
                        <option value="12" data-tax_id="4">&nbsp; &nbsp;Травяные чаи</option>
                        <option value="13" data-tax_id="4">&nbsp; &nbsp;Китайский чай</option>
                        <option value="17" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Китайский чай</option>
                        <option value="18" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Шу Пуэры</option>
                        <option value="19" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Белый чай</option>
                        <option value="20" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Гаундунские Улун</option>
                        <option value="21" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Тайванские улуны</option>
                        <option value="22" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Зеленый чай</option>
                        <option value="23" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Северо-фудзиянские улуны</option>
                        <option value="24" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Цветочный чай</option>
                        <option value="25" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Красный чай</option>
                        <option value="26" data-tax_id="4">&nbsp; &nbsp;&nbsp; &nbsp;Фиолетовый пуэр</option>
                        <option value="14" data-tax_id="4">&nbsp; &nbsp;Прохладительные напитки</option>
                        <option value="15" data-tax_id="3">&nbsp; &nbsp;Вода</option>
                        <option value="16" data-tax_id="4">&nbsp; &nbsp;Свежевыжатые соки</option>
                        <option value="39" data-tax_id="4">&nbsp; &nbsp;Коктейли</option>
                        <option value="33" data-tax_id="4">Вторые блюда</option>
                        <option value="152" data-tax_id="4">&nbsp; &nbsp;Гарниры</option>
                        <option value="35" data-tax_id="4">Десерты</option>
                        <option value="36" data-tax_id="4">&nbsp; &nbsp;Мороженое</option>
                        <option value="37" data-tax_id="4">&nbsp; &nbsp;Торты</option>
                        <option value="38" data-tax_id="4">&nbsp; &nbsp;Фрукты</option>
                        <option value="151" data-tax_id="4">Кальян</option>
                        <option value="new_category">Добавить новую категорию...</option>
                    </select>
                </div>
            </div>
            <!-- Цена, себестоимость и наценка -->
            <div class="form-group" style="margin: 20px 10px;">
                <div class="radio-block gray-block">
                    <div class="spot-price-block default one-price " data-region-id="">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label for="calc-prime-cost">Себестоимость</label>
                                    </td>
                                    <td></td>
                                    <td>
                                        <label for="calc-extra">Наценка</label>
                                    </td>
                                    <td></td>
                                    <td><label for="calc-total">Итого</label></td>
                                </tr>
                                <tr class="calc-tr">
                                    <td class="td-calc-prime-cost">
                                        <input required type="number" id="primeCost" name="cost" value="" class="form-control calc-prime-cost prime-cost-input" id="calc-prime-cost">
                                        <span class="measure">₴</span>
                                    </td>
                                    <td class="math-operation plus after-cost">+</td>
                                    <td>
                                        <input required type="number" id="extraCost" name="profit[1]" value="" class="form-control" id="calc-extra">
                                        <span class="measure">%</span>
                                    </td>
                                    <td class="math-operation equal">=</td>
                                    <td>
                                        <input required type="number" id="totalCost" name="price[1]" value="" class="form-control" id="calc-total">
                                        <span class="measure">₴</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- Загрузить фотографию -->
            <div class="form-group" style="margin: 20px 10px;">
                <div style="display: inline-block; width: 20%">
                    <label class="control-label">Фотография</label>
                </div>
                <div style="display: inline-block; width: 55%;">
                    <label class="btn-outline btn-file-upload" >
                        <input required class="link-input" type="text" name="photo" id="photoLink">
                    </label>
                </div>
            </div>
            <!-- Выбрать цвет категории -->
            <div class="form-group" style="margin: 20px 10px;">
                <label class="col-xs-2 control-label">Цвет</label>
                <div class="color-picker" style="height: 20px;">
                    <label class="no-color">
                        <input name="product_color" type="radio" checked="" value="white">
                    </label>
                    <label class="white">
                        <input name="product_color" type="radio" value="white">
                    </label>
                    <label class="red">
                        <input name="product_color" type="radio" value="red">
                    </label>
                    <label class="orange">
                        <input name="product_color" type="radio" value="orange">
                    </label>
                    <label class="yellow">
                        <input name="product_color" type="radio" value="yellow">
                    </label>
                    <label class="green">
                        <input name="product_color" type="radio" value="green">
                    </label>
                    <label class="blue">
                        <input name="product_color" type="radio" value="blue">
                    </label>
                    <label class="navy-blue">
                        <input name="product_color" type="radio" value="navy-blue">
                    </label>
                    <label class="purple">
                        <input name="product_color" type="radio" value="purple">
                    </label>
                    <label class="black">
                        <input name="product_color" type="radio" value="black">
                    </label>
                    <label class="mint-blue">
                        <input name="product_color" type="radio" value="mint-blue">
                    </label>
                    <label class="lime-green">
                        <input name="product_color" type="radio" value="lime-green">
                    </label>
                    <label class="pink">
                        <input name="product_color" type="radio" value="pink">
                    </label>
                </div>
            </div>
            <!-- Кнопка сохранить -->
            <div class="control-group the-submit">
                <div class="max-width-wrapper">
                    <div class="controls col-xs-6 tax-type-change col-xs-offset-2">
                        <button class="btn btn-green btn-lg" id="subm">Сохранить</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
        `,
    );
  };

  createNewObject = () => {
    let categoryList = document.querySelector('#item-category');
    let category = document.querySelector('#item-category').value;
    let color = document.querySelector('.color-picker');
    return {
      title: document.querySelector('#title').value,
      category: categoryList.querySelector(`[value="${category}"]`).text,
      primeCost: document.querySelector('#primeCost').value,
      extraCost: document.querySelector('#extraCost').value,
      totalCost: document.querySelector('#totalCost').value,
      photoLink: document.querySelector('#photoLink').value,
      color: color.querySelector('[checked]').value,
    };
  };
  pullNewProduct = obj => {
    arrProd.push(obj);
  };
  closeWindow = () => {
    document.querySelector('.page-product-form').remove();
  };
  start = container => {
    container.innerHTML = '';
    this.renderNewWindow(container);
    let str = document.querySelector('#subm');
    str.addEventListener('click', function(e) {
      e.preventDefault(),
        this.pullNewProduct(this.createNewObject()),
        this.closeWindow();
    });

    let calcPrime = document.querySelector('#primeCost');
    let calcExtra = document.querySelector('#extraCost');
    let calcTotal = document.querySelector('#totalCost');
    calcPrime.addEventListener('input', function() {
      let newCost = (Number(this.value) * Number(calcExtra.value)) / 100;
      calcTotal.value = Number(this.value) + newCost;
    });
    calcExtra.addEventListener('input', function() {
      let newCost = (Number(this.value) / 100) * Number(calcPrime.value);
      calcTotal.value = Number(calcPrime.value) + newCost;
    });
    const btnBack = document.querySelector('.pull-left');
    btnBack.addEventListener('click', () => {
      container.innerHTML = '';
      new GoodsCollection().start(container);
    });
  };
}
// const product = new newProduct();
// product.renderNewWindow();
// let str = document.querySelector('#subm');
// str.addEventListener('click', function(e) {
//   e.preventDefault(),
//     product.pullNewProduct(product.createNewObject()),
//     product.closeWindow();
// });

// let calcPrime = document.querySelector('#primeCost');
// let calcExtra = document.querySelector('#extraCost');
// let calcTotal = document.querySelector('#totalCost');
// calcPrime.addEventListener('input', function() {
//   let newCost = (Number(this.value) * Number(calcExtra.value)) / 100;
//   calcTotal.value = Number(this.value) + newCost;
// });
// calcExtra.addEventListener('input', function() {
//   let newCost = (Number(this.value) / 100) * Number(calcPrime.value);
//   calcTotal.value = Number(calcPrime.value) + newCost;
// });
export default newProduct;
