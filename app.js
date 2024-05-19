const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
    console.log("clicked");
    window.open("https://github.com/asadzeus?tab=repositories");
});

let banner = document.querySelector(".banner");
let canvas = document.querySelector(".dotsCanvas");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


let ctx = canvas.getContext('2d');

let dots = [];
let colors = ['#DF1F2D', '#B11313', '#2B3784', '#447BBE','#eee', '#545454', '#596d91'];

for (let index = 0; index < 50; index++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 5,
        color: colors[Math.floor(Math.random() * colors.length)]
    });
    
}

const drawDots = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    })
}

drawDots();

banner.addEventListener('mousemove', () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();

    let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    }

    dots.forEach(dot => {
        let distance = Math.sqrt(Math.pow((mouse.x - dot.x), 2) + Math.pow((mouse.y - dot.y), 2));
        if(distance < 300){
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            
        }
    })
});

banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
});
