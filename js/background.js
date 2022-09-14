export default class Background
{
    constructor(game)
    {
        this.sound = new Audio();
        this.sound.src = "aud/background.ogg";

        this.game = game;
        this.width = 1768;
        this.height = 500;
        //this.speeds = [0.09, 0.2, 0.3, 0.4];
        this.modifiers = [0.2, 0.4, 1, 1.5];
        this.layers = [];

        for (let index = 0; index < 3; index++)
        {
            this.layers.push(new Layer(this.game, this.width, this.height, this.modifiers[index], `img/layer${index}.png`));
        }

        this.prop = new Layer(this.game, this.width, this.height, this.modifiers[3], `img/layer3.png`);
        //console.log(this.layers);
        //this.sound.play();
        //this.sound.loop = true;
    }

    update(delta_time)
    {
        this.layers.forEach((layer) =>
        {
            layer.update(delta_time);
        });
    }

    draw(context)
    {
        this.layers.forEach((layer) =>
        {
            layer.draw(context);
        });
    }
}

class Layer
{
    constructor(game, width, height, speed_modifier, path)
    {
        this.image = new Image();
        this.image.src = path;

        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.speed_modifier = speed_modifier;
    }

    update(delta_time)
    {
        if (this.x < -this.width)
        {
            this.x = 0;
        }
        else
        {
            this.x -= this.game.speed * this.speed_modifier;
        }
    }

    draw(context)
    {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}