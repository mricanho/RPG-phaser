import Phaser from 'phaser';
import Message from '../modules/menus/message';

test('Message is a subclass of container', () => {
  expect(Message.prototype instanceof Phaser.GameObjects.Container).toBe(true);
});