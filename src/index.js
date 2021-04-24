import { BootScene, WorldScene } from '../src/modules/game';
import { BattleScene, UIScene } from '../src/modules/battle';
import { UIScene } from '../src/modules/interface';


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
          debug: true // set to true to view zones
      }
  },
  scene: [
      BootScene,
      WorldScene,
      BattleScene,
      UIScene
  ]
};

const game = new Phaser.Game(config);