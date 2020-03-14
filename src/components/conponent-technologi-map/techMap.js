'use strict'

// import './techMap.css'

class ComponentMap{
    constructor(){
        this.product = {}
        this.name = name

        this.ingredient = 0
        

    }

    // const root = document.querySelector('#root');    

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
                <option>Категорія</option>
                <option>Категорія2</option>
                
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
                
            </div>
            <button type="submit" class="btn-submit">Зберегти</button>
            </div>
        </form>
        </div>`
    }

    addToScreen(container, position, element) {
        container.insertAdjacentHTML(position, element);
      }

    addProduct(){
        this.product.name = document.querySelector('#item-name').value;
        this.product.category = document.querySelector('#item-category').value;
        this.product.foto = document.querySelector('#photo').value
    }

    ingredientMarkup(){
        return `<div class="table-input">
        <select name="" >
        <option></option>
        <option>Сир</option>
        <option>Мясо</option>
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
        // add.addEventListener('click', this.costProduct.bind(this))
        
        // this.costProduct()

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
        this.costProduct()
        
    }

    costProduct(){
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

    addListener(){
        this.addIngredients();
        // this.costProduct()
       

    }

      start(container) {
        this.addToScreen(container, 'beforeend', this.renderMap());
        this.addListener()
        
    }


}
const root = document.querySelector('#root');
const componentMap = new ComponentMap()
componentMap.start(root)





