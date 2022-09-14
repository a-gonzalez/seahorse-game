import Projectile from "./projectile.js";

export default class Player
{
    constructor(game)
    {
        this.image = new Image();
        this.image.src = "img/player.png";

        this.game = game;
        this.scale = 1;
        this.width = 120;
        this.height = 190;
        this.x = 10; //this.game.width * 0.5 - this.width * 0.5 * this.scale;
        this.y = this.game.height * 0.5 - this.height * 0.5 * this.scale;
        this.frame_max = 38;
        this.frame_x = 0;
        this.frame_y = 0;
        this.frame_timer = 0;
        this.frame_interval = 1000 / this.game.frames_per_second;
        this.speed_y = 0;
        this.speed_x = 0;
        this.speed_max = 3;
        this.power_up = false; //(this.game.debug) ? true: false;
        this.power_up_timer = 0;
        this.power_up_time_limit = 10000;

        this.projectiles = [];
    }

    update(delta_time)
    {   // animation
        /*if (this.frame_timer > this.frame_interval)
        {
            this.frame_x = this.frame_x < this.frame_max ? ++this.frame_x : 0;
        }
        else
        {
            this.frame_timer += delta_time;
        }*/
        if (this.frame_x < this.frame_max)
        {
            ++this.frame_x;
        }
        else
        {
            this.frame_x = 0;
        }

        if (this.power_up)
        {
            if (this.power_up_timer > this.power_up_time_limit)
            {
                this.power_up_timer = 0;
                this.power_up = false;
                this.frame_y = 0;
            }
            else
            {
                this.power_up_timer += delta_time;
                this.frame_y = 1;
                this.game.ammo += 0.1;
            }
        }

        //vertical movement
        if (this.game.claves.includes("ArrowUp")/* && this.y >= 0*/)
        {
            this.speed_y = -this.speed_max;
        }
        else if (this.game.claves.includes("ArrowDown") /*&& this.y + this.height < this.game.height*/)
        {
            this.speed_y = this.speed_max;
        }
        else
        {
            this.speed_y = 0;
        }
        this.y += this.speed_y;
        
        // vertical boundaries
        if (this.y > this.game.height - this.height * 0.5)
        {
            this.y = this.game.height - this.height * 0.5;
        }
        else if (this.y < -this.height * 0.5)
        {
            this.y = -this.height * 0.5;
        }

        // horizontal
        if (this.game.claves.includes("ArrowLeft") && this.x > 0)
        {
            this.speed_x = -this.speed_max;
        }
        else if (this.game.claves.includes("ArrowRight") && this.x + this.width < this.game.width)
        {
            this.speed_x = this.speed_max;
        }
        else
        {
            this.speed_x = 0;
        }
        this.x += this.speed_x;

        this.projectiles.forEach((projectile) =>
        {
            projectile.update(delta_time);
        });

        this.projectiles = this.projectiles.filter((projectile) =>
        {
            return !projectile.remove;
        });
    }

    draw(context)
    {
        if (this.game.debug)
        {
            context.strokeStyle = "#00ff00"; //"#b87333"; //this.game.color;
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frame_x * this.width, this.frame_y * this.height, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);

        this.projectiles.forEach((projectile) =>
        {
            projectile.draw(context);
        });
    }

    powerUp()
    {
        this.power_up = true;
        this.power_up_timer = 0;

        if (this.game.ammo < this.game.ammo_max)
        {
            this.game.ammo = this.game.ammo_max;
        }
    }

    primary()
    {
        if (this.game.ammo > 0)
        {
            this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));

            if (this.power_up)
            {
                this.secondary();
            }
            --this.game.ammo;
        }
    }

    secondary()
    {
        this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 177));
    }
}