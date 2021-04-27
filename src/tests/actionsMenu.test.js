import Menu from '../modules/menus/menu';
import ActionsMenu from '../modules/menus/action';

test('ActionsMenu is a subclass of Menu', () => {
  expect(ActionsMenu.prototype instanceof Menu).toBe(true);
});