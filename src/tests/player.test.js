import Phaser from 'phaser';
import Player from '../modules/characters/player';

test('Player is a subclass of Sprite', () => {
  expect(Player.prototype instanceof Phaser.GameObjects.Sprite).toBe(true);
});