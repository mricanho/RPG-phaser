import Phaser from 'phaser';
import Menu from '../modules/menus/menu';

test('Player is a subclass of Sprite', () => {
  expect(Menu.prototype instanceof Phaser.GameObjects.Container).toBe(true);
});