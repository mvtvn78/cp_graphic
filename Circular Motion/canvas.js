const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext("2d")
const mouse = {
    x: 0,
    y:0
}
const colorArray = [
    "#FFDFD6",
    "#E3A5C7",
    "#694F8E",
    "#B692C2",
    "#021526",
    "#03346E",
    "#6EACDA",
    "#173B45",
    "#B5C18E",
    "#F6FB7A",
    "#EF5A6F",
    "#E2E2B6"
]
//Event Listeners
window.addEventListener('mousemove',function(e){
    mouse.x = e.x
    mouse.y = e.y
})
window.addEventListener("resize", function(e){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Particle(x,y,radius,color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color
    this.radians = Math.random() * Math.PI *2
    this.velocity = 0.05;
    this.distanceFromCenter  =randomIntFromRange(100,200)
    this.lastMouse = {x:x ,y :y}
    this.draw = function(lastpoint)
    {
        c.beginPath()
        c.strokeStyle= this.color
        c.lineWidth = this.radius
        c.moveTo(lastpoint.x,lastpoint.y)
        c.lineTo(this.x, this.y)
        c.stroke()
        c.closePath()
    }
    this.update=function()
    {
        const lastpoint ={x: this.x,y:this.y}
        this.radians+= this.velocity
        // Drag Effect
        this.lastMouse.x += (mouse.x  - this.lastMouse.x)  * 0.05
        this.lastMouse.y += (mouse.y  - this.lastMouse.y) *0.05
        //Circle Motion
        this.x  =  this.lastMouse.x +  Math.cos(this.radians) *this.distanceFromCenter
        this.y = this.lastMouse.y +   Math.sin(this.radians) * this.distanceFromCenter
        console.log("THIS X : "+ this.x);
        this.draw(lastpoint)
    }
}
let paritcles ;
function init()
{
    paritcles= []
    for(let i  = 0;i<1;++i)
        {
            const radius = (Math.random() *6 ) +10
            const indexColor = randomIntFromRange(0,colorArray.length)
            paritcles.push( new Particle(canvas.width/2,400,radius,colorArray[indexColor]))
        }
}
function animate()
    {
        requestAnimationFrame(animate)
        c.fillStyle = "rgba(255,255,255,0.045)"
        c.fillRect(0,0,canvas.width,canvas.height)
        for(let i =0 ;i<paritcles.length;++i)
        {
            paritcles[i].update()
        }
    }
init()
animate()