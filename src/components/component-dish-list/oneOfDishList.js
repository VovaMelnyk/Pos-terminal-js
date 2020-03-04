// Task: Component one of food

//1. Класс который рисует разметку одного блюда из коллекции
//2. Вид и функционал как в Тролло

class OneOfFoodList {
    constructor ({dishName, dishSelectCategory, dishImg, dishSelfPrice, dishExtraCharge, dishFinalPrice, ingredientsArray}) 
    {
        this.name = dishName;
        this.category = dishSelectCategory;
        this.img = dishImg;
        this.selfPrice = dishSelfPrice;
        this.extraCharge = dishExtraCharge;
        this.finalPrice = dishFinalPrice;
        this.ingredientsArray = ingredientsArray
        this.list = document.querySelector('#dishList')
    }
    renderDishList = () => {
        this.list.insertAdjacentHTML('afterbegin', `
        <tr class="dishItem">
        <td class="dishItem__name" title="${this.name}" style="text-align: left; max-width: 200px;">
            <div class="dishItem__flex-center">
                <div class="item-img">
                    <img src="${this.img}" width="48" height="35">
                </div>
                <div class="item-desc" style="margin-left: 10px;">${this.name}</div>
            </div>
        </td>
        <td class="dishItem__left-cell" title="${this.category}">
            <span>${this.category}</span>
        </td>
        <td class="dishItem__price" title="${this.selfPrice}">
            <span>${this.selfPrice} ₴</span>
        </td>
        <td class="editable dishItem__price" title="${this.finalPrice}">
            <span>${this.finalPrice} ₴</span>
        </td>
        <td class="editable dishItem__right-cell" title="${this.extraCharge}">
            <span>${this.extraCharge} %</span>
        </td>
        <td class="editable dishItem__right-cell" title="Состав">
            <a id="composition"; class="dishItem__link">Состав</a>
        </td>
        <td class="" title="Ред." style="text-align: right;">
            <a href="#"; class="dishItem__link">Ред.</a>
        </td>
        <td title="">
            <div class="dishItem__flex-center">
                <button type="button" id="btnAnList" class="dishItem__button"></button>
                <div style="padding: 0px;">
                    <div class="dishItem__another-options">
                        <div id="anList" class="closed dishItem__another-options__list"> 
                            <ul class="dishItem__dropdown-menu">
                                <li class="dishItem__dropdown-link">
                                    <a class="pseudo-link" class="dishItem__dropdown-link">Удалить</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </td>
        </tr>
        `);
    }
    addIngredientList = () => {
        let str = '';
        for (let obj of this.ingredientsArray) {
            str += `
            <tr>
                <td class="dishIngred__left-cell">${obj.ingredient}</td>
                <td class="dishIngred__right-cell">${obj.ingredientGross} г</td>
                <td class="dishIngred__right-cell">${obj.ingerdientNett} г</td>
                <td class="dishIngred__right-cell-end">${obj.ingredientFirstPrice} ₴</td>
            </tr>`;
        }
        return str
    };
    renderDishIngredients = () => {
        let listDel = document.querySelector('#del')
        document.querySelector('#del') === null ? 
        this.list.insertAdjacentHTML('beforeend',`
        <tr id="del">
            <td colspan="10" class="dishIngred__bcg-color">
            <div>
            <table class="dishIngred__table">
            <thead>
            <tr>
                <th class="left-cell dishIngred__item-left">Ингредиент</th>
                <th class="right-cell dishIngred__item-left">Брутто</th>
                <th class="right-cell dishIngred__item-right">Нетто</th>
                <th class="right-cell-end dishIngred__item-right">Цена</th>
            </tr>
            </thead>
        <tbody>
            ${this.addIngredientList()}
        </tbody>
        `) : 
        listDel.remove()
    }
    openAnotherList = () => {
        if (document.querySelector('#anList').classList.contains('closed')) {
            document.querySelector('#anList').classList.remove('closed')
        } else {document.querySelector('#anList').classList.add('closed')}
    }
    deleteDishItem = () => {
        let itemDel = document.querySelector('.dishItem')
        itemDel.remove()
    }
    init = () => {
        this.renderDishList();
        let doc = document.querySelector('#composition');
        doc.addEventListener('click', this.renderDishIngredients)
        let anBtn = document.querySelector('#btnAnList')
        anBtn.addEventListener("click", this.openAnotherList)
        let delBtn = document.querySelector('.pseudo-link')
        delBtn.addEventListener('click', this.deleteDishItem)
    }
}

export default OneOfFoodList;
