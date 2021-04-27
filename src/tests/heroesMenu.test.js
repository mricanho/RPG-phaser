import Menu from '../modules/menus/menu';
import HeroesMenu from '../modules/menus/heroes';

test('EnemiesMenu should be a subclass of Menu', () => {
  expect(HeroesMenu.prototype instanceof Menu).toBe(true);
});