class Hostis
{
    constructor(game)
    {
        this.game = game;
        this.x = this.game.width;
        this.y = 0;
        this.hit_points = Math.floor(Math.random() * 5 + 1);
        this.gears = 7;
        this.width = 100;
        this.height = 100;
        this.speed_x = Math.random() * -1.5 - 0.5;
        this.frame_x = 0;
        this.frame_y = 0;
        this.frame_max = 38;
        //this.frame_timer = 0;
        //this.frame_interval = 1000 / this.game.frames_per_second;
        this.speed_x = Math.random() * -1.5 - 0.5;
        this.remove = false;
        this.value = this.hit_points;
    }

    update(delta_time)
    {
        this.x += this.speed_x - this.game.speed;

        if (this.x + this.width < 0)
        {
            this.remove = true;
        }

        if (this.frame_x < this.frame_max)
        {
            ++this.frame_x;
        }
        else
        {
            this.frame_x = 0;
        }
    }

    draw(context)
    {
        context.drawImage(this.image, this.frame_x * this.width, this.frame_y * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

        if (this.game.debug)
        {
            context.strokeStyle = "#00ff00";
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.font = "15px Arial";
            context.fillStyle = "#00ff00";
            context.fillText(`Class: ${this.frame_y} Value: ${this.value} Speed: ${this.speed_x.toFixed(2)}`, this.x + 5, this.y + 20);
        }
    }
}

export class Unus extends Hostis
{
    constructor(game)
    {
        super(game);

        this.image = new Image();
        this.image.src = "img/unus.png";

        this.width = 228; // * 0.2;
        this.height = 169; // * 0.2;
        this.y = Math.random() * (this.game.height * 0.8 - this.height);
        this.hit_points = 3;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 3);
        this.value = this.hit_points;
    }
}

export class Duo extends Hostis
{
    constructor(game)
    {
        super(game);

        this.image = new Image();
        this.image.src = "img/duo.png";

        this.width = 213; // * 0.2;
        this.height = 165; // * 0.2;
        this.y = Math.random() * (this.game.height * 0.85 - this.height);
        this.hit_points = 4;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 2);
        this.value = this.hit_points;
    }
}

export class Bonus extends Hostis
{
    constructor(game)
    {
        super(game);

        this.image = new Image();
        this.image.src = "img/bonus.png";

        this.width = 99;
        this.height = 95;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.hit_points = 4;
        this.gears = 5;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 2);
        this.value = 8;
        this.bonus = true;
    }
}

export class Balaena extends Hostis
{
    constructor(game)
    {
        super(game);

        this.image = new Image();
        this.image.src = "img/whale.png";

        this.width = 400;
        this.height = 227;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.hit_points = 10;
        this.gears = 15;
        this.frame_x = 0;
        this.frame_y = 0;
        this.value = this.hit_points;
        this.whale = true;
        this.speed_x = Math.random() * -1.2 - 0.2;
    }
}

export class Drone extends Hostis
{
    constructor(game, x, y)
    {
        super(game);

        this.image = new Image();
        this.image.src = "img/drone.png";

        this.width = 115;
        this.height = 95;
        this.x = x;
        this.y = y;
        this.hit_points = 2;
        this.gears = 3;
        this.frame_x = 0;
        this.frame_y = Math.floor(Math.random() * 2);
        this.value = this.hit_points;
        this.drone = true;
        this.speed_x = Math.random() * -4.2 - 0.5;
    }
}