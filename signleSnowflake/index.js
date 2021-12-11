const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width = window.innerWidth


function drawBackground(){
ctx.fillStyle = 'black'
ctx.fillRect(0,0,canvas.width, canvas.height)
}

function drawSnowFlake(){
    ctx.strokeWidth = '4'
    ctx.strokeStyle = 'white'
}

drawBackground()