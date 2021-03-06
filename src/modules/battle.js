/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import PlayerCharacter from './characters/player';
import Enemy from './characters/enemy';
import game from '../index';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    // change the background to green
    this.warriorHP = 100;
    this.mageHP = 80;
    this.score = 0;
    this.cameras.main.setBackgroundColor('#FDEDFF');
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);
  }

  generateRandomEnemies() {
    const all = ['leidy', 'reseller', 'ximena', 'fan'];
    const names = ['Leidy', 'T. Reseller', 'Ximena', 'Crazy Fan'];
    const HPs = [34, 39, 40, 39];
    const dmg = [35, 32, 24, 30];

    // for the first enemy:
    const one = Math.floor(Math.random() * all.length);

    const fstEnemy = new Enemy(this, 50, 40, all[one], null, names[one], HPs[one], dmg[one]);
    this.add.existing(fstEnemy);

    // for the second enemy:
    const two = Math.floor(Math.random() * all.length);
    const secEnemy = new Enemy(this, 50, 110, all[two], null, names[two], HPs[two], dmg[two]);
    this.add.existing(secEnemy);

    return [fstEnemy, secEnemy];
  }

  startBattle() {
    window.bgMusic = false;
    window.worldMusic = false;
    window.battleMusic = true;
    game.bgMusic.stop();
    game.worldMusic.stop();
    game.battleMusic.play();

    this.heroes = [];
    // player character ==> warrior
    if (this.warriorHP > 0) {
      const warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Karen', this.warriorHP, 12);
      this.add.existing(warrior);
      this.heroes = this.heroes.concat(warrior);
    }
    // player character ==> mage
    if (this.mageHP > 0) {
      const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Bestie', this.mageHP, 22);
      this.add.existing(mage);
      this.heroes = this.heroes.concat(mage);
    }

    // enemies
    this.enemies = this.generateRandomEnemies();

    this.units = this.heroes.concat(this.enemies);
    this.index = -1;

    this.scene.run('UIScene');
  }

  nextTurn() {
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      this.index += 1;
      // if there are no more units, start again from 1st one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);

    // if its player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerSelect', this.index);
    } else {
      // random index for attacking
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      // call attack function with enemy attacking random chosen hero to attack
      this.units[this.index].attack(this.heroes[r]);
      // add timer for next turn
      this.time.addEvent({ delay: 1500, callback: this.nextTurn, callbackScope: this });
    }
  }

  // when the player have selected the enemy to be attacked
  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    // next turn in 1.7 seconds
    this.time.addEvent({ delay: 1700, callback: this.nextTurn, callbackScope: this });
  }

  exitBattle() {
    this.scene.sleep('UIScene');
    this.scene.switch('WorldScene');
  }

  wake() {
    this.scene.restart('UIScene');
    this.time.addEvent({ delay: 5000, callback: this.exitBattle, callbackScope: this });
  }

  checkEndBattle() {
    let victory = true;
    let gameOver = true;

    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) victory = false;
    }

    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) { gameOver = false; }
    }

    return victory || gameOver;
  }

  endBattle() {
    if (this.heroes.length === 2) {
      if (this.heroes[0].hp > 0) {
        this.heroes[0].hp += 10;
        if (this.heroes[0].hp > this.heroes[0].maxHP) {
          this.heroes[0].hp = this.heroes[0].maxHP;
        }
      }

      if (this.heroes[1].hp > 0) {
        this.heroes[1].hp += 10;
        if (this.heroes[1].hp > this.heroes[1].maxHP) {
          this.heroes[1].hp = this.heroes[1].maxHP;
        }
      }
      this.warriorHP = this.heroes[0].hp;
      this.mageHP = this.heroes[1].hp;
    } else if (this.heroes.length === 1 && this.heroes[0].hp > 0) {
      if (this.heroes[0].type === 'Warrior') {
        this.warriorHP = this.heroes[0].hp + 12;
      } else if (this.heroes[0].type === 'Mage') {
        this.mageHP = this.heroes[0].hp + 12;
      }
    } else if (this.heroes.length === 1 && this.heroes[0].hp <= 0) {
      if (this.heroes[0].type === 'Warrior') {
        this.warriorHP = 0;
      } else {
        this.mageHP = 0;
      }
    }

    this.heroes.length = 0;
    this.enemies.length = 0;

    for (let i = 0; i < this.units.length; i += 1) {
      this.units[i].destroy();
    }
    this.units.length = 0;

    this.scene.sleep('UIScene');

    if (this.warriorHP <= 0 && this.mageHP <= 0) {
      this.gameIsOver();
    } else {
      // return WS
      this.scene.switch('WorldScene');
      if (window.bgMusic === false) {
        window.battleMusic = false;
        game.battleMusic.stop();
        window.bgMusic = true;
        game.bgMusic.play();
      }
    }
  }

  gameIsOver() {
    this.scene.stop('WorldScene');
    this.scene.start('GameOver');
  }
}