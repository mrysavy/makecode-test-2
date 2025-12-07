let s: PlanetX_Display.Strip = null
let status_red: boolean = false
let status_yellow: boolean = false
let status_green: boolean = false

enum Color {
    Red,
    Yellow,
    Green
}
enum State {
    On,
    Off
}
enum Dir {
    Up = 0,
    Down = 4,
    Left = 2,
    Right = 6
}

//% color="#AA278D" weight=100
namespace Semaphore {
    //% block
    export function set(pin: PlanetX_Display.DigitalRJPin, direction: Dir, color: Color, state: State) {
        switch (color) {
            case Color.Red:
                status_red = (state == State.On)
                break;
            case Color.Yellow:
                status_yellow = (state == State.On)
                break;
            case Color.Green:
                status_green = (state == State.On)
                break;
        }
        redraw(pin, direction)
    }

    //% block
    export function clear(pin: PlanetX_Display.DigitalRJPin) {
        status_red = false
        status_yellow = false
        status_green = false
        redraw(pin, Dir.Up)
    }

    function redraw(pin: PlanetX_Display.DigitalRJPin, direction: Dir) {
        s = PlanetX_Display.create(pin, 8, PlanetX_Display.NeoPixelMode.RGB)
        s.clear()

        if (status_red) {
            s.setPixelColor(getLed(7, direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Red))
            s.setPixelColor(getLed(6, direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Red))
            s.setPixelColor(getLed(5, direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Red))
        }
        if (status_yellow) {
            s.setPixelColor(getLed(0, direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Yellow))
            s.setPixelColor(getLed(4, direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Yellow))
        }
        if (status_green) {
            s.setPixelColor(getLed(1, direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Green))
            s.setPixelColor(getLed(2, direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Green))
            s.setPixelColor(getLed(3, direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Green))
        }
        s.show()
    }

    function getLed(position: number, direction: Dir): number {
        return (position + direction) % 8
    }
}
