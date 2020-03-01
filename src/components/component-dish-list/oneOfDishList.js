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
        <tr class="dishItem"; style="border: 1px none #333333;">
        <td class="products-name" title="${this.name}" style="text-align: left; max-width: 200px;">
            <div style="display: flex; align-items: center;">
                <div class="item-img">
                    <img src="${this.img}" width="48" height="35">
                </div>
                <div class="item-desc" style="margin-left: 10px;">${this.name}</div>
            </div>
        </td>
        <td class="" title="${this.category}" style="text-align: left;">
            <span class="table-cell-value">${this.category}</span>
        </td>
        <td class="" title="${this.selfPrice}" style="text-align: right; font-weight: bold;">
            <span style="color: inherit;">${this.selfPrice} ₴</span>
        </td>
        <td class="editable" title="${this.finalPrice}" style="text-align: right; font-weight: bold;">
            <span style="color: inherit;">${this.finalPrice} ₴</span>
        </td>
        <td class="editable" title="${this.extraCharge}" style="text-align: right;">
            <span>${this.extraCharge} %</span>
        </td>
        <td class="" title="Состав" style="text-align: right;">
            <a id="composition"; style="text-decoration: none; cursor: pointer; color: #2688cd;">Состав</a>
        </td>
        <td class="" title="Ред." style="text-align: right;">
            <a href="#" style="text-decoration: none; color: #2688cd;">Ред.</a>
        </td>
        <td class="actions-cell" title="">
            <div style="display: flex; align-items: center; justify-content: center;">
                <button type="button" id="btnAnList" class="btn btn-edit-ellipsis dropdown-toggle" style="width: 30px; height: 20px; background-image: url(https://demo.joinposter.com/i/manage/ellipsis.png); background-repeat: no-repeat; background-position: center; border: none; background-color: inherit; cursor: pointer;"></button>
                <div class="popdown dropdown-cell-popover top-left" style="padding: 0px;">
                    <div style="z-index: 1; position: relative;">
                        <div id="anList" class="closed" 
                        style="position: absolute;
                        top: -20px;
                        left: -150px;
                        background-color: #fff;
                        border: 1px solid #000;
                        border-radius: 10px;
                        text-align: left;"
                    > 
                            <ul class="dropdown-menu pull-right" style="
                            list-style: none;
                            margin: 0;
                            padding: 15px;"
                        >
                                <li class="delete-link">
                                    <a class="pseudo-link" style="color: #2688cd; cursor: pointer">Удалить</a>
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
                <td class="left-cell">${obj.ingredient}</td>
                <td class="right-cell">${obj.ingredientGross} г</td>
                <td class="right-cell">${obj.ingerdientNett} г</td>
                <td class="right-cell-end">${obj.ingredientFirstPrice} ₴</td>
            </tr>`;
        }
        return str
    };
    renderDishIngredients = () => {
        let listDel = document.querySelector('#del')
        document.querySelector('#del') === null ? 
        this.list.insertAdjacentHTML('beforeend',`
        <tr id="del">
            <td colspan="10" style="background-color: rgb(244, 244, 244);" class="no-top-border dropdown-content-container">
            <div>
            <table class="table transaction-history" style='width: 95%; background-color: #fff; margin: 15px auto;'>
            <thead>
            <tr>
                <th class="left-cell" style="border-bottom: 1px solid rgb(238, 238, 238)">Ингредиент</th>
                <th class="right-cell" style="border-bottom: 1px solid rgb(238, 238, 238)">Брутто</th>
                <th class="right-cell" style="width: 100px; border-bottom: 1px solid rgb(238, 238, 238)">Нетто</th>
                <th class="right-cell-end" style="width: 100px; border-bottom: 1px solid rgb(238, 238, 238)">Цена</th>
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
