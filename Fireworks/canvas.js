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

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
const gavity = 0.005
const friction = 0.99
function Particle(x,y,radius,color,velocity)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1
    this.draw = function()
    {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,2* Math.PI,false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }
    this.update=function()
    {
       this.draw()
       this.velocity.x *= friction // 10 * 0.99 = 9.99 , 9.99 *0.99 = smaller (slower)
       this.velocity.y *= friction
       this.velocity.y += gavity 
       this.x += this.velocity.x
       this.y+= this.velocity.y
       this.alpha -= 0.001
    }
}
let paritcles ;
function init()
{
    paritcles= []
}
function animate()
    {
        requestAnimationFrame(animate)
        c.fillStyle = "rgba(0,0,0,0.045)"
        c.fillRect(0,0,canvas.width,canvas.height)
        for(let i =0 ;i<paritcles.length;++i)
        {   
            if(paritcles[i].alpha >0)
                paritcles[i].update()
            else
                paritcles.splice(i,1)
        }
    }
init()
animate()
addEventListener("click",(e)=>{
    mouse.x = e.clientX
    mouse.y = e.clientY
    const paritcleCount = 50
    const angleIcrement = (Math.PI* 2) / paritcleCount
    const power = 15
    for(let i =0 ;i<paritcleCount;++i)
    {
        paritcles.push(new Particle(
            mouse.x,
            mouse.y,
            3,
            `hsl(${Math.random() * 360},50%,50%)`,{
            x: Math.cos(angleIcrement *i ) * Math.random() *power,
            y: Math.sin(angleIcrement *i ) * Math.random() *power
        }))
    }
})