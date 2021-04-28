/* eslint-disable import/no-cycle */

import Phaser from 'phaser';
import game from '../index';

export default class Instructions extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  backButtonAction() {
    this.backButton.on('pointerdown', () => {
      this.scene.start('Game');
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

    this.add.text(
      game.config.width / 2,
      60,
      'Use the arrow keys on your keyboard to move through the world. \nOnce you are fighting, select your action with Space Bar or the left arrow key. Defeat people to gain points for you score. \nAfter a Win, Karen and her bestie gain a little bit of Health. If you have low life you can deal double damage', {
        fill: '#ffffff',
        fontSize: '12px',
        fontFamily: 'sans-serif',
        align: 'center',
        wordWrap: { width: 260, useAdvancedWrap: true },
      },
    ).setOrigin(0.5, 0);

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