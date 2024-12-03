const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext("2d")
const mouse = {
    x: innerWidth/2,
    y:innerHeight /2
}

window.addEventListener("resize", function(e){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})
let angle =0
window.addEventListener("mousemove", function(e){
    // Mouse start from center canvas
    mouse.x = e.clientX - canvas.width/2 
    mouse.y = e.clientY - canvas.height/2
    angle= Math.atan2(mouse.y,mouse.x)
    console.log("Angle :" + angle);
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Particle(x,y,radius,color,distanceFromCenter)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.distanceFromCenter = distanceFromCenter
    this.draw = function()
    {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,2* Math.PI,false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
    this.update=function()
    {
       this.draw()
       this.x = canvas.width /2 + (this.distanceFromCenter * Math.cos(angle)) 
       this.y = canvas.height /2 + (this.distanceFromCenter * Math.sin(angle)) 
    }
}
let paritcles ;
function init()
{
    paritcles= []
    let paritcleCount = 200
    const hueIncrement = 360 / paritcleCount
    for(let i =0 ;i<paritcleCount;++i)
    {
        const x = canvas.width/2 + i * Math.cos(Math.PI)
        const y = canvas.height /2 + i * Math.sin(-Math.PI)
        paritcles.push(new Particle(x,y,5,`hsl(${hueIncrement *i},50%,50%)`,i))
    }
}
function animate()
    {
        requestAnimationFrame(animate)
        c.fillStyle = "rgba(0,0,0,0.045)"
        c.fillRect(0,0,canvas.width,canvas.height)
        for(let i =0 ;i<paritcles.length;++i)
        {   
            paritcles[i].update()
        }
    }
init()
animate()
