export default class Particle
{
    constructor(game, x, y)
    {
        this.image = new Image();
        this.image.src = "img/gears.png";

        this.game = game;
        this.x = x;
        this.y = y;
        this.frame_x = Math.floor(Math.random() * 3);
        this.frame_y = Math.floor(Math.random() * 3);
        this.sprite_size = 50;
        this.size_modifier = (Math.random() * 0.5 + 0.5).toFixed(1);
        this.size = this.sprite_size * this.size_modifier;
        this.speed_x = Math.random() * 6 - 3;
        this.speed_y = Math.random() * -15;
        this.gravity = 0.5;
        this.remove = false;
        this.angle = 0;
        this.alignment = Math.random() * 0.2 - 0.1;
        //this.bounced = false;
        this.bounced = 0;
        this.bottom_bounce_boundary = Math.random() * 80 + 60; // 100;
    }

    update()
    {
        this.angle += this.alignment;
        this.speed_y += this.gravity;
        this.x -= this.speed_x + this.game.speed;
        this.y += this.speed_y;

        if (this.y > this.game.height + this.size || this.x < 0 - this.size_modifier)
        {
            this.remove = true;
        }
        
        //if (this.y > this.game.height - this.bottom_bounce_boundary && !this.bounced)
        if (this.y > this.game.height - this.bottom_bounce_boundary && this.bounced < 2)
        {
            //this.bounced = true;
            ++this.bounced;
            this.speed_y *= -0.5; // -0.7; // -0.9;
        }
    }

    draw(context)
    {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        //context.drawImage(this.image, this.frame_x * this.sprite_size, this.frame_y * this.sprite_size, this.sprite_size, this.sprite_size, this.x, this.y, this.size, this.size);
        context.drawImage(this.image, this.frame_x * this.sprite_size, this.frame_y * this.sprite_size, this.sprite_size, this.sprite_size, 0, 0, this.size * -0.7, this.size * -0.7);
        context.restore();
    }
}