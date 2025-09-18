import {Button} from "@pixi/ui";
import {Container, FillInput, Graphics, Point, Sprite, Text} from "pixi.js";

export interface Asset {
    alias: string;
    src: string;
}

export interface LevelAsset {
    background: Asset;
    data: Asset;
}

export function getLevelAsset(levelNumber: number): LevelAsset {
    return {
        background: {alias: `LEVEL_${levelNumber}_BG`, src: `assets/levels/${levelNumber}/bg.png`},
        data: {alias: `LEVEL_${levelNumber}_DATA`, src: `assets/levels/${levelNumber}/data.json`}
    }
}

export function buildButton(text: string, fontSize: number, backgroundFill: FillInput, textFill: FillInput, strokeFill: FillInput): Button {
    const buttonView: Container = new Container();
    const buttonBg: Graphics = new Graphics();
    const buttonText: Text = new Text({text: text, style: {fontFamily: "Ithaca", fontSize: fontSize, fill: textFill}});
    buttonBg.clear()
        .roundRect(0, 0, buttonText.width + 20, buttonText.height + 10, 5)
        .fill(backgroundFill)
        .stroke(strokeFill);
    buttonText.anchor.set(0.5);
    buttonText.x = buttonBg.width / 2;
    buttonText.y = buttonBg.height / 2;
    buttonView.addChild(buttonBg, buttonText);

    return new Button(buttonView);
}


export interface LevelData {
    spawn: Point;
    terrainData: TerrainEntityData[];
}

export type Direction = "up" | "down" | "left" | "right";
export type FacingDirection = "left" | "right";

export const WINDOW_WIDTH = 1400;
export const WINDOW_HEIGHT = 1000;


export interface TerrainEntityData {
    sprite: string;
    position: Point;
    interactText: string;
}

export interface TerrainEntity {
    sprite: Sprite;
    position: Point;
    interactText: string;
}

export function buildTerrainData(data: LevelData): TerrainEntity[] {
    return data.terrainData.map((entityData) => {
        const sprite = Sprite.from(entityData.sprite);
        sprite.x = entityData.position.x * 32;
        sprite.y = entityData.position.y * 32;
        return {
            sprite: sprite,
            position: entityData.position,
            interactText: entityData.interactText
        }
    })
}
