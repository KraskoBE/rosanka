import {Button} from "@pixi/ui";
import {Color, Container, FillInput, Graphics, Point, Size, Sprite, Text} from "pixi.js";

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
    interactTextTitle: string;
    interactTextContent: string;
    interactTextThumbnail?: string;
}

export interface TerrainEntity {
    sprite: Sprite;
    position: Point;
    interactTextTitle: string;
    interactTextContent: string;
    interactTextThumbnail?: string;
}

export function buildTerrainData(data: LevelData): TerrainEntity[] {
    return data.terrainData.map((entityData) => {
        const sprite = Sprite.from(entityData.sprite);
        sprite.x = entityData.position.x * 32;
        sprite.y = entityData.position.y * 32;
        return {
            sprite: sprite,
            position: entityData.position,
            interactTextTitle: entityData.interactTextTitle ?? getDefaultTextTitle(entityData.sprite),
            interactTextContent: entityData.interactTextContent,
            interactTextThumbnail: entityData.interactTextThumbnail ?? getDefaultTextThumbnail(entityData.sprite)
        }
    })
}

function getDefaultTextTitle(sprite: string): string {
    switch (sprite) {
        case "copper_node":
            return "Copper Ore";
        case "gold_node":
            return "Gold Ore";
        case "silver_node":
            return "Silver Ore";
        case "nitrile_node":
            return "Nitrile Ore";
    }
}

function getDefaultTextThumbnail(sprite: string) {

    switch (sprite) {
        case "copper_node":
            return "copper_ore"
        case "gold_node":
            return "gold_ore"
        case "silver_node":
            return "silver_ore"
        case "nitrile_node":
            return "nitrile_ore"
    }
}

export function buildDialog(size: Size, title: string, content: string, thumbnail?: string): Container {
    const dialogView: Container = new Container();
    const dialogBg: Graphics = new Graphics();

    dialogBg.clear()
        .roundRect(20, 20, size.width - 40, size.height - 40, 10)
        .fill(new Color("0xffffffb4"))

    const titleText: Text = new Text({
        x: 70,
        y: 70,
        text: title,
        style: {
            fontFamily: "Ithaca",
            fontSize: 120,
            fill: 'black'
        }
    });

    const contentText: Text = new Text({
        x: 70,
        y: titleText.y + titleText.height + 40,
        text: content,
        style: {
            fontFamily: "Ithaca",
            fontSize: 45,
            fill: 'black',
            wordWrap: true,
            wordWrapWidth: size.width - 140
        }
    });

    dialogView.addChild(dialogBg, titleText, contentText);


    if (thumbnail) {
        const thumbnailSprite = Sprite.from(thumbnail);
        thumbnailSprite.x = size.width - 200;
        thumbnailSprite.y = 30;
        dialogView.addChild(thumbnailSprite);
    }
    return dialogView;
}
