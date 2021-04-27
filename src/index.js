/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import WorldScene from './modules/world';
import Game from './modules/game';
import GetName from './modules/name';
import BootScene from './modules/boot';
import BattleScene from './modules/battle';
import UIScene from './modules/interface';
import Scores from './modules/scores';
import GameOver from './modules/gameOver';
import Instructions from './modules/instructions';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true, // set to true to view zones
    },
  },
  scene: [
    BootScene,
    Game,
    GetName,
    Instructions,
    WorldScene,
    BattleScene,
    UIScene,
    Scores,
    GameOver,
  ],
};

const game = new Phaser.Game(config);

window.score = 0;

export default game;