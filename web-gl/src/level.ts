import {Assets, Container, Point, Sprite, Ticker} from "pixi.js";
import {Rosana} from "./rosana.ts";
import {Controller} from "./controller.ts";
import {buildTerrainData, Direction, getLevelAsset, LevelData, TerrainEntity} from "./utils.ts";

export class Level {

    public readonly view: Container;
    private readonly gridWidth: number;
    private readonly gridHeight: number;
    private readonly gridSize: number;
    private readonly data: LevelData;
    private readonly terrainData: TerrainEntity[] = [];
    private readonly rosana: Rosana;

    constructor(levelNumber: number, gridWidth: number = 40, gridHeight: number = 18, gridSize: number = 32) {
        this.view = new Container();
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.gridSize = gridSize;
        this.data = Assets.get(getLevelAsset(levelNumber).data.alias);
        this.terrainData = buildTerrainData(this.data);

        this.renderBackgroundAndTerrain(levelNumber);
        this.rosana = this.spawn();
    }

    public spawn(): Rosana {
        const rosana = new Rosana();
        this.view.addChild(rosana.view);
        rosana.view.x += rosana.view.width / 2 - 2;

        rosana.setPosition(this.data.spawn.x, this.data.spawn.y);

        const controller = new Controller();
        const ticker = new Ticker();
        ticker.maxFPS = 30;
        ticker.add(() => {
            if (controller.keys.down.pressed) {
                if (this.checkCollision("down")) {
                    return;
                }
                rosana.move("down");
            }
            if (controller.keys.right.pressed) {
                if (this.checkCollision("right")) {
                    return;
                }
                rosana.move("right");
            }
            if (controller.keys.up.pressed) {
                if (this.checkCollision("up")) {
                    return;
                }
                rosana.move("up");
            }
            if (controller.keys.left.pressed) {
                if (this.checkCollision("left")) {
                    return;
                }
                rosana.move("left");
            }
            if (controller.keys.space.pressed) {
                let facingEntity = this.getFacingEntity(rosana.getPosition(), rosana.getFacingDirection());
                if(facingEntity){
                    this.view.removeChild(facingEntity.sprite);
                    this.terrainData.splice(this.terrainData.indexOf(facingEntity),1);
                }
            }

        });
        ticker.start();

        return rosana;
    }

    public checkCollision(direction: Direction): boolean {
        this.rosana.switchFacingDirection(direction);

        let targetLocation: Point = this.rosana.getPosition();
        switch (direction) {
            case "up":
                targetLocation.y--;
                break;
            case "down":
                targetLocation.y++;
                break
            case "left":
                targetLocation.x--;
                break;
            case "right":
                targetLocation.x++;
                break;
        }

        if (this.isWall(targetLocation)) {
            return true;
        }

        return this.terrainData.some(entity => entity.position.x === targetLocation.x && entity.position.y === targetLocation.y);
    }

    private isWall(targetLocation: Point) {
        return (targetLocation.x == 0 || targetLocation.y == 0 || targetLocation.x == this.gridWidth - 1 || targetLocation.y == this.gridHeight - 1);
    }

    private renderBackgroundAndTerrain(levelNumber: number) {
        this.view.addChild(Sprite.from(getLevelAsset(levelNumber).background.alias));

        for (const entity of this.terrainData) {
            this.view.addChild(entity.sprite);
        }
    }

    private getFacingEntity(position: Point, facingDirection: Direction): TerrainEntity | undefined {
        if (facingDirection === "up" || facingDirection === "down") {
            return undefined;
        }

        let facingPosition: Point = position;

        if (facingDirection === "left") {
            facingPosition.x--;
        }
        if (facingDirection === "right") {
            facingPosition.x++;
        }
        return this.terrainData.find(entity => entity.position.x === facingPosition.x && entity.position.y === facingPosition.y);
    }
}
