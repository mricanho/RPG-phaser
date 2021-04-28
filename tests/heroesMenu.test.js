import Menu from '../src/modules/menus/menu';
import HeroesMenu from '../src/modules/menus/heroes';

test('EnemiesMenu should be a subclass of Menu', () => {
  expect(HeroesMenu.prototype instanceof Menu).toBe(true);
});