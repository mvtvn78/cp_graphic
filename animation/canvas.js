const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const c = canvas.getContext("2d")

// //Rectangles
// c.fillStyle  = 'rgb(255,0,0,0.2)'
// c.fillRect(50,50 ,100,200)
// c.fillRect(300,50 ,100,200)
// //Line
// c.beginPath()
// c.moveTo(50,300)
// c.lineTo(300,100)
// c.lineTo(400,300)
// c.strokeStyle ="#fa34a3"
// c.stroke()

function Circle(x,y,dx,dy,radius)
{
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy= dy;
    this.radius = radius;
    this.draw = function()
    {
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.strokeStyle = "blue"
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
        this.draw()
    }
}
var circleArr = []
for(let i  = 0;i<200;++i)
    {
        const radius = 30
        const x = Math.random() * (innerWidth -radius*2) + radius;
        const y = Math.random() * (innerHeight - radius*2) + radius;
        const dx = (Math.random() -0.5) *10
        const dy = (Math.random() - 0.5) *10
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
console.log(circleArr);
animate()