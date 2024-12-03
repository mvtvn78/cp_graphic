const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext("2d")
const wave = {
    y: canvas.height/2,
    length : 1,
    amplitude: 100
}
let increment = 0.01
function animate ()
{
    requestAnimationFrame(animate)
    c.fillStyle= "rgba(0,0,0,0.1)"
    c.fillRect(0,0,canvas.width,canvas.height)
    c.beginPath()
    c.moveTo(0,canvas.height /2)
    for(let i = 0 ;i< canvas.width ;++i)
        {
            c.lineTo(i,wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment) )
        }
    c.strokeStyle = "hsl(200,50%,50%)"
    c.stroke()
    increment += 0.01
}
animate()