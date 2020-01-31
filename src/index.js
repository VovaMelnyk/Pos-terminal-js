import imgSource from './assets/img/javascript.jpg';
import moment from 'moment';
import '@/styles/base';
import M from 'materialize-css';
import '@/styles/materialize/materialize';

const root = document.querySelector('#root');
root.innerHTML = ` <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
<div id="modal1" class="modal">
  <div class="modal-content">
    <h4>Modal Header</h4>
    <p>A bunch of text</p>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
  </div>
</div>`;
// const img = document.createElement('img');
// img.src = imgSource
// root.append(img)
// console.log(moment());
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});
