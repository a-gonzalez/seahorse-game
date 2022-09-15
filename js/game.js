import Player from "./player.js";
import { Unus, Duo, Bonus, Drone, Balaena } from "./enemy.js";
import Particle from "./particle.js";
import { Fumus, Ignis } from "./explosion.js";
import Controls from "./controls.js";
import Background from "./background.js";
import UI from "./ui.js";

export default class Game
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.color = "#70b596"; //"#ee6f07"; //"#dadd08";
        this.speed = 1;
        this.speed_max = 3;
        this.ammo_max = 30;
        this.ammo = this.ammo_max;
        this.ammo_interval = 500;
        this.ammo_timer = 0;
        this.hostis_timer = 0;
        this.hostis_interval = 2000;
        this.game_over = false;
        //this.lives = 5;
        this.score = 0;
        this.score_winning = 100;
        this.debug = false;
        this.sound = false;
        this.game_time = 0;
        this.game_time_limit = 40000;

        this.inimicus = [];
        this.claves = [];
        this.particles = [];
        this.explosions = [];

        this.player = new Player(this);
        this.background = new Background(this);
        this.controls = new Controls(this);
        this.ui = new UI(this);
    }

    update(delta_time)
    {
        /*if (!this.game_over)
        {
            this.game_time += delta_time;
        }

        if (this.game_time > this.game_time_limit)
        {
            this.game_over = true;
        }*/

        this.background.update(delta_time);
        this.player.update(delta_time);

        if (this.ammo_timer > this.ammo_interval)
        {
            if (this.ammo < this.ammo_max && this.ammo <= 100)
            {
                ++this.ammo;
            }
            this.ammo_timer = 0;
        }
        else
        {
            this.ammo_timer += delta_time;
        }

        if (this.hostis_timer > this.hostis_interval && !this.game_over)
        {
            this.addEnemy();

            this.hostis_timer = 0;
        }
        else
        {
            this.hostis_timer += delta_time;
        }

        this.particles.forEach((particle) =>
        {
            particle.update();
        });

        this.particles = this.particles.filter((particle) =>
        {
            return !particle.remove;
        });

        this.explosions.forEach((explosion) =>
        {
            explosion.update(delta_time);
        });

        this.explosions = this.explosions.filter((explosion) =>
        {
            return !explosion.remove;
        });
        
        this.inimicus.forEach((hostis) =>
        {
            hostis.update(delta_time);

            if (this.collision(this.player, hostis))
            {
                hostis.remove = true;

                this.addExplosion(hostis);

                for (let index = 0; index < hostis.gears; index++)
                {
                    this.particles.push(new Particle(this, hostis.x + hostis.width * 0.5, hostis.y + hostis.height * 0.5));
                }

                if (hostis.bonus)
                {
                    this.player.powerUp();
                }
                else if (!this.game_over)
                {
                    if (this.score > 0)
                    {
                        --this.score;
                    }
                }
            }

            this.player.projectiles.forEach((projectile) =>
            {
                if (this.collision(projectile, hostis))
                {
                    --hostis.hit_points;

                    this.particles.push(new Particle(this, hostis.x + hostis.width * 0.5, hostis.y + hostis.height * 0.5));

                    if (hostis.hit_points <= 0)
                    {
                        hostis.remove = true;

                        this.addExplosion(hostis);

                        if (hostis.whale)
                        {
                            for (let index = 0; index < 3; index++)
                            {
                                this.inimicus.push(new Drone(this, hostis.x + Math.random() * hostis.width, hostis.y + Math.random() * hostis.height * 0.5));
                            }
                        }

                        for (let index = 0; index < hostis.gears; index++)
                        {
                            this.particles.push(new Particle(this, hostis.x + hostis.width * 0.5, hostis.y + hostis.height * 0.5));
                        }

                        this.score += hostis.value;

                        if (this.score > this.score_winning)
                        {
                            this.game_over = true;
                        }
                    }
                    projectile.remove = true;
                }
            });
        });

        this.inimicus = this.inimicus.filter((hostis) =>
        {
            return !hostis.remove;
        });

        this.background.prop.update(delta_time);
    }

    draw(context)
    {
        this.background.draw(context);

        this.player.draw(context);
        this.background.prop.draw(context);

        this.inimicus.forEach((hostis) =>
        {
            hostis.draw(context);
        });

        this.particles.forEach((particle) =>
        {
            particle.draw(context);
        });

        this.explosions.forEach((explosion) =>
        {
            explosion.draw(context);
        });

        this.ui.draw(context);
    }

    addEnemy()
    {
        //this.inimicus.push(((Math.random() < 0.5) ? new Unus(this) : new Bonus(this)));
        let randomize = Math.random();
        let enemy;

        if (randomize < 0.3)
        {
            enemy = new Unus(this);
        }
        else if (randomize < 0.6)
        {
            enemy = new Duo(this);
        }
        else if (randomize < 0.7)
        {
            enemy = new Balaena(this);
        }
        else
        {
            enemy = new Bonus(this);
        }
        this.inimicus.push(enemy);
    }

    addExplosion(hostis)
    {
        const randomize = Math.random();

        if (randomize < 0.5)
        {
            this.explosions.push(new Fumus(this, hostis.x + hostis.width * 0.5, hostis.y + hostis.height * 0.5));
        }
        else
        {
            this.explosions.push(new Ignis(this, hostis.x + hostis.width * 0.5, hostis.y + hostis.height * 0.5));
        }
    }

    collision(bonum, malus) // crash
    {
        return (
            bonum.x < malus.x + malus.width
                && bonum.x + bonum.width > malus.x
                && bonum.y < malus.y + malus.height
                && bonum.height + bonum.y > malus.y
        );
    }
}