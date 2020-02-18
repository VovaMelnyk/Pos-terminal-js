"use strict"

export default class Hall {
    constructor() {
        this.inputValue = 'Кількість гостей';
        this.guest = {}
        
    }

    renderHall() {
        return `
        <div class="container ">
            <div class="table">1<span class="table_item"></span>
            </div>
            <div class="table">2<span class="table_item"></span>
            </div>
            <div class="table">3<span class="table_item"></span>
            </div>
            <div class="table">4<span class="table_item"></span>
            </div>
            <div class="table">5<span class="table_item"></span>
            </div>
            <div class="table">6<span class="table_item"></span>
            </div>
            <div class="table">7<span class="table_item"></span>
            </div>
            <div class="table">8<span class="table_item"></span>
            </div>
            <div class="table">9<span class="table_item"></span>
            </div>
            <div class="table">10<span class="table_item"></span>
            </div>
            <div class="table">11<span class="table_item"></span>
            </div>
            <div class="table">12<span class="table_item"></span>
            </div>
            <div class="table">13<span class="table_item"></span>
            </div>
            <div class="table">14<span class="table_item"></span>
            </div>
            <div class="table">15<span class="table_item"></span>
            </div>
            <div class="table">16<span class="table_item"></span>
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

    renderListLastTable(){
return `<div class="list_last">
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

        if(+e.target.firstChild.textContent <= 12){
            e.target.insertAdjacentHTML('beforeend', this.renderList())
        }else{e.target.insertAdjacentHTML('beforeend', this.renderListLastTable())
        }
        
console.log(e.target.firstChild.textContent);
        // e.target.insertAdjacentHTML('beforeend', this.renderList())
        console.dir(e.target);
        
        }

    listTextContent(e){
        e.preventDefault()
        if(e.target.tagName !== 'LI') return;
        let allGuest = (e.target.textContent)
        for(let key in this.guest){
            
            if (key){
                // let a = this.guest[key]
                if(this.guest[key].length == 0){
                this.guest[key].push(+allGuest);
                }else{this.guest[key] == this.guest[key].push(+allGuest)}
                }
        }
    }

    objKey(e){
    e.preventDefault()
    if(e.target.tagName !== 'DIV') return;
    const value = []
    let key = `table${e.target.firstChild.textContent}`;
    if(key){
    this.guest[key] = value
    }}


addClassBgr(e){
    e.preventDefault()
    if(e.target.tagName !== 'DIV') return;
    // console.dir(e.target);
for(let key in this.guest){
    
    if(this.guest[key].length > 0){
    e.target.classList.add('table_bgr')
    } }

}

addStyle(){
    const container = document.querySelector('.container');
    container.addEventListener('click', this.addClassBgr.bind(this));

}

addObjKey(){
    const container = document.querySelector('.container');
    container.addEventListener('click', this.objKey.bind(this))
}

    addLisnersGuest(){
        const container = document.querySelector('.container');

        container.addEventListener('click', this.listTextContent.bind(this))

    }

    isnElement(e){
        const list = document.querySelector('.list')
        const listLast = document.querySelector('.list_last')

        if(list || listLast){
        list.remove() && listLast.remove();
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
        this.addStyle()
        this.addObjKey()
        
        
    }
}

