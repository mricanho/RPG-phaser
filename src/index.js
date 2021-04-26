import Phaser from 'phaser';
import WorldScene from './modules/world';
import BootScene from './modules/boot';
import BattleScene from './modules/battle';
import UIScene from './modules/interface';
import Game from './modules/game';
import GetName from './modules/name';

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
    WorldScene,
    BattleScene,
    UIScene,
  ],
};

const game = new Phaser.Game(config);

export default game;