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
//% color="#AA278D" weight=100
namespace Semaphore {
    //% block
    export function set(pin: PlanetX_Display.DigitalRJPin, color: Color, state: State) {
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
        redraw(pin)
    }

    //% block
    export function clear(pin: PlanetX_Display.DigitalRJPin) {
        status_red = false
        status_yellow = false
        status_green = false
        redraw(pin)
    }

    function redraw(pin: PlanetX_Display.DigitalRJPin) {
        s = PlanetX_Display.create(pin, 8, PlanetX_Display.NeoPixelMode.RGB)
        s.clear()
        if (status_red) {
            s.setPixelColor(7, PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Red))
            s.setPixelColor(6, PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Red))
            s.setPixelColor(5, PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Red))
        }
        if (status_yellow) {
            s.setPixelColor(0, PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Yellow))
            s.setPixelColor(4, PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Yellow))
        }
        if (status_green) {
            s.setPixelColor(1, PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Green))
            s.setPixelColor(2, PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Green))
            s.setPixelColor(3, PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Green))
        }
        s.show()
    }
}
