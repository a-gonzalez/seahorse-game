import Game from "./game.js";

window.addEventListener("load", () =>
{
    const screen = document.getElementById("screen");
    screen.width = 1000;
    screen.height = 500;

    const context = screen.getContext("2d");
    const game = new Game(screen.width, screen.height);

    let previous_time = 0;

    let animate = (time_stamp) =>
    {
        let delta_time = time_stamp - previous_time;
        previous_time = time_stamp;

        context.clearRect(0, 0, screen.width, screen.height);

        game.update(delta_time);
        game.draw(context);

        if (!game.game_over)
        {
            requestAnimationFrame(animate);
        }
    };

    animate(0);
});