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
/***/ (function(module, exports) {

var BootScene = new Phaser.Class({
 
  Extends: Phaser.Scene,

  initialize:

  function BootScene ()
  {
      Phaser.Scene.call(this, { key: 'BootScene' });
  },

  preload: function ()
  {
      // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');
        
      // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
      
      // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });

  },

  create: function ()
  {
    this.scene.start('WorldScene');
  }
});

var WorldScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function WorldScene ()
  {
      Phaser.Scene.call(this, { key: 'WorldScene' });
  },
  preload: function ()
  {
      
  },
  create: function ()
  {
    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('spritesheet', 'tiles');
        
	  var grass = map.createStaticLayer('Grass', tiles, 0, 0);
        var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        obstacles.setCollisionByExclusion([-1]);

        this.player = this.physics.add.sprite(50, 100, 'player', 6);

        this.physics.world.bounds.width = map.widthInPixels;
        this.physics.world.bounds.height = map.heightInPixels;
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

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

      this.physics.add.collider(this.player, obstacles);
  },
  update: function (time, delta)
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

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 }
          /* debug:true */
      }
  },
  scene: [
      BootScene,
      WorldScene
  ]
};
var game = new Phaser.Game(config);

/***/ })
/******/ ]);