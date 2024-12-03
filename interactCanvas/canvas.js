const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext("2d")
const mouse = {
    x: undefined,
    y:undefined
}
const maxRadius = 50;
const minRadius = 25;
const colorArray = [
    "#fffa32",
    "#44411a",
    "#fff2s",
    "#ff1100",
]
window.addEventListener('mousemove',function(e){
    mouse.x = e.x
    mouse.y = e.y
})
window.addEventListener("resize", function(e){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
function Circle(x,y,dx,dy,radius)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy= dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random()* colorArray.length)]
    this.draw = function()
    {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.strokeStyle =  this.color
        c.stroke()
    }
    this.update=function()
    {
        if(this.x + this.radius > innerWidth || this.x - this.radius <0)
            this.dx =  - this.dx
        if(this.y + this.radius > innerHeight || this.y - this.radius <0)
            this.dy  = - this.dy
        this.x+= this.dx
        this.y +=this.dy
        // interactivity
        if(mouse.x - this.x < 50 
            && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 
            && mouse.y - this.y >-50) {
            if(this.radius < maxRadius)
                this.radius +=1
        }
        else if (this.radius > minRadius)
            this.radius -=1
        this.draw()
    }
}
var circleArr = []
for(let i  = 0;i<200;++i)
    {
        const radius = 30
        const x = Math.random() * (innerWidth -radius*2) + radius;
        const y = Math.random() * (innerHeight - radius*2) + radius;
        const dx = (Math.random() -0.5) 
        const dy = (Math.random() - 0.5) 
        circleArr.push(new Circle(x,y,dx,dy,radius))
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
animate()