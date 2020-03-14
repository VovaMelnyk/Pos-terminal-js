'use strict'

import './techMap.scss'

export default class ComponentMap{
    constructor(){
        this.product = {
            name:0,
            category:0,
            photo:0,
            ingredients:[
                {
                    name: 0,
                    brutto: 0,
                    netto: 0,
                    cost: 0
                }
            ],
            
            exit:0,
            costProductAll:0,
        }

        // {
        //     name: 0,
        //     brutto: 0,
        //     netto: 0,
        //     cost: 0
        // }
        this.name = name

        this.ingredient = 0

        this.nameInput = document.querySelector('#item-name')
        

    }

    renderMap(){
        return`<div class="tech-map">
        <div class="tech-header">
            <a href="/manage/dishes" class="btn-back">
                <svg width="11px" height="18px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g fill="#3E8ACC">
                            <polygon id="Fill-34"
                                transform="translate(5.500000, 9.000000) scale(-1, 1) translate(-5.500000, -9.000000) "
                                points="0 16 7 9 0 2 2 0 11 9 2 18"></polygon>
                        </g>
                    </g>
                </svg> </a>
            <h2 class="ib">Нова тех. карта</h2>
        </div>
        <form action="manage" method="post" class="form-map">
            <div class="name-grup">
                <label for="item-name" class="label">Назва</label>
                <input type="text" class="control" id="item-name" name="product_name">
            </div>

            <div class="name-grup">
                <label for="item-name" class="label">Категорія</label>
                <select class="control" name="menu_category_id" id="item-category" selected="selected">
                </select>
            </div>

            <div class="name-grup">
                <label for="item-name" class="label">Фотографія</label>
                <input type="" class="control" id="photo" name="photo">
            </div>

            <div class="ingredients">
                <p class="item">Склад</p>
                <p class="item-p">Інгрідієнти та напівфабрикати, з яких складається технологічна карта</p>
            
            <div class="ingredients-table">

                <div class="tab">
                    <p class="ingredients-item">Продукти</p>
                    <p class="ingredients-item">Бруто</p>
                    <p class="ingredients-item">Нетто</p>
                    <p class="ingredients-item">Собівартість</p>

                </div>
            </div>
            
            <div id="product"></div>
            <div class="add-ingredient">
                    <a href="#" class="add">+ Добавити інгредієнт</a>
                    <p class="product-total">Вихід: 0 г</p>
                </div>
            <div class="total-price">
                <div class="total-price-item tab">
                    <p class="ingredients-item">Собівартість</p>
                    <p class="ingredients-item">Націнка</p>
                    <p class="ingredients-item">Всього</p>
                </div>
                <div class="total-price-input">
                    <span class="total-price_item total_text">0.00 ₴</span>
                    <span class="total_mathematic">+</span>
                    <input type="text" placeholder="0" class="total-price-input_item">
                    <span class="">%</span>
                    <span class="total_mathematic">=</span>
                    <input type="text" placeholder="0.00" class="total-price-input_item">
                    <span class="">₴</span>
                </div>
                
            
        </form>
        </div></div>
        <button class="btn-submit">Зберегти</button>
        </div>
        `
    }

    addToScreen(container, position, element) {
        container.insertAdjacentHTML(position, element);
      }

    addProduct(){
        this.product.name = document.querySelector('#item-name').value;
        this.product.category = document.querySelector('#item-category').value;
        this.product.foto = document.querySelector('#photo').value


        document.querySelectorAll('.select_ingredients')
        .forEach(el => this.product.ingredients.push({name:el.value}));
        document.querySelectorAll('.size_b')
        .forEach(el => this.product.ingredients.push[{brutto:el.value}]);
        

        console.dir(this.product );
    }

    ingredientMarkup(){
        return `<div class="table-input">
        <select name="" class="select_ingredients">
        
        </select>
        <input type="text" id="brut" class="size size_b" placeholder="0">
        <div class="netto">
            <input type="text" id="nett" class="size size_n" placeholder="0" disabled>
            <span>г</span>
        </div>
        <div class="price">
            <span id="price-item">0.00 ₴</span>
            <a href="#" id="delete-ingredient">×</a>
        </div>
    </div>`
    }

    renderCategory(){
        
        const selectCategory = document.querySelector('#item-category');
        fetch('https://pos-terminal-caffe.firebaseio.com/category.json',
        {
            body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json'}
        }
        )
        .then(res => res.json())
        .then(data => {
            for (let key in data){
                selectCategory.insertAdjacentHTML('beforeend', `<option>${data[key].name}</option>`)
            }
            
        })
    }

    renderIngredientSelect(){
        
        // console.log(elem);
        fetch('https://pos-terminal-caffe.firebaseio.com/categoryIngredient.json',
        {
            body: JSON.stringify(),
        headers: {
            'Content-Type': 'application/json'}
        }
        )
        .then(res => res.json())
        .then(data => {
            for (let key in data){
                
                let elem = data[key].name;
            const selectIngredients = document.querySelectorAll('.select_ingredients')
            .forEach(el => {
                if(el.innerHTML){
                el.insertAdjacentHTML('beforeend', `<option>${elem}</option>`)}
                // let ins = el.innerHTML
            // console.dir(el);
            // console.log(elem);
        
        });
               
            }
            
        })
    }

    addComposition(){
        const ingredientTable = document.querySelector('#product')
        ingredientTable.insertAdjacentHTML('beforeend', this.ingredientMarkup())
    }

    deleteIngredientsMarkup(e){
        e.preventDefault()
        if(e.target.tagName !== 'A') return
        const deleteIngredientBtn = e.target
        const inputIngredient = deleteIngredientBtn.parentNode.parentNode

        inputIngredient.remove(inputIngredient)

    }

    deleteIngredient(e){
        e.preventDefault()
        const cost = document.querySelector('#product')
        
        cost.addEventListener('click', this.deleteIngredientsMarkup.bind(this))
     
    }

    addIngredients(){
        const add = document.querySelector('.add');
        add.addEventListener('click', this.addComposition.bind(this))
        add.addEventListener('click', this.brutoProductInput.bind(this))
        add.addEventListener('click', this.deleteIngredient.bind(this))
        add.addEventListener('click', this.renderIngredientSelect.bind(this))
    }

    brutoProductInput(e){
        e.preventDefault()
        const cost = document.querySelector('#product')
        cost.addEventListener('input', this.brutoProduct.bind(this))

    }

    brutoProduct(e){
        e.preventDefault()
        if(e.target.tagName === 'SELECT') return
        const brutto = e.target
        const netto =  e.target.nextElementSibling.querySelector('input')
        netto.value = brutto.value
        // let result = 0
        this.exitProduct()
        
        
    }

    exitProduct(){
        const netto = document.querySelectorAll('.size_n')
        let sum = 0
        netto.forEach((el)=>{
            return sum += +el.value;
        })
        const productTotal = document.querySelector('.product-total')

        if(sum < 1000){
            productTotal.textContent = `Вихід: ${sum} г`
        }else{
            productTotal.textContent = `Вихід: ${Math.floor(sum/1000)} кг ${sum % 1000} г`
        }
        return sum;
        
    }

    saveProduct(){
        const btnSave = document.querySelector('.btn-submit')
        btnSave.addEventListener('click', this.savePost.bind(this))
    }

    savePost(){
        this.addProduct();
        console.log(this.product);
        
        const prod = document.querySelector('#item-name').value;
console.log(prod);
        fetch('https://pos-terminal-caffe.firebaseio.com/newMap.json',{
            method: 'POST',
            body: JSON.stringify(this.product),
            headers: {
                'Content-Type': 'application/json',
                
            }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

}

    addListener(){
        this.addIngredients();
        
        this.saveProduct()
        
       

    }

      start(container) {
        this.addToScreen(container, 'beforeend', this.renderMap());
        this.addListener()
     this.renderCategory()
    
    }


}
const root = document.querySelector('#root');
const componentMap = new ComponentMap()
componentMap.start(root)





