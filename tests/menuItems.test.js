import Phaser from 'phaser';
import MenuItem from '../src/modules/menus/menuItem';

test('MenuItem is a subclass of Menu', () => {
  expect(MenuItem.prototype instanceof Phaser.GameObjects.Text).toBe(true);
});