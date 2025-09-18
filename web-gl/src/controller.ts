import {Rectangle} from "pixi.js";

const keyMap = {
    Space: 'space',
    KeyW: 'up',
    ArrowUp: 'up',
    KeyA: 'left',
    ArrowLeft: 'left',
    KeyS: 'down',
    ArrowDown: 'down',
    KeyD: 'right',
    ArrowRight: 'right',
};

// Class for handling keyboard inputs.
export class Controller {
    public keys = {
        up: {pressed: false},
        left: {pressed: false},
        down: {pressed: false},
        right: {pressed: false},
        space: {pressed: false},
    };

    private topRect: Rectangle;
    private bottomRect: Rectangle;
    private leftRect: Rectangle;
    private rightRect: Rectangle;
    private centerRect: Rectangle;


    constructor() {
        window.addEventListener('keydown', (event) => this.keydownHandler(event));
        window.addEventListener('keyup', (event) => this.keyupHandler(event));
        window.addEventListener('touchstart', (event) => this.touchstartHandler(event))
        window.addEventListener('touchend', () => this.touchendHandler())

        const rectangles: Rectangle[] = this.splitRectangleIntoNine(window);
        this.topRect = rectangles[1];
        this.bottomRect = rectangles[7];
        this.leftRect = rectangles[3];
        this.rightRect = rectangles[5];
        this.centerRect = rectangles[4];
    }

    keydownHandler(event: KeyboardEvent) {
        const key = keyMap[event.code];
        if (!key) return;

        this.keys[key].pressed = true;
    }

    keyupHandler(event: KeyboardEvent) {
        const key = keyMap[event.code];
        if (!key) return;

        this.keys[key].pressed = false;
    }

    private touchstartHandler(event: TouchEvent) {
        if (event.touches.length != 1) return;

        const touch: Touch = event.touches[0];

        if (this.topRect.contains(touch.clientX, touch.clientY)) {
            this.keys['up'].pressed = true;
            return;
        }
        if (this.bottomRect.contains(touch.clientX, touch.clientY)) {
            this.keys['down'].pressed = true;
            return;
        }
        if (this.leftRect.contains(touch.clientX, touch.clientY)) {
            this.keys['left'].pressed = true;
            return;
        }
        if (this.rightRect.contains(touch.clientX, touch.clientY)) {
            this.keys['right'].pressed = true;
            return;
        }
        if (this.centerRect.contains(touch.clientX, touch.clientY)) {
            this.keys['space'].pressed = true;
            return;
        }

    }


    private touchendHandler() {
        for (const key in this.keys) {
            this.keys[key].pressed = false;
        }
    }

    splitRectangleIntoNine(originalRect: Window): Rectangle[] {
        const x = 0;
        const y = 0;
        const width = originalRect.innerWidth;
        const height = originalRect.innerHeight;

        // Calculate the width and height of each smaller rectangle
        const smallWidth = width / 3;
        const smallHeight = height / 3;

        const newRectangles: Rectangle[] = [];

        // Iterate through rows and columns to create the 9 rectangles
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const newX = x + col * smallWidth;
                const newY = y + row * smallHeight;

                newRectangles.push(new Rectangle(newX, newY, smallWidth, smallHeight));
            }
        }

        return newRectangles;
    }

}
