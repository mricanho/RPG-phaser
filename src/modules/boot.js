/* eslint-disable import/no-cycle */

import Phaser from 'phaser';
import game from '../index';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');

    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

    // enemies
    this.load.image('dragonblue', 'assets/dragonblue.png');
    this.load.image('dragonorrange', 'assets/dragonorrange.png');
    this.load.image('bat', 'assets/bat.gif');
    this.load.image('ghost', 'assets/ghost.gif');

    // audios
    this.load.audio('gameIntro', 'assets/audios/sucker.mp3');
    this.load.audio('worldMusic', 'assets/audios/cool.mp3');
    this.load.audio('battleMusic', 'assets/audios/wamgd.mp3');
  }

  create() {
    window.bgMusic = false;
    window.worldMusic = false;
    window.battleMusic = false;

    game.battleMusic = this.sound.add('battleMusic', { loop: true });
    game.worldMusic = this.sound.add('worldMusic', { loop: true });
    game.bgMusic = this.sound.add('gameIntro', { loop: true });

    this.scene.start('Game');
  }
}