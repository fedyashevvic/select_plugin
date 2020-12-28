import './select/select.scss';
import {Select} from './select/select.js';

const select = new Select(`#select`, {
  placeholder: `Choose your option..`,
  takeFromHtml: false,
  includeImg: true,
  includeTitle: true,
  selectData: [
    {
      img: `./bat.e0ea8d3d.svg`,
      title: `ABYSS`,
      text: `The Abyss`
    },
    {
      img: `./bat.e0ea8d3d.svg`,
      title: `ADA`,
      text: `Cardano`
    },
    {
      img: `./bat.e0ea8d3d.svg`,
      title: `ANT`,
      text: `Aragon`
    },
  ],
});

