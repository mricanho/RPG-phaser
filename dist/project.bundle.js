/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_modules_game__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_modules_battle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_modules_interface__ = __webpack_require__(3);





const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 },
          debug: true // set to true to view zones
      }
  },
  scene: [
      __WEBPACK_IMPORTED_MODULE_0__src_modules_game__["a" /* BootScene */],
      __WEBPACK_IMPORTED_MODULE_0__src_modules_game__["b" /* WorldScene */],
      __WEBPACK_IMPORTED_MODULE_1__src_modules_battle__["a" /* BattleScene */],
      __WEBPACK_IMPORTED_MODULE_2__src_modules_interface__["a" /* UIScene */]
  ]
};

const game = new Phaser.Game(config);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const BootScene = new Phaser.Class({
 
  Extends: Phaser.Scene,

  initialize:

  function BootScene ()
  {
      Phaser.Scene.call(this, { key: 'BootScene' });
  },

  preload()
  {
      // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');
        
      // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
      
      // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

    // enemies
    this.load.image("dragonblue", "assets/dragonblue.png");
    this.load.image("dragonorrange", "assets/dragonorrange.png");
    
    // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

  },

  create()
  {
    this.scene.start('WorldScene');
  }
});
/* harmony export (immutable) */ __webpack_exports__["a"] = BootScene;


const WorldScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function WorldScene ()
  {
      Phaser.Scene.call(this, { key: 'WorldScene' });
  },

  preload()
  {
      
  },
  
  create()
  {
    // create the map
    const map = this.make.tilemap({ key: 'map' });
        
    // first parameter is the name of the tilemap in tiled
    const tiles = map.addTilesetImage('spritesheet', 'tiles');
    
    // creating the layers
    const grass = map.createStaticLayer('Grass', tiles, 0, 0);
    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    
    // make all tiles in obstacles collidable
    obstacles.setCollisionByExclusion([-1]);

    // our player sprite created through the phycis system
    this.player = this.physics.add.sprite(50, 100, 'player', 6);
        
    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);
    
    // don't walk on trees
    this.physics.add.collider(this.player, obstacles);

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();

     //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
        frameRate: 10,
        repeat: -1
    });
        
    // animation with key 'right'
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
        frameRate: 10,
        repeat: -1
    }); 

    // where the enemies will be
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for(let i = 0; i < 30; i++) {
        let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        // parameters are x, y, width, height
        this.spawns.create(x, y, 20, 20);            
    }        
    // add collider
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    // we listen for 'wake' event
    this.sys.events.on('wake', this.wake, this);
  },
  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  },
  onMeetEnemy(player, zone) {        
      // we move the zone to some other location
      zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      
      // shake the world and flash
      this.cameras.main.shake(300);
      this.cameras.main.flash(465);
      
      this.input.stopPropagation();
      // start battle 
      this.scene.switch('BattleScene');                
  },
  update(time, delta)
  {
      this.player.body.setVelocity(0);
  
      // Horizontal movement
      if (this.cursors.left.isDown)
      {
          this.player.body.setVelocityX(-80);
      }
      else if (this.cursors.right.isDown)
      {
          this.player.body.setVelocityX(80);
      }

      // Vertical movement
      if (this.cursors.up.isDown)
      {
          this.player.body.setVelocityY(-80);
      }
      else if (this.cursors.down.isDown)
      {
          this.player.body.setVelocityY(80);
      }    

      if (this.cursors.left.isDown) {
        this.player.anims.play('left', true);
        this.player.flipX = true;
      } else if (this.cursors.right.isDown) {
        this.player.anims.play('right', true);
        this.player.flipX = false;
      } else if (this.cursors.up.isDown) {
        this.player.anims.play('up', true);
      } else if (this.cursors.down.isDown) {
        this.player.anims.play('down', true);
      } else {
        this.player.anims.stop();
      }
  }

});
/* harmony export (immutable) */ __webpack_exports__["b"] = WorldScene;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const BattleScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function BattleScene ()
  {
      Phaser.Scene.call(this, { key: "BattleScene" });
  },
  create()
  {    
      // change the background to green
      this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
      this.startBattle();
      // on wake event we call startBattle too
      this.sys.events.on('wake', this.startBattle, this);             
  },
  startBattle() {
      // player character - warrior
      const warrior = new PlayerCharacter(this, 250, 50, "player", 1, "Warrior", 100, 20);        
      this.add.existing(warrior);
      
      // player character - mage
      const mage = new PlayerCharacter(this, 250, 100, "player", 4, "Mage", 80, 8);
      this.add.existing(mage);            
      
      const dragonblue = new Enemy(this, 50, 50, "dragonblue", null, "Dragon", 50, 3);
      this.add.existing(dragonblue);
      
      const dragonOrange = new Enemy(this, 50, 100, "dragonorrange", null,"Dragon2", 50, 3);
      this.add.existing(dragonOrange);
      
      // array with heroes
      this.heroes = [ warrior, mage ];
      // array with enemies
      this.enemies = [ dragonblue, dragonOrange ];
      // array with both parties, who will attack
      this.units = this.heroes.concat(this.enemies);
      
      this.index = -1; // currently active unit
      
      this.scene.run("UIScene");        
  },
  nextTurn() {  
      // if we have victory or game over
      if(this.checkEndBattle()) {           
          this.endBattle();
          return;
      }
      do {
          // currently active unit
          this.index++;
          // if there are no more units, we start again from the first one
          if(this.index >= this.units.length) {
              this.index = 0;
          }            
      } while(!this.units[this.index].living);
      // if its player hero
      if(this.units[this.index] instanceof PlayerCharacter) {
          // we need the player to select action and then enemy
          this.events.emit("PlayerSelect", this.index);
      } else { // else if its enemy unit
          // pick random living hero to be attacked
          let r;
          do {
              r = Math.floor(Math.random() * this.heroes.length);
          } while(!this.heroes[r].living) 
          // call the enemy's attack function 
          this.units[this.index].attack(this.heroes[r]);  
          // add timer for the next turn, so will have smooth gameplay
          this.time.addEvent({ delay: 1500, callback: this.nextTurn, callbackScope: this });
      }
  },     
  // check for game over or victory
  checkEndBattle() {        
      let victory = true;
      // if all enemies are dead we have victory
      for(let i = 0; i < this.enemies.length; i++) {
          if(this.enemies[i].living)
              victory = false;
      }
      let gameOver = true;
      // if all heroes are dead we have game over
      for(let i = 0; i < this.heroes.length; i++) {
          if(this.heroes[i].living)
              gameOver = false;
      }
      return victory || gameOver;
  },
  // when the player have selected the enemy to be attacked
  receivePlayerSelection(action, target) {
      if(action == "attack") {            
          this.units[this.index].attack(this.enemies[target]);              
      }
      // next turn in 1.7 seconds
      this.time.addEvent({ delay: 1700, callback: this.nextTurn, callbackScope: this });        
  },    
  endBattle() {       
      // clear state, remove sprites
      this.heroes.length = 0;
      this.enemies.length = 0;
      for(let i = 0; i < this.units.length; i++) {
          // link item
          this.units[i].destroy();            
      }
      this.units.length = 0;
      // sleep the UI
      this.scene.sleep('UIScene');
      // return to WorldScene and sleep current BattleScene
      this.scene.switch('WorldScene');
  }
});
/* harmony export (immutable) */ __webpack_exports__["a"] = BattleScene;


// base class for heroes and enemies
const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize:

  function Unit(scene, x, y, texture, frame, type, hp, damage) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
      this.type = type;
      this.maxHp = this.hp = hp;
      this.damage = damage; // default damage     
      this.living = true;         
      this.menuItem = null;
  },
  // we will use this to notify the menu item when the unit is dead
  setMenuItem(item) {
      this.menuItem = item;
  },
  // attack the target unit
  attack(target) {
      if(target.living) {
          target.takeDamage(this.damage);
          this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
      }
  },    
  takeDamage(damage) {
      this.hp -= damage;
      if(this.hp <= 0) {
          this.hp = 0;
          this.menuItem.unitKilled();
          this.living = false;
          this.visible = false;   
          this.menuItem = null;
      }
  }    
});
/* unused harmony export Unit */


const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize:
  function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
      this.setScale(1); // Size of the enemy
  }
});
/* unused harmony export Enemy */


const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize:
  function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
      // flip the image so I don"t have to edit it manually
      this.flipX = true;
      
      this.setScale(1.5);
  }
});







/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,
  
  initialize:
          
  function MenuItem(x, y, text, scene) {
      Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: "#ffffff", align: "left", fontSize: 15});
  },
  
  select() {
      this.setColor("#f8ff38");
  },
  
  deselect() {
      this.setColor("#ffffff");
  },
  // when the associated enemy or player unit is killed
  unitKilled() {
      this.active = false;
      this.visible = false;
  }
  
});

// base menu class, container for menu items
const Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,
  
  initialize:
          
  function Menu(x, y, scene, heroes) {
      Phaser.GameObjects.Container.call(this, scene, x, y);
      this.menuItems = [];
      this.menuItemIndex = 0;
      this.x = x;
      this.y = y;        
      this.selected = false;
  },     
  addMenuItem(unit) {
      let menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
      this.menuItems.push(menuItem);
      this.add(menuItem); 
      return menuItem;
  },  
  // menu navigation 
  moveSelectionUp() {
      this.menuItems[this.menuItemIndex].deselect();
      do {
          this.menuItemIndex--;
          if(this.menuItemIndex < 0)
              this.menuItemIndex = this.menuItems.length - 1;
      } while(!this.menuItems[this.menuItemIndex].active);
      this.menuItems[this.menuItemIndex].select();
  },
  moveSelectionDown() {
      this.menuItems[this.menuItemIndex].deselect();
      do {
          this.menuItemIndex++;
          if(this.menuItemIndex >= this.menuItems.length)
              this.menuItemIndex = 0;
      } while(!this.menuItems[this.menuItemIndex].active);
      this.menuItems[this.menuItemIndex].select();
  },
  // select the menu as a whole and highlight the choosen element
  select(index) {
      if(!index)
          index = 0;       
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = index;
      while(!this.menuItems[this.menuItemIndex].active) {
          this.menuItemIndex++;
          if(this.menuItemIndex >= this.menuItems.length)
              this.menuItemIndex = 0;
          if(this.menuItemIndex == index)
              return;
      }        
      this.menuItems[this.menuItemIndex].select();
      this.selected = true;
  },
  // deselect this menu
  deselect() {        
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = 0;
      this.selected = false;
  },
  confirm() {
      // when the player confirms his slection, do the action
  },
  // clear menu and remove all menu items
  clear() {
      for(let i = 0; i < this.menuItems.length; i++) {
          this.menuItems[i].destroy();
      }
      this.menuItems.length = 0;
      this.menuItemIndex = 0;
  },
  // recreate the menu items
  remap(units) {
      this.clear();        
      for(let i = 0; i < units.length; i++) {
          let unit = units[i];
          unit.setMenuItem(this.addMenuItem(unit.type));            
      }
      this.menuItemIndex = 0;
  }
});

// User Interface scene
const UIScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function UIScene ()
  {
      Phaser.Scene.call(this, { key: "UIScene" });
  },

  create()
  {    
      // draw some background for the menu
      this.graphics = this.add.graphics();
      this.graphics.lineStyle(1, 0xffffff);
      this.graphics.fillStyle(0x031f4c, 1);        
      this.graphics.strokeRect(2, 150, 90, 100);
      this.graphics.fillRect(2, 150, 90, 100);
      this.graphics.strokeRect(95, 150, 90, 100);
      this.graphics.fillRect(95, 150, 90, 100);
      this.graphics.strokeRect(188, 150, 130, 100);
      this.graphics.fillRect(188, 150, 130, 100);
      
      // basic container to hold all menus
      this.menus = this.add.container();
              
      this.heroesMenu = new HeroesMenu(195, 153, this);           
      this.actionsMenu = new ActionsMenu(100, 153, this);            
      this.enemiesMenu = new EnemiesMenu(8, 153, this);   
      
      // the currently selected menu 
      this.currentMenu = this.actionsMenu;
      
      // add menus to the container
      this.menus.add(this.heroesMenu);
      this.menus.add(this.actionsMenu);
      this.menus.add(this.enemiesMenu);
              
      this.battleScene = this.scene.get("BattleScene");                                
      
      // listen for keyboard events
      this.input.keyboard.on("keydown", this.onKeyInput, this);   
      
      // when its player cunit turn to move
      this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);
      
      // when the action on the menu is selected
      // for now we have only one action so we dont send and action id
      this.events.on("SelectedAction", this.onSelectedAction, this);
      
      // an enemy is selected
      this.events.on("Enemy", this.onEnemy, this);
      
      // when the scene receives wake event
      this.sys.events.on('wake', this.createMenu, this);
      
      // the message describing the current action
      this.message = new Message(this, this.battleScene.events);
      this.add.existing(this.message);        
      
      this.createMenu();     
  },
  createMenu() {
      // map hero menu items to heroes
      this.remapHeroes();
      // map enemies menu items to enemies
      this.remapEnemies();
      // first move
      this.battleScene.nextTurn(); 
  },
  onEnemy(index) {
      // when the enemy is selected, we deselect all menus and send event with the enemy id
      this.heroesMenu.deselect();
      this.actionsMenu.deselect();
      this.enemiesMenu.deselect();
      this.currentMenu = null;
      this.battleScene.receivePlayerSelection("attack", index);   
  },
  onPlayerSelect(id) {
      // when its player turn, we select the active hero item and the first action
      // then we make actions menu active
      this.heroesMenu.select(id);
      this.actionsMenu.select(0);
      this.currentMenu = this.actionsMenu;
  },
  // we have action selected and we make the enemies menu active
  // the player needs to choose an enemy to attack
  onSelectedAction() {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
  },
  remapHeroes() {
      let heroes = this.battleScene.heroes;
      this.heroesMenu.remap(heroes);
  },
  remapEnemies() {
      let enemies = this.battleScene.enemies;
      this.enemiesMenu.remap(enemies);
  },
  onKeyInput(event) {
      if(this.currentMenu && this.currentMenu.selected) {
          if(event.code === "ArrowUp") {
              this.currentMenu.moveSelectionUp();
          } else if(event.code === "ArrowDown") {
              this.currentMenu.moveSelectionDown();
          } else if(event.code === "ArrowRight" || event.code === "Shift") {

          } else if(event.code === "Space" || event.code === "ArrowLeft") {
              this.currentMenu.confirm();
          } 
      }
  },
});
/* harmony export (immutable) */ __webpack_exports__["a"] = UIScene;


// the message class extends containter 
const Message = new Phaser.Class({

  Extends: Phaser.GameObjects.Container,

  initialize:
  function Message(scene, events) {
      Phaser.GameObjects.Container.call(this, scene, 160, 30);
      const graphics = this.scene.add.graphics();
      this.add(graphics);
      graphics.lineStyle(1, 0xffffff, 0.8);
      graphics.fillStyle(0x031f4c, 0.3);        
      graphics.strokeRect(-90, -15, 180, 30);
      graphics.fillRect(-90, -15, 180, 30);
      this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", { color: "#ffffff", align: "center", fontSize: 13, wordWrap: { width: 170, useAdvancedWrap: true }});
      this.add(this.text);
      this.text.setOrigin(0.5);        
      events.on("Message", this.showMessage, this);
      this.visible = false;
  },
  showMessage(text) {
      this.text.setText(text);
      this.visible = true;
      if(this.hideEvent)
          this.hideEvent.remove(false);
      this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
  },
  hideMessage() {
      this.hideEvent = null;
      this.visible = false;
  }
});

const HeroesMenu = new Phaser.Class({
  Extends: Menu,
  
  initialize:
          
  function HeroesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);                    
  }
});

const ActionsMenu = new Phaser.Class({
  Extends: Menu,
  
  initialize:
          
  function ActionsMenu(x, y, scene) {
      Menu.call(this, x, y, scene);   
      this.addMenuItem("Attack");
  },
  confirm() { 
      // we select an action and go to the next menu and choose from the enemies to apply the action
      this.scene.events.emit("SelectedAction");        
  }
  
});

const EnemiesMenu = new Phaser.Class({
  Extends: Menu,
  
  initialize:
          
  function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);        
  },       
  confirm() {      
      // the player has selected the enemy and we send its id with the event
      this.scene.events.emit("Enemy", this.menuItemIndex);
  }
});



/***/ })
/******/ ]);