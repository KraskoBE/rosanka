import {Container, Point, Sprite} from "pixi.js";
import {Direction, FacingDirection} from "./utils.ts";

export class Rosana {

    public view: Container;
    private position: Point = new Point(0, 0);
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
        this.lastMovedTime = Date.now();
    }

    public move(direction: Direction) {
        if (Date.now() - this.lastMovedTime < 200) {
            return;
        }
        switch (direction) {
            case "up":
                this.sprite.y -= 32;
                this.position.y--;
                break;
            case "down":
                this.sprite.y += 32;
                this.position.y++;
                break;
            case "left":
                this.sprite.x -= 32;
                this.position.x--;
                if (this.facingDirection === "right") {
                    this.facingDirection = "left";
                    this.sprite.scale.x *= -1;
                }
                break;
            case "right":
                this.sprite.x += 32;
                this.position.x++;
                if (this.facingDirection === "left") {
                    this.facingDirection = "right";
                    this.sprite.scale.x *= -1;
                }
                break;
        }
        this.lastMovedTime = Date.now();
    }

    public getPosition(): Point {
        return new Point(this.position.x, this.position.y);
    }

    public setPosition(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
        this.sprite.x = x * 32;
        this.sprite.y = y * 32;
    }
}
