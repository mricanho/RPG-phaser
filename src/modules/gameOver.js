/* eslint-disable import/no-cycle */

import Phaser from 'phaser';
import game from '../index';
import { setScore } from '../api/scoreboard';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  backButtonAction() {
    this.backButton.on('pointerdown', () => {
      window.score = 0;
      this.scene.start('Game');
      if (window.worldMusic === true) {
        game.worldMusic.stop();
      }
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#F3C5F8');

    window.worldMusic = true;
    window.battleMusic = false;
    window.bgMusic = false;
    game.worldMusic.play();
    game.battleMusic.stop();
    game.bgMusic.stop();

    this.add.text(
      game.config.width / 2,
      20,
      "Karen's Adventure", {
        fill: '#DAF7A6',
        fontSize: '32px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      50,
      "To be continue", {
        fill: '#ffffff',
        fontSize: '28px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      100,
      'Your Score:', {
        fill: '#ffffff',
        fontSize: '24px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      140,
      `${window.playerName}: ${window.score}`, {
        fill: '#ffffff',
        fontSize: '22px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    this.backButton = this.add.text(
      game.config.width / 2,
      game.config.height - 20,
      'Back to Main Menu', {
        fill: '#ffffff',
        fontSize: '24px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    setScore(window.playerName, window.score);

    this.backButton.setInteractive();
    this.backButtonAction();
  }
}