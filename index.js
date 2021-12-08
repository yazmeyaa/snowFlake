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
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'black'
        ctx.beginPath()
        ctx.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI, false)
        ctx.closePath()
        ctx.fill()
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

class BGsnowFlake{
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
        ctx.fillStyle = '#6e6e6e'
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

const BGsnowFlakes = new Array()

function drawBackground(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function snowFlakeGenerator(){
    let missCount = 100 - snowFlakes.length
    if(missCount){
        for(let i = 0; i < missCount; i++){
        snowFlakes.push(new snowFlake(
            randomInt(0, canvas.width),
            randomInt(0, canvas.height),
            randomInt(5,8),
            randomInt(150,190)
        ))
        }
    }
}

function timeUntilNewYear(){
    const NewYear2022 = new Date(2022, 01,)
    ctx.textAlign = "center"
    ctx.font = '48px Verdana'
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'red'
    ctx.fillText(`До нового года осталось ${ Math.round( ( NewYear2022 - Date.now() ) / 1000 / 60 / 60 / 24 ) } дня`, canvas.width / 2, canvas.height / 2)
    ctx.stroke()
}

function update(dt){
    snowFlakeGenerator()
    snowFlakes.map((item)=>{
        item.update(dt)
    })
}

function render(){
    drawBackground()
    snowFlakes.map((item)=>{
        item.render()
    })
    timeUntilNewYear()
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