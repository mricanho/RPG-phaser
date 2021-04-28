import Phaser from 'phaser';
import Enemy from '../src/modules/characters/enemy';

test('Enemy is a subclass of Sprite', () => {
  expect(Enemy.prototype instanceof Phaser.GameObjects.Sprite).toBe(true);
});