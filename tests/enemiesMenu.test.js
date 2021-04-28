import Menu from '../src/modules/menus/menu';
import EnemiesMenu from '../src/modules/menus/enemies';

test('EnemiesMenu is a subclass of Menu', () => {
  expect(EnemiesMenu.prototype instanceof Menu).toBe(true);
});