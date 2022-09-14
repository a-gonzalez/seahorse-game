class Crepitus
{
    constructor(game, x, y)
    {
        this.game = game;
        this.frame_max = 8;
        this.frame_x = 0;
        this.sprite_width = 200;
        this.sprite_height = 200;
        this.width = this.sprite_width;
        this.height = this.sprite_height;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frames_per_second = 30; //15;
        this.timer = 0;
        this.interval = 1000 / this.frames_per_second;
        this.remove = false;
    }

    update(delta_time)
    {
        this.x -= this.game.speed;

        if (this.timer > this.interval)
        {
            ++this.frame_x;

            this.timer = 0;
        }
        else
        {
            this.timer += delta_time;
        }

        if (this.frame_x > this.frame_max)
        {
            this.remove = true;
        }
    }

    draw(context)
    {
        context.drawImage(this.image, this.frame_x * this.sprite_width, 0, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);
    }
}

export class Ignis extends Crepitus
{
    constructor(game, x, y)
    {
        super(game, x, y);

        this.image = new Image();
        this.image.src = "img/fire.png";
    }
}

export class Fumus extends Crepitus
{
    constructor(game, x, y)
    {
        super(game, x, y);

        this.image = new Image();
        this.image.src = "img/smoke.png";
    }
}