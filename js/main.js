const game = new Phaser.Game(1280, 780, Phaser.AUTO);

const GameState = {
    preload: function () {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('horse', 'assets/images/horse1.png');
        this.load.image('sheep', 'assets/images/sheep1.png');
        this.load.image('arrow', 'assets/images/arrow.png');
    },
    create: function () {
        this.setScales();
        this.addBackground();
        this.addLeftArrow();
        this.addRightArrow();
        this.addAnimals();
    },
    update: function () {
    },

    setScales: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    addBackground: function () {
        this.background = this.game.add.sprite(0, 0, 'background');
        this.background.scale.setTo(0.5);
    },

    addLeftArrow: function () {
        this.leftArrow = this.game.add.sprite(200, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow  .customParams = {
            direction: {
                backwards: true
            }
        };

        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
    },

    addRightArrow: function () {
        this.rightArrow = this.game.add.sprite(900  , this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.customParams = {
            direction: {
                forward: true
            }
        };

        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
    },

    addAnimals: function() {
        const animalImages = [
            {
                key: 'horse',
                text: 'HORSE'
            },
            {
                key: 'sheep',
                text: 'SHEEP'
            }
        ];
        this.animals = this.game.add.group();
        animalImages.forEach((image) => {
            let animal = this.animals.create(-1000, this.game.world.centerY, image.key, 0);
            animal.customParams = {
                text: image.key
            };
            animal.anchor.setTo(0.5);
            animal.inputEnabled = true;
            animal.input.pixelPerfect = true;
            animal.events.onInputDown.add(this.animateAnimal, this);
        });
        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX-100, this.game.world.centerY);
    },

    animateAnimal: function (sprite, event) {
        console.log(sprite);
    },

    switchAnimal: function (sprite, event) {
        let newAnimal;
        let endX;

        if (sprite.customParams.direction.forward) {
            newAnimal = this.animals.next();
            newAnimal.x = (-newAnimal.width / 2);
            endX = 1280 + this.currentAnimal.width / 2;
        } else {
            newAnimal = this.animals.previous();
            newAnimal.x = 1280 + newAnimal.width / 2;
            endX = (1280 + this.currentAnimal.width / 2) * -1;
        }
        const animalMovement = this.game.add.tween(newAnimal);
        animalMovement.to({
            x: this.game.world.centerX - 100
        }, 1000);
        animalMovement.start();

        const currentAnimalMovement = this.game.add.tween(this.currentAnimal);
        currentAnimalMovement.to({
            x: endX
        }, 1000);
        currentAnimalMovement.start();

        this.currentAnimal = newAnimal;
    }
};

game.state.add('GameState', GameState);

game.state.start('GameState');