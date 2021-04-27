import Phaser from 'phaser';
import Unit from '../src/modules/characters/unit';

test('Unit is a subclass of Sprite', () => {
  expect(Unit.prototype instanceof Phaser.GameObjects.Sprite).toBe(true);
});