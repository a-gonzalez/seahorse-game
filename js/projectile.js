export default class Projectile
{
    constructor(game, x, y)
    {
        this.image = new Image();
        this.image.src = "img/projectile.png";

        /*this.primary_sound = new Audio();
        this.primary_sound.src = "aud/primary.wav";*/

        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 5;
        this.speed = 3;
        this.angle = 0;
        this.alignment = Math.random() * 0.2 - 0.1;
        this.remove = false;

        //this.primary_sound.play();
    }

    update(delta_time)
    {
        this.x += this.speed;

        if (this.x > this.game.width * 0.97)
        {
            this.remove = true;
        }
        //this.angle += this.alignment;
        //this.x += Math.sin(this.angle * 5);
    }

    draw(context)
    {
        //context.save();
        //context.strokeStyle = "#36d460"; //"#ff0000";
        //context.lineWidth = 0.5;
        //context.strokeRect(this.x, this.y, this.width, this.height);
        //context.translate(this.x, this.y);
        //context.rotate(this.angle);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        //context.restore();
    }
}