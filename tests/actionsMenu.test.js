import Menu from '../src/modules/menus/menu';
import ActionsMenu from '../src/modules/menus/action';

test('ActionsMenu is a subclass of Menu', () => {
  expect(ActionsMenu.prototype instanceof Menu).toBe(true);
});