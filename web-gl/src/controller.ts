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
    keys = {
        up: { pressed: false },
        left: { pressed: false },
        down: { pressed: false },
        right: { pressed: false },
        space: { pressed: false },
    };

    constructor() {
        window.addEventListener('keydown', (event) => this.keydownHandler(event));
        window.addEventListener('keyup', (event) => this.keyupHandler(event));
    }

    keydownHandler(event) {
        const key = keyMap[event.code];
        if (!key) return;

        this.keys[key].pressed = true;
    }

    keyupHandler(event) {
        const key = keyMap[event.code];
        if (!key) return;

        this.keys[key].pressed = false;
    }
}