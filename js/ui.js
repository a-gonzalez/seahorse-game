export default class UI
{
    constructor(game)
    {
        this.game = game;
        this.font_size = 25;
        this.font_family = "Comic Sans MS"; //"Bangers";
        this.color = "#70b596"; //"#ee6f07";
        this.shadow = "#b87333";
    }

    update(delta_time)
    {

    }

    draw(context)
    {
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = this.shadow; //"#70b596"; //"#36d460";
        context.shadowBlur = 0;
        context.font = `bold ${this.font_size * 0.8}px ${this.font_family}`;
        context.fillText(`Score: ${this.game.score}`, 10, 25);
        context.fillText(`Timer: ${(this.game.game_time * 0.001).toFixed(1)}`, 10, 55);
        context.font = `bold ${this.font_size * 0.6}px ${this.font_family}`;
        context.fillText(`Ammo: ${this.game.ammo.toFixed(0)}`, 5, this.game.height - 40);

        if (this.game.game_over)
        {
            context.textAlign = "center";
            let message;
            let submessage;

            if (this.game.score > this.game.score_winning)
            {
                message = "Vincis!";
                submessage = "Bellator Hippocampus"; // Magna = Great
            }
            else
            {
                message = "Factum Est!";
                submessage = "Clamor Hippocampus";
            }
            context.font = `${this.font_size * 4}px Bangers`;
            context.fillText(message, this.game.width * 0.5, this.game.height * 0.5);

            context.font = `${this.font_size * 2}px Bangers`;
            context.fillText(submessage, this.game.width * 0.5, this.game.height * 0.5 + 50);
        }
        if (this.game.player.power_up)
        {
            context.fillStyle = "#33b873"; //"#ffffbd";
        }
        for (let index = 0; index < this.game.ammo; index++)
        {
            context.fillRect(5 + 5 * index, this.game.height - 30, 3, 20);
        }

        context.restore();
    }
}