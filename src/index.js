import _ from 'lodash';
import './css/normalize.css';
import './css/style.css';
import './images/ship.svg';
import { generateGridItems, renderShips } from "./DOMinteraction/render";
import { gameLoop } from './game/game';


generateGridItems();


const game = gameLoop();