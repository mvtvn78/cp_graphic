const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext("2d")
const mouse = {
    x: undefined,
    y:undefined
}
const maxRadius = 50;
var circleArr = []
const minRadius = 25;
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
window.addEventListener('mousemove',function(e){
    mouse.x = e.x
    mouse.y = e.y
})
window.addEventListener("resize", function(e){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    init()
})
function Circle(x,y,dy,radius)
{
    this.x = x;
    this.y = y;
    this.dy= dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random()* colorArray.length)]
    this.draw = function()
    {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle =  this.color
        c.fill()
        c.stroke()
    }
    this.update=function()
    {
        if(this.y + this.radius > innerHeight)
            this.dy  = - this.dy *0.99
        else
            this.dy +=1
        this.y +=this.dy
        this.draw()
    }
}
function animate()
    {
        requestAnimationFrame(animate)
        c.clearRect(0,0,innerWidth,innerHeight)
        for(let i =0 ;i<circleArr.length;++i)
        {
            circleArr[i].update()
        }
    }
function init()
{
    circleArr= []
    for(let i  = 0;i<3;++i)
        {
            const radius = 30
            const x = Math.random() * (innerWidth -radius*2) + radius;
            const y = Math.random() * (innerHeight/2) ;
            const dy = Math.random()
            circleArr.push(new Circle(x,y,dy,radius))
        }
}
init()
animate()