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
    Right = 2,
    Left = 6
}
//% color="#AA278D" weight=100 icon="\uf110" block="First Projects" blockId="First_Projects" 
//% groups=["setup", "actions"]
namespace FirstProjects {
    //% blockId="semaphore_create" block="Semaphore at pin %pin|with %direction|direction"
    //% blockSetVariable=semaphore
    //% weight=100
    //% subcategory=Semaphore group=setup
    export function createSemaphore(pin: PlanetX_Display.DigitalRJPin, direction: Dir): Semaphore {
        let sem = new Semaphore();
        sem.strip = PlanetX_Display.create(pin, 8, PlanetX_Display.NeoPixelMode.RGB)
        sem.direction = direction;
        sem.status_red = false
        sem.status_yellow = false
        sem.status_green = false
        return sem;
    }

    export class Semaphore {
        strip: PlanetX_Display.Strip;
        direction: Dir;
        status_red: boolean
        status_yellow: boolean
        status_green: boolean


        //% blockId="semaphore_set" block="Set %semaphore %color to %state" subcategory=Semaphore group=actions
        set(color: Color, state: State) {
            switch (color) {
                case Color.Red:
                    this.status_red = (state == State.On)
                    break;
                case Color.Yellow:
                    this.status_yellow = (state == State.On)
                    break;
                case Color.Green:
                    this.status_green = (state == State.On)
                    break;
            }
            this.redraw()
        }

        //% blockId="semaphore_clear" block="Clear %semaphore" subcategory=Semaphore group=actions
        clear() {
            this.status_red = false
            this.status_yellow = false
            this.status_green = false
            this.redraw()
        }

        private redraw() {
            this.strip.clear()

            if (this.status_red) {
                this.strip.setPixelColor(getLed(7, this.direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Red))
                this.strip.setPixelColor(getLed(6, this.direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Red))
                this.strip.setPixelColor(getLed(5, this.direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Red))
            }
            if (this.status_yellow) {
                this.strip.setPixelColor(getLed(0, this.direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Yellow))
                this.strip.setPixelColor(getLed(4, this.direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Yellow))
            }
            if (this.status_green) {
                this.strip.setPixelColor(getLed(1, this.direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Green))
                this.strip.setPixelColor(getLed(2, this.direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Green))
                this.strip.setPixelColor(getLed(3, this.direction), PlanetX_Display.colors(PlanetX_Display.NeoPixelColors.Green))
            }
            this.strip.show()
        }
    }

    function getLed(position: number, direction: Dir): number {
        return (position + direction) % 8
    }
}
