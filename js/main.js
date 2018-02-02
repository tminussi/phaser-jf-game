const game = new Phaser.Game(1280, 780, Phaser.AUTO);

const GameState = {
    preload: function () {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('horse', 'assets/images/horse.png');
        this.load.image('sheep', 'assets/images/sheep.png');
    },
    create: function () {
        this.setScales();
        this.addBackground();
        this.addAnimals();
    },
    update: function () {
        // this.animals.forEach((animal) => {
        //     if (animal.key === 'horse') {
        //         animal.angle += 1;
        //     } else {
        //         animal.angle -= 1;
        //     }
        // })
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
            let animal = this.animals.create(this.game.world.centerX, this.game.world.centerY, image.key);
            animal.anchor.setTo(0.5);
            animal.inputEnabled = true;
            animal.input.pixelPerfect = true;
            animal.events.onInputDown.add(this.animateAnimal, this);
        });
    },

    animateAnimal: function (sprite, event) {
        console.log('animating ' + sprite.key);
    }
};

game.state.add('GameState', GameState);

game.state.start('GameState');