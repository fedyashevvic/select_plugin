function getTemplate (placeholder, data) {
  const itemsList = data.selectData.map(x => `<div class="select__item" data-type="list-item" data-id="${x.id}">${data.includeImg ? `<img data-type="item-img" src="${x.img}" width="15px">` : ``}${data.includeTitle ? `<span data-type="item-title" class="title">${x.title}</span>` : ``}<span data-type="item-text" class="text">${x.text}</span></div>`)
  return `
      <div class="select__input" data-type="input"><i class="far fa-search search-icon"></i><span>${placeholder ?? `Select currency...`}</span><i data-type="arrow" class="fas select-arrow fa-chevron-down"></i></div>
      <div class="select__item-list">
        ${itemsList.join(``)}
      </div>
  `;
}


export class Select {
  constructor(selector, config) {
    this.selectorElement = document.querySelector(selector);
    this._isOpened = false;
    this.configData = config;

    this.#renderSelect();
    this.#setup();
  }

  #renderSelect() {
    this.selectorElement.classList.add(`wrap`);
    const {placeholder} = this.configData;
    this.selectorElement.innerHTML = getTemplate(placeholder, this.configData);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.selectorElement.addEventListener(`click`, this.clickHandler);
    this.$arrow = this.selectorElement.querySelector(`[data-type="arrow"]`);
    this.$input = this.selectorElement.querySelector(`[data-type="input"]`);
  }

  get currentItem() {
    return this.configData.selectData.find(x => x.id === +this.selectedItem);
  }

  getInputHtml(data) {
    return `<img src="${data.img}" width="25px"><span class="select__active-title">${data.title}</span><i data-type="close" class="select-arrow far fa-times"></i>`;
  }

  clickHandler(event) {
    const {type} = event.target.dataset;
    const parentType = event.target.parentNode.dataset.type;
    if (type === `input` || parentType  === `input`) {
      this.toggleDropDown = this.toggleDropDown.bind(this);
      this.toggleDropDown();
    } else if (type === `list-item` || parentType === `list-item`) {
      const $itemEl = event.target.closest(`div.select__item`);
      this.selectedItem = $itemEl.dataset.id;
      this.$input.innerHTML = this.getInputHtml(this.currentItem);
      this.toggleDropDown();
    } else if (type === `close` || parentType === `close`) {
      this.selectedItem = null;
    }
  }
  open() {
    this.selectorElement.classList.add(`opened`);
    this.$arrow.classList.remove(`fa-chevron-down`)
    this.$arrow.classList.add(`fa-times`)
  }

  close() {
    this.selectorElement.classList.remove(`opened`);
    this.$arrow.classList.remove(`fa-times`)
    this.$arrow.classList.add(`fa-chevron-down`)
  }

  toggleDropDown() {
    this._isOpened ? this.close() : this.open();
    this._isOpened = !this._isOpened;
  }
  
}