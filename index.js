import './select/select.scss';
import {Select} from './select/select.js';

const select = new Select(`#select`, {
  placeholder: `Choose your option..`,
  takeFromHtml: false,
  includeImg: true,
  includeTitle: true,
  selectData: [
    {
      img: `./select/img/bat.svg`,
      title: `ABYSS`,
      text: `The Abyss`
    },
    {
      img: `./select/img/bat.svg`,
      title: `ADA`,
      text: `Cardano`
    },
    {
      img: `./select/img/bat.svg`,
      title: `ANT`,
      text: `Aragon`
    },
  ],
});

