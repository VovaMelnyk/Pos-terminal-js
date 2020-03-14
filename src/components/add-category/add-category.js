import './add-category.scss';
import Dishes from '../category-list/category-list';
import fetchJs from '../helpers/fetch-js';
class addDish {
    constructor() {}
    createWindow = () => {
        const root = document.querySelector('main');
        root.innerHTML =
            '<div class="add-dish__close"><a href="#" class="add-dish__return"></a><h2 class="add-dish__title">Новая категория</h2></div><form action="" class="add-dish__form"><div class="input-container"><label for="" class="add-dish__label">Название<input type="text" class="add-input input-name" name="category-name" required data-action="name" placeholder="Например, «Холодные напитки» или «Салаты»*" autofocus></label><label for="" class="add-dish__label" >Фотография<input type="text" class="add-input input-photo" name="category-img" data-action="photo" placeholder="Ссылка на фотографию"> </label></div><button class="add-dish__btn" data-action="add">Сохранить</button> </form>';
    };
    interactive = () => {
        const inputName = document.querySelector('input[data-action="name"]');
        const inputImg = document.querySelector('input[data-action="photo"]');
        const btnAdd = document.querySelector('button[data-action="add"]');

        const newDish = {
            name: '',
            img: './img/depositphotos_7523319-stock-photo-pirate-skull-captain-with-hat.jpg',
        };
        inputName.addEventListener('focus', e => {
            inputName.classList.remove('invalid');
        });

        btnAdd.addEventListener('click', e => {
            this.postNewDish();
            e.preventDefault();
            if (inputName.value !== '') {
                newDish.name = inputName.value;
            }
            if (inputName.value === '') {
                inputName.placeholder = 'Укажите название товара';
                inputName.classList.add('invalid');
                return;
            }

            if (inputImg.value !== '') {
                newDish.img = inputImg.value;
            }
            inputName.value = '';
            inputImg.value = '';
            alert(`Категория ${newDish.name} успешно добавлена!`);

            ////пушим обьект в массив
        });
    };
    postNewDish() {
        // fetchJs()
        const inputName = document.querySelector('input[data-action="name"]');
        const category = {
            name: inputName.value,
        };
        fetch('https://pos-terminal-caffe.firebaseio.com/category.json', {
            method: 'POST',
            body: JSON.stringify(category),
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(err => console.log(err));
    }

    createPage = () => {
        this.createWindow();
        this.interactive();
        const btnBack = document.querySelector('.add-dish__return');
        btnBack.addEventListener('click', () => {
            fetchJs().then(data => new Dishes(data).createPage());
        });
    };
}
export default addDish;