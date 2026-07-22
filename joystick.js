class Joystick {
    constructor ({ Options: options }) {
        const {
            target,
            idController,
            locked,
            lockPosition,
            autoHidden
        } = options
        this.target = target
        this.locked = locked
        this.lockPosition = lockPosition
        this.controller = document.createElement('div')
        this.controller.id = idController ?? 'joystick'
        this.controller.innerHTML = `
            <div class="controls">
                <div class="positions i">
                    <span></span>
                    <div class="n"> ↑ </div>
                    <span></span>
                    <div class="w"> ← </div>
                    <div class="c"> ● </div>
                    <div class="e"> → </div>
                    <span></span>
                    <div class="s"> ↓ </div>
                    <span></span>
                </div>
                <div class="point i"></div>
            </div>
        `
        this.indicator = this.controller.querySelector('.point')
        this.dragging = false
        this.start = { x: 0, y: 0 }
        this.lastDir = null
        this.maxDistance = 100
        this.directions = {
            North: '.n',
            South: '.s',
            East: '.e',
            West: '.w'
        }
    }
    setDirection (x, y) {
        this.direction = null
        if (Math.abs(x) > Math.abs(y)) {
            if (x > 0) this.direction = 'East'
            else if (x < 0) this.direction = 'West'
        } else {
            if (y > 0) this.direction = 'North'
            else if (y < 0) this.direction = 'South'
        }
        const d = this.directions, c = this.controller
        if (this.lastDir && this.lastDir !== this.direction) {
            c.querySelector(d[this.lastDir])?.classList.remove('active')
        }
        if (this.direction) {
            c.querySelector(d[this.direction])?.classList.add('active')
        }
    }
    startJoystick (e) {
        this.dragging = true
        if (this.locked) {
            this.start = { ... this.lockPosition }
        } else {
            const point = e.touches ? e.touches[0] : e
            this.start.x = point.clientX
            this.start.y = point.clientY
        }
        this.controller.style.left = `${this.start.x}px`
        this.controller.style.top = `${this.start.y}px`
        this.controller.classList.add('show')
    }
    moveJoystick (e) {
        if (!this.dragging) return
        const point = e.touches ? e.touches[0] : e
        let x = this.start.x - point.clientX
        let y = this.start.y - point.clientY
        const distance = Math.sqrt(x * x + y * y)
        if (distance > this.maxDistance) {
            x = (x / distance) * this.maxDistance
            y = (y / distance) * this.maxDistance
        }
        this.indicator.style.transform = `translate(${-x}px, ${-y}px)`
        this.setDirection(x, y)
    }
    stopJoystick () {
        this.dragging = false
        this.indicator.style.transform = 'translate(0,0)'
        if (this.lastDir) {
            this.controller.querySelector(this.directions[this.lastDir])?.classList.remove('active')
        }
        this.lastDir = null
        this.controller.classList.remove('show')
    }
    loadJoystick () {
        if (!this.target) {
            console.warn('select the element target')
            return
        }
        if (!this.target.append) {
            console.warn("select another parent element")
            return
        }
        this.target.append(this.controller)
        document.addEventListener('mousedown', this.startJoystick)
        document.addEventListener('mousemove', this.moveJoystick)
        document.addEventListener('mouseup', this.stopJoystick)
        document.addEventListener('touchstart', this.startJoystick)
        document.addEventListener('touchmove', this.moveJoystick)
        document.addEventListener('touchend', this.stopJoystick)
    }
    ejectJoystick () {
        document.removeEventListener('mousedown', this.startJoystick)
        document.removeEventListener('mousemove', this.moveJoystick)
        document.removeEventListener('mouseup', this.stopJoystick)
        document.removeEventListener('touchstart', this.startJoystick)
        document.removeEventListener('touchmove', this.moveJoystick)
        document.removeEventListener('touchend', this.stopJoystick)
    }
}

// const e = new Joystick({position})