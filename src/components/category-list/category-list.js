import './category-list.scss';
import addDish from '../add-category/add-category';
import fetchJs from '../helpers/fetch-js'

class Dishes {
    constructor(arr) {
        this.dishesList = arr;
        this.arr = [];
    }


    createContentHeader = () => {
        const root = document.querySelector('main');
        root.innerHTML =
            '<div class="content-header"><h2 class="content-header__title">Категории <span class="content-header__quantity" data-action="quantity">0</span></h2><button class="content-header__button" data-action="add">Добавить</button></div>';
    };
    createFastSearch = () => {
        const root = document.querySelector('main');
        root.innerHTML +=
            ' <div class="search"><form class="search-form"><button class="search-form__btn" type="submit"></button><input type="search" class="search-form__input" name="fast-search" placeholder="Быстрый поиск" autofocus></form></div>';
    };
    createList = () => {
        const root = document.querySelector('main');
        root.innerHTML +=
            '   <section class="categories"><div class="categories__titles"><h3 class="categories__title">Категория</h3></div><ul class="categories__list"></ul></section>';
    };




    createDishesItems = () => {
        const list = document.querySelector('.categories__list');
        const quantity = document.querySelector('span[data-action="quantity"]');

        const arrayFromBackend = this.dishesList;
        arrayFromBackend.forEach(el => {

            const categoriesItem = document.createElement('li');
            categoriesItem.classList.add('categories__item');
            const par = `<div class="categories__meal"><img  class="categories__img" src="${el.img}" alt=""><span data-action="name">${el.name}</span></div><div class="btn-open"><a href="#">Ред.</a><button class="btn-open__btn" data-action="openHideMenu">...<ul class="btn-open__list"><li class="btn-open__item" data-action="hide" >Скрыть</li><li class="btn-open__item" data-action="delete">Удалить</li></ul></button></div>`;
            categoriesItem.insertAdjacentHTML('beforeend', par);
            this.arr.push(categoriesItem);
        });
        list.append(...this.arr);
        quantity.textContent = list.children.length;

        list.addEventListener('click', e => {
            const arrOpenMenu = document.querySelectorAll('.btn-open__list--on');
            const element = e.target;

            const exitByEsc = function(e) {
                if (e.code === 'Escape') {
                    e.target.firstElementChild.classList.remove('btn-open__list--on');
                }
                window.removeEventListener('keydown', exitByEsc);
            };
            const exitByCLick = function(e) {
                if (e.target.dataset.action === 'openHideMenu') {
                    return;
                }
                element.firstElementChild.classList.remove('btn-open__list--on');
                window.removeEventListener('click', exitByCLick);
            };

            if (element.dataset.action === 'openHideMenu') {
                arrOpenMenu.forEach(el => el.classList.remove('btn-open__list--on'));
                element.firstElementChild.classList.add('btn-open__list--on');

                window.addEventListener('keydown', exitByEsc);

                window.addEventListener('click', exitByCLick);
            }

            if (element.dataset.action === 'hide') {
                element.textContent = 'Показать';
                element.dataset.action = 'review';
                element.parentNode.parentNode.parentNode.previousElementSibling.classList.add(
                    'low-opacity',
                );
                return;
            }

            if (element.dataset.action === 'review') {
                element.textContent = 'Скрыть';
                element.dataset.action = 'hide';
                element.parentNode.parentNode.parentNode.previousElementSibling.classList.remove(
                    'low-opacity',
                );
            }

            if (element.dataset.action === 'delete') {
                if (confirm('It was missclick, bro =3')) {
                    element.parentNode.parentNode.parentNode.parentNode.remove();
                    quantity.textContent = list.children.length;
                } else {
                    return;
                }
            }
        });
    };
    fastSearch = () => {
        const searchForm = document.querySelector('.search-form');
        searchForm.addEventListener('submit', e => e.preventDefault());
        const searchInput = document.querySelector('input[name="fast-search"]');
        const namesArr = Array.from(
            document.querySelectorAll('span[data-action="name"]'),
        );
        const categoriesItemArr = namesArr.map(el => el.parentNode.parentNode);

        const searchDish = function() {
            searchInput.value === '' ?
                categoriesItemArr.forEach(el => el.classList.remove('dn')) :
                categoriesItemArr.forEach(el => el.classList.add('dn'));
            namesArr.forEach(el => {
                if (
                    el.textContent.toLowerCase().includes(searchInput.value.toLowerCase())
                ) {
                    el.parentNode.parentNode.classList.remove('dn');
                }
            });
        };
        searchInput.addEventListener('input', searchDish);
    };


    createPage = () => {
        this.createContentHeader();
        this.createFastSearch();
        this.createList();
        this.createDishesItems();
        this.fastSearch();
        const btnAdd = document.querySelector('.content-header__button');
        btnAdd.addEventListener('click', new addDish().createPage);
    };
}

export default Dishes;