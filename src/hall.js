"use strict"

export default class Hall {
    constructor() {
        this.inputValue = 'Кількість гостей';
        this.guest = []
        
    }

    renderHall() {
        return `
        <div class="container ">
            <div class="table">1</div>
            <div class="table">2</div>
            <div class="table">3</div>
            <div class="table">4</div>
            <div class="table">5</div>
            <div class="table">6</div>
            <div class="table">7</div>
            <div class="table">8</div>
            <div class="table">9</div>
            <div class="table">10</div>
            <div class="table">11</div>
            <div class="table">12</div>
            <div class="table">13</div>
            <div class="table">14</div>
            <div class="table">15</div>
            <div class="table">16</div>  
        </div>`;
    }


    renderList(){
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
        </ul></div>`
    }

    addToScreen (container, position, element){
        container.insertAdjacentHTML(position,element)
    }

    renderListToClick(e){
        e.preventDefault()
        if(e.target.tagName !== 'DIV') return;
        e.target.insertAdjacentHTML('beforeend', this.renderList())
        
        }

    listTextContent(e){
        e.preventDefault()
        if(e.target.tagName !== 'LI') return;
        let allGuest = (e.target.textContent)

        if(this.guest.length<0){
            this.guest.push(+allGuest)
        }
        this.guest.splice(0,1,+allGuest)
        console.log(this.guest);

    }

    addLisnersGuest(){
        const container = document.querySelector('.container');
        container.addEventListener('click', this.listTextContent.bind(this))
    }

    isnElement(e){
        const list = document.querySelector('.list')
        if(list){
        list.remove();
        }else {
        this.renderListToClick(e)
        }
    }    

    addLisners(){
        const container = document.querySelector('.container');
        container.addEventListener('click', this.isnElement.bind(this));
    }
        
    start(container){
        this.addToScreen(container, 'beforeend', this.renderHall());
        this.addLisners();
        this.addLisnersGuest()
        
    }
}

