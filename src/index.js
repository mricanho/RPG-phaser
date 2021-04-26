import Phaser from 'phaser';
import WorldScene from './modules/world';
import BootScene from './modules/game';
import BattleScene from './modules/battle';
import UIScene from './modules/interface';

export const config = {
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
    WorldScene,
    BattleScene,
    UIScene,
  ],
};

export const game = new Phaser.Game(config);