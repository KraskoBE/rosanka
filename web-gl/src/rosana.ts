import {Container, Sprite} from "pixi.js";

type Direction = "up" | "down" | "left" | "right";
type FacingDirection = "left" | "right";

export class Rosana {

    public view: Container;
    private posX: number = 0;
    private posY: number = 0;
    private readonly sprite: Sprite;
    private lastMovedTime: number;
    private facingDirection: FacingDirection = "right";

    constructor() {
        this.sprite = Sprite.from("rosana");
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(2);

        this.view = new Container();
        this.view.eventMode = "static";
        this.view.addChild(this.sprite);
        this.view.on("click", () => {
            this.move("down");
            console.log(this.posX, this.posY);
        })
        this.view.on("rightclick", () => {
            this.move("right");
            console.log(this.posX, this.posY);
        })
        this.lastMovedTime = Date.now();
    }

    public move(direction: Direction) {
        if (Date.now() - this.lastMovedTime < 200) {
            return;
        }
        switch (direction) {
            case "up":
                this.sprite.y -= 32;
                this.posY--;
                break;
            case "down":
                this.sprite.y += 32;
                this.posY++;
                break;
            case "left":
                this.sprite.x -= 32;
                this.posX--;
                if (this.facingDirection === "right") {
                    this.facingDirection = "left";
                    this.sprite.scale.x *= -1;
                }
                break;
            case "right":
                this.sprite.x += 32;
                this.posX++;
                if (this.facingDirection === "left") {
                    this.facingDirection = "right";
                    this.sprite.scale.x *= -1;
                }
                break;
        }
        this.lastMovedTime = Date.now();
    }
}