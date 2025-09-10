import {Application, Assets, Text} from "pixi.js";
import {Level} from "./level.ts";

(async () => {
    const app = await appInit();
    await loadAssets();


    const level1: Level = new Level("test_level_1");
    level1.centerToParent(app.screen);

    app.stage.addChild(level1.view);

    const text1 = new Text({text: `Rosanka's Adventure`, style: {fontFamily: "Ithaca", fontSize: 50}});
    if (level1.view) {
        text1.y = level1.view.y - text1.height;
        text1.x = level1.view.x + level1.view.width / 2 - text1.width / 2;
    }
    app.stage.addChild(text1);
})();

async function appInit(): Promise<Application> {
    const app = new Application();
    await app.init({background: "#2b3928", resizeTo: window});
    document.getElementById("pixi-container")!.appendChild(app.canvas);

    await Assets.load({alias: "Ithaca", src: "assets/fonts/Ithaca.ttf"});
    return app;
}

async function loadAssets(): Promise<void> {
    await Assets.load([
        {alias: "Ithaca", src: "assets/fonts/Ithaca.ttf"},
        {alias: "test_level_1", src: "assets/levels/test_level_1.png"},
        {alias: "rosana", src: "assets/sprites/rosana/main.png"},
    ]);
}
