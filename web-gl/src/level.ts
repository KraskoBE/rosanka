import {Container, Rectangle, Sprite, Ticker} from "pixi.js";
import {Rosana} from "./rosana.ts";
import {Controller} from "./controller.ts";

export class Level {

    public readonly view: Container;
    private readonly gridWidth: number;
    private readonly gridHeight: number;
    private readonly gridSize: number;

    constructor(levelAsset: string, gridWidth: number = 40, gridHeight: number = 18, gridSize: number = 32) {
        this.view = new Container();
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.gridSize = gridSize;
        this.view.addChild(Sprite.from(levelAsset));
        this.spawn();
    }

    public centerToParent(parent: Rectangle): void {
        this.view.x = parent.width / 2 - this.view.width / 2;
        this.view.y = parent.height / 2 - this.view.height / 2;
    }

    public spawn(): Rosana {
        const rosana = new Rosana();
        this.view.addChild(rosana.view);
        rosana.view.x += rosana.view.width / 2 -2;

        const controller = new Controller();
        const ticker = new Ticker();
        ticker.maxFPS = 30;
        ticker.add(() => {
            if (controller.keys.down.pressed) {
                rosana.move("down");
            }
            if (controller.keys.right.pressed) {
                rosana.move("right");
            }
            if (controller.keys.up.pressed) {
                rosana.move("up");
            }
            if (controller.keys.left.pressed) {
                rosana.move("left");
            }
        });
        ticker.start();

        return rosana;
    }
}