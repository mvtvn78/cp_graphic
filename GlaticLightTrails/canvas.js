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
let angle =0
let mouseDown = false
window.addEventListener("mousedown", function(e){
    mouseDown = true
})
window.addEventListener("mouseup", function(e){
    mouseDown = false
})
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function Particle(x,y,radius,color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
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
    }
}
let paritcles ;
function init()
{
    paritcles= []
    const paritcleCount = 250
    for(let i =0 ;i<paritcleCount;++i)
    {
       const canvasWidth = canvas.width + 300
       const canvasHeight = canvas.height + 300
       const x = Math.random() *canvasWidth- (canvasWidth /2)
       const y = Math.random() * canvasHeight  - (canvasHeight /2)
       const radius = 2 * Math.random()
       const color = Math.floor(Math.random() * colorArray.length)
       paritcles.push(new Particle(x,y,radius,colorArray[color]))
    }
}
let radians= 0
let alpha = 1
function animate()
    {
        requestAnimationFrame(animate)
        c.fillStyle = `rgba(10,10,10,${alpha})`
        c.fillRect(0,0,canvas.width,canvas.height)
        
        c.save()
        c.translate(canvas.width/2,canvas.height/2)
        c.rotate(radians)
        for(let i =0 ;i<paritcles.length;++i)
        {   
            paritcles[i].update()
        }
        c.restore()
        radians += 0.001
        if(mouseDown && alpha >= 0.05)
            alpha-=0.01
        else if( !mouseDown && alpha <1)
            alpha += 0.01
    }
init()
animate()
