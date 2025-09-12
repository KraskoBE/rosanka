import {Application, Assets, Container} from "pixi.js";
import {Level} from "./level.ts";
import {buildButton, getLevelAsset, WINDOW_HEIGHT, WINDOW_WIDTH} from "./utils.ts";

(async () => {
    const app = await appInit();
    await loadAssets();

    const mainContainer: Container = new Container();
    mainContainer.width = WINDOW_WIDTH;
    mainContainer.height = WINDOW_HEIGHT;

    if (window.innerWidth < WINDOW_WIDTH) {
        mainContainer.scale.set(window.innerWidth / WINDOW_WIDTH);
    }

    const level1: Level = new Level(1);
    level1.view.x = 50;
    level1.view.y = 50;
    const button = buildButton("Click me!", 30, 'white', "red", 'orange');

    mainContainer.addChild(level1.view, button.view);
    app.stage.addChild(mainContainer);
})();

async function appInit(): Promise<Application> {
    const app = new Application();
    await app.init({background: "#2b3928", resizeTo: window});
    document.getElementById("pixi-container")!.appendChild(app.canvas);
    return app;
}

async function loadAssets(): Promise<void> {
    await Assets.load([
        {alias: "Ithaca", src: "assets/fonts/Ithaca.ttf"},
        getLevelAsset(1).background,
        getLevelAsset(1).data,
        {alias: "rosana", src: "assets/sprites/rosana/main.png"},
    ]);
}
