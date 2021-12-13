const canvas = document.getElementById('canvas')
const range = document.getElementById('range')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

function angleX( x, y, x0, y0, alpha ){
    alpha = (alpha * Math.PI) / 180
    return ( x - x0 ) * Math.cos(alpha) - ( y - y0 ) * Math.sin(alpha) + x0
}

function angleY( x, y, x0, y0, alpha ){
    alpha = (alpha * Math.PI) / 180
    return ( x - x0 ) * Math.sin(alpha) + ( y - y0 ) * Math.cos(alpha) + y0 
}

class Snowflake{
    constructor(x, y, size, quality){
        this.x = x,
        this.y = y,
        this.size = size,
        this.quality = quality
    }

    draw(){
        ctx.lineWidth = 4
        ctx.strokeStyle = '#ffffff'
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.size, this.y)
        ctx.closePath()
        ctx.stroke()
    }

    render(){

    }

    update(){

    }
}

const singleSnowFlake = new Snowflake(
    canvas.width / 2,
    canvas.height / 2,
    150,
    2
)

function drawBackground(){
ctx.fillStyle = 'black'
ctx.fillRect(0,0,canvas.width, canvas.height)
}

function update(dt){
}

function render(){
    drawBackground()
    singleSnowFlake.draw()
}

let now = Date.now()
function play(){
    let last = Date.now()
    render()
    update(( last - now ) / 1000)
    requestAnimationFrame(play)
    now = last
}

play()