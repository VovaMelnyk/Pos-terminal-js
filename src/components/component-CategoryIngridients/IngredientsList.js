class IngredientsList {
  constructor(data) {
    this.data = data;
  }
  render = () => {
    if (this.data.length > 0) {
      return this.data.reduce((acc, item) => {
        acc += `
                <li class="row yesh__item" id='${item.id}'>
                    <div class="col s4 m5" id="js-category">
                      <div>${item.name}</div>
                    </div>
                    <div class="col s4 m5">
                      <div class="yesh__item-amount">
                      ${item.amount ? item.amount : '0'}
                      </div>
                    </div>
                    <div class="col s2 m1 yesh__item-btn" id=${item.id}>
                      <span class="yesh-link" id="js__category-edit">edit</span>
                    </div>
                    <div class="col s2 m1 yesh__item-btn" id='${item.id}' >
                      <span class="yesh-link" id="js__category-delete">
                        <i class="material-icons yesh__noClick">delete_forever</i>
                      </span>
                    </div>
                </li>`;
        return acc;
      }, '');
    } else {
      return `
          <li class="row yesh__item yesh__item-empty" id='js__list-empty'>
              Не найдено ни одной категории ингредиентов.
          </li>`;
    }
  };
  init = () => {
    return this.render();
  };
}
export default IngredientsList;
