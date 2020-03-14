// import M from 'materialize-css';
// import '@/styles/materialize/materialize.scss';
import '@/styles/base';
import './styleGood.css';

import source from '../../assets/img/water.jpg';

class Add_OneClass_Good {
  constructor() {
    // this.getProfitPercent = this.getProfitPercent.bind(this);
    // this.redColorForProfit = this.redColorForProfit.bind(this);
    // this.addOneClass = this.addOneClass.bind(this);
    // this.deleteOneClass = this.deleteOneClass.bind(this);
  }

  // addOneClass() {
  //   const addModal = document.querySelector('p.reductGood');
  //   const modUl = document.querySelector('ul');

  //   modUl.insertAdjacentHTML(
  //     'beforeend',
  //     `<div id="modal1" class="modal">
  //   <div class="modal-content">
  //   <center>
  //   <form id="your_form1" action="" method="POST" target="_blank">
  //       <div class="contacts_mail">
  //           <div class="your-name">
  //             <div class="file-field input-field">
  //               <div class="btn">
  //                 <span>Завантажити</span>
  //                 <input type="file">
  //               </div>
  //               <div class="file-path-wrapper">
  //               <input class="file-path validate" type="text">
  //             </div>
  //           </div>
  //               <input name="name_good" type="text" placeholder="Назва товару *" required="">
  //               <input name="category_good" type="text" placeholder="Категорія товару *" required="">
  //               <input name="value_good" type="text" placeholder="Вартість товару *" required="">
  //               <input name="price_good" type="text" placeholder="Ціна товару *" required="">
  //           </div>
  //       </div>
  //       <div class="send-message">
  //       <!--<input type="submit" name="go" value="Відправити" class="button_mail">-->
  //       <div class="btn">
  //       <span>Очистити</span>

  //       </div>
  //       </div>
  //   </form>
  //   </center>
  //   </div>
  //   <div class="modal-footer">
  //     <a href="#!" id="agree_btn" class="modal-close waves-effect waves-green btn-flat">Задати</a>
  //   </div>
  // </div>`,
  //   );
  //   addModal.addEventListener('click', this.modalShow);
  // }
  modalShow() {
    const modalWindow = document.querySelector('#modal1');
    modalWindow.classList.add('show');
    const agreeBtn = document.querySelector('#agree_btn');
    agreeBtn.addEventListener('click', e => {
      modalWindow.classList.remove('show');
    });
  }

  // deleteOneClass() {
  //   const deleteGoodP = document.querySelector('p.deleteGood');
  //   deleteGoodP.addEventListener('click', e => {
  //     console.log('Deleted');
  //   });
  // }

  get getProfit() {
    this.good.profit = this.good.price - this.good.value;
    return this.good.profit;
  }
  getProfitPercent(good) {
    // console.log(this.good);
    return (good.profit / good.value) * 100 + '%';
    // console.log(this.good.profit);
    // console.log(this.good.profitPercent);
  }
  // redColorForProfit() {
  //   if (this.good.profit < 0) {
  //     const profitPercentP = document.querySelector('p.profit');
  //     profitPercentP.classList.add('valid');
  //   }
  // }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  renderGoodsListItem(good) {
    // const goodsListItem = document.createElement('li');
    // goodsListItem.classList.add('goodsListItem');
    // for (const prop in good) {
    //   goodsListItem.insertAdjacentHTML(
    //     'beforeend',
    //     `<p class="${prop}">${good[prop]}</p>`,
    //   );
    // }
    // return goodsListItem;
    return `<li class="goodsListItem">
    <p>${good.name}</p>
    <p>${good.category}</p>
    <p>${good.value}</p>
    <p>${good.price}</p>
    <p class="${good.profit < 0 ? 'valid' : ''}">${good.profit}</p>
    <p>${this.getProfitPercent(good)}</p>
    </li>`;
  }

  // start(container) {
  //   // this.getProfit;
  //   this.getProfitPercent();
  //   // const cont = this.renderGoodsListItem(this.good);
  //   // container.append(cont);
  //   // this.redColorForProfit();
  //   // this.addOneClass();
  //   // this.deleteOneClass();
  // }
}

export default Add_OneClass_Good;
