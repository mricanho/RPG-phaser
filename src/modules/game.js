/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import game from '../index';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  startButtonAction() {
    this.startButton.on('pointerdown', () => {
      this.scene.start('GetName');
    });
  }

  instructionsAction() {
    this.instructionsButton.on('pointerdown', () => {
      this.scene.start('Instructions');
    });
  }

  scoresAction() {
    this.scoresButton.on('pointerdown', () => {
      this.scene.start('Scores');
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#F3C5F8');
    this.add.text(
      game.config.width / 2,
      25,
      "Karen's Adventure", {
        fill: '#DAF7A6',
        fontSize: '30px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    this.startButton = this.add.text(
      game.config.width / 2,
      100,
      'START GAME',
      24, {
        fill: '#ffffff',
        fontSize: '27px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    this.instructionsButton = this.add.text(
      game.config.width / 2,
      130,
      'HOW TO PLAY',
      24, {
        fill: '#ffffff',
        fontSize: '27px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    this.scoresButton = this.add.text(
      game.config.width / 2,
      160,
      'SCORES',
      24, {
        fill: '#ffffff',
        fontSize: '27px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    this.startButton.setInteractive();
    this.startButtonAction();

    this.instructionsButton.setInteractive();
    this.instructionsAction();

    this.scoresButton.setInteractive();
    this.scoresAction();

    if (window.bgMusic === false) {
      window.bgMusic = true;
      game.bgMusic.play();
    }
  }
}