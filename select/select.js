function getTemplate (placeholder, data) {
  const itemsList = data.selectData.map(x => `<div data-type="list-item" class="select__item">${data.includeImg ? `<img data-type="item-img" src="${x.img}">` : ``}${data.includeTitle ? `<span data-type="item-title" class="title">${x.title}</span>` : ``}<span data-type="item-text" class="text">${x.text}</span></div>`)
  return `
      <div class="select__input" data-type="input"><img src="./select/img/bat.svg"><span>${placeholder ?? `Select currency...`}</span><i data-type="arrow" class="fas fa-chevron-down"></i></div>
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
    this.arrow = this.selectorElement.querySelector(`[data-type="arrow"]`);

  }

  clickHandler(event) {
    const {type} = event.target.dataset;
    if (type === `input`) {
      this.toggleDropDown = this.toggleDropDown.bind(this);
      this.toggleDropDown();
    } else if (type === `list-item`) {
      this.close();
    }
  }
  open() {
    this.selectorElement.classList.add(`opened`);
    this.arrow.classList.remove(`fa-chevron-down`)
    this.arrow.classList.add(`fa-times`)
  }

  close() {
    this.selectorElement.classList.remove(`opened`);
    this.arrow.classList.remove(`fa-times`)
    this.arrow.classList.add(`fa-chevron-down`)
  }

  toggleDropDown() {
    this._isOpened ? this.close() : this.open();
    this._isOpened = !this._isOpened;
  }
  
}