"use strict"

export default class Hall {
    constructor() {
        this.inputValue = 'Кількість гостей';
        this.guest = []
        
    }

    renderHall() {
        return `
        <div class="container ">
            <div class="table">1
            <span class="table_item"></span>
            </div>
            <div class="table">2
            <span class="table_item"></span>
            </div>
            <div class="table">3
            <span class="table_item"></span>
            </div>
            <div class="table">4
            <span class="table_item"></span>
            </div>
            <div class="table">5
            <span class="table_item"></span>
            </div>
            <div class="table">6
            <span class="table_item"></span>
            </div>
            <div class="table">7
            <span class="table_item"></span>
            </div>
            <div class="table">8
            <span class="table_item"></span>
            </div>
            <div class="table">9
            <span class="table_item"></span>
            </div>
            <div class="table">10
            <span class="table_item"></span>
            </div>
            <div class="table">11
            <span class="table_item"></span>
            </div>
            <div class="table">12
            <span class="table_item"></span>
            </div>
            <div class="table">13
            <span class="table_item"></span>
            </div>
            <div class="table">14
            <span class="table_item"></span>
            </div>
            <div class="table">15
            <span class="table_item"></span>
            </div>
            <div class="table">16
            <span class="table_item"></span>
            </div>  
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
            this.guest.push(+allGuest);
    console.log(this.guest);

        }
        this.guest.splice(0,1,+allGuest)
        // console.log(this.guest);

    }

addClassBgr(e){
    e.preventDefault()
    if(e.target.tagName !== 'DIV') return;
    console.log(e.target);
    if(this.guest.length > 0){
    e.target.classList.add('table_bgr')
    } 

}

adds(){
    const container = document.querySelector('.container');
    container.addEventListener('click', this.addClassBgr.bind(this));

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
        container.addEventListener('click', this.isnElement.bind(this),this.addClassBgr.bind(this));
    }
        
    start(container){
        this.addToScreen(container, 'beforeend', this.renderHall());
        this.addLisners();
        this.addLisnersGuest()
        this.adds()
        
    }
}

