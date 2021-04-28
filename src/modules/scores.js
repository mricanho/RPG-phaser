/* eslint-disable import/no-cycle */

import Phaser from 'phaser';
import game from '../index';
import { scoreBoard, sortScores } from '../api/scoreboard';

export default class Scores extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  backButtonAction() {
    this.backButton.on('pointerdown', () => {
      this.scene.start('Game');
    });
  }

  displayLeaders(list) {
    for (let i = 1; i < 6; i += 1) {
      if (i >= list.length) {
        break;
      }
      this.add.text(
        game.config.width / 2,
        70 + 25 * i,
        `${list[i].user}   ${list[i].score}`, {
          fill: '#ffff00',
          fontSize: '24px',
          fontFamily: 'sans-serif',
        },
      ).setOrigin(0.5);
    }
  }

  async create() {
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

    const scores = await scoreBoard();
    this.displayLeaders(sortScores(scores));

    this.backButton = this.add.text(
      game.config.width / 2,
      game.config.height - 20,
      'Back', {
        fill: '#ffffff',
        fontSize: '24px',
        fontFamily: 'sans-serif',
      },
    ).setOrigin(0.5);

    this.backButton.setInteractive();
    this.backButtonAction();
  }
}