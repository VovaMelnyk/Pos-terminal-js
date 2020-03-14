import '@/styles/materialize/materialize'; // import materialize styles
import './createItem.scss';

class CreateItem {
    constructor() {
        this.list = [{
                id: 1,
                name: 'Алкоголь',
            },
            {
                id: 2,
                name: 'Мясо',
            },
        ];
    }

    renderItem() {
        const arr = this.list.reduce((acc, el) => {
            return (acc += `<li id="${el.id}" class="collection-item">
                <div class="collection-item__text">${el.name}</div>                
                <div class="container-btn-input">
                    <i class="material-icons btn-add">add</i>
                    <i class="material-icons btn-clear">clear</i>
                </div>
            </li>`);
        }, '');

        return `<ul class="collection" id="js-list">${arr}</ul>`;
    }

    addToScreen(container, position, element) {
        container.insertAdjacentHTML(position, element);
    }

    start = container => {
        this.addToScreen(container, 'beforeend', this.renderItem());
        this.listener();
    };

    listener() {
        const list = document.querySelector('#js-list');
        list.addEventListener('click', this.remove.bind(this));
    }

    remove(e) {
        const removeEl = e.target.closest('li');
        if (e.target.classList.contains('btn-clear')) {
            removeEl.remove();
        }
    }
    addItem(e) {
        if (e.target.classList.contains('btn-add')) {
            //Функція Лілі
        }
    }
}

export default CreateItem;

const root = document.querySelector('#root');

const test = new CreateItem();
console.log(test);

test.start(root);