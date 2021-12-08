const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

function randomInt(min, max){
    return Math.floor(min + Math.random() * (max - min + 1));
}

class snowFlake{
    constructor(x, y, size, speed){
        this.xPos = x,
        this.yPos = y,
        this.size = size,
        this.speed = speed
    }
    render(){
        ctx.beginPath()
        ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false)
        ctx.closePath()
        ctx.fillStyle = 'white'
        ctx.fill()
        ctx.strokeStyle = 'black'
        ctx.stroke()
    }
    update(dt){
        this.yPos += this.speed * dt
        if(this.yPos > canvas.height){
            this.yPos = 0
            this.xPos = randomInt(0, canvas.width)
            this.speed = randomInt(160, 240)
        }
    }
}

const snowFlakes = new Array()

function drawBackground(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function update(dt){
    let snowFlakesCount = snowFlakes.length
    if(snowFlakesCount < 70){
        let need = 70 - snowFlakesCount
        for(let i = 0; i < need; i++){
            snowFlakes.push(new snowFlake(
                randomInt(0, canvas.width), // xPos
                0,                          // yPos
                randomInt(5, 8),           // size
                randomInt(70, 150)         // speed
            ))
        }
    }

    snowFlakes.map((item)=>{
        item.update(dt)
    })
}

function render(){
    drawBackground()
    snowFlakes.map((item)=>{
        item.render()
    })
}

let last = Date.now()
function play(){
    let now = Date.now()
    update( (now - last) / 1000 )
    render()
    requestAnimationFrame(play)
    last = now 
}
play()