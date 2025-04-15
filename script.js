// script.js

// Countdown timer code 
let newYearDate = new Date('25 Jan, 2024, 23:59:59');
let currentDate = new Date();
let milliDiff = newYearDate.getTime() - 
                    currentDate.getTime();
let remDays=0, remHours=0, 
remMinutes=0, remSeconds=0;
const countDown = () => {
    const newYearDate = new Date('25 Jan, 2024, 23:59:59');
    const currentDate = new Date();
    const milliDiff = newYearDate.getTime() - 
                        currentDate.getTime();
    const totalSeconds = Math.floor(milliDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    totalHours = Math.floor(totalMinutes / 60);
    remSeconds = totalSeconds % 60;
    remMinutes = totalMinutes % 60;
    remDays = Math.floor(totalHours / 24);
    remHours = totalHours % 24;
    
    second1.innerHTML = Math.floor(remSeconds/10);
    second2.innerHTML = Math.floor(remSeconds%10);
    minute1.innerHTML = Math.floor(remMinutes/10);
    minute2.innerHTML = Math.floor(remMinutes%10);
    hour1.innerHTML = Math.floor(remHours/10);
    hour2.innerHTML = Math.floor(remHours%10);
    day1.innerHTML = Math.floor(remDays/10);
    day2.innerHTML = Math.floor(remDays%10);
}
let myInterval = setInterval(countDown, 1000);

// Replacing countdown time to current time
setTimeout(()=>{
    clearInterval(myInterval);
    countdown.style.display = "none";
    startRainingFlower()
    slideFlag();
}, milliDiff);

// Animating countdown
let lastDays = 0, lastHours = 0, 
lastMinutes = 0, lastSeconds = 0;
function updateClock() {
    slideTimerDigit
      ('day1', Math.floor(remDays/10), 
    Math.floor(lastDays/10));
    slideTimerDigit
    ('day2', Math.floor(remDays%10), 
    Math.floor(lastDays%10));
    slideTimerDigit
    ('hour1', Math.floor(remHours/10), 
    Math.floor(lastHours/10));
    slideTimerDigit
    ('hour2', Math.floor(remHours%10), 
    Math.floor(lastHours%10));
    slideTimerDigit
    ('minute1', Math.floor(remMinutes/10), 
    Math.floor(lastMinutes/10));
    slideTimerDigit
    ('minute2', Math.floor(remMinutes%10), 
    Math.floor(lastMinutes%10));
    slideTimerDigit
    ('second1', Math.floor(remSeconds/10), 
    Math.floor(lastSeconds/10));
    slideTimerDigit
    ('second2', Math.floor(remSeconds%10), 
    Math.floor(lastSeconds%10));

    lastDays = remDays;
    lastHours = remHours;
    lastMinutes = remMinutes;
    lastSeconds = remSeconds;

    setTimeout(updateClock, 1000);
}

// Timer digits Slider
function slideTimerDigit(id, value, lastValue) {
    const digit = document.getElementById(id);
    if (value !== lastValue) {
        digit.style.transform = 'translateY(-100%)';
        digit.style.opacity = '0';
        setTimeout(() => {
            digit.style.transform = 'translateY(0)';
            digit.textContent = value;
            digit.style.opacity = '1';
        }, 300);
    }
}
updateClock();

// Opening card by sliding flag animation
const slideFlag = () =>{
    ourFlag.classList.add('slideFlag');
}

// Flower's rain code
function startRainingFlower() {
    const canvasWidth = ourCard.offsetWidth;
    const canvasHeight = ourCard.offsetHeight;
    const canvas = 
    document.getElementById('rainingFlowerCanvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const ctx = canvas.getContext('2d');

    const flowers = [];
    const numberOfFlowers = 100;
    const petalColors = 
    ['#FF671F', '#fff', '#046A38'];

    function newFlower() {
      this.x = canvas.width * Math.random();
      this.y = 
      canvas.height * Math.random() - canvas.height;
      this.rotation = Math.random() * 360;
      this.petalColor = petalColors
      [Math.floor(Math.random() * petalColors.length)];
      this.centerColor = petalColors
      [Math.floor(Math.random() * petalColors.length)];
      this.petalSize = Math.random() * 10 + 3;
      this.centerSize = this.petalSize / 3;
      this.speed = this.petalSize/2;
      this.rise = 0;
      this.angle = 0;
    }

    for (let i = 0; i < numberOfFlowers; i++) {
      flowers.push(new newFlower());
    }

    function changeFlower(flower) {
      flower.rotation += 0.5;
      flower.angle += 0.01;
      flower.rise += 0.5;
      flower.y += flower.speed;
      flower.x += 
      Math.sin(flower.angle) - 0.5 + Math.random();

      if (flower.y >= canvas.height + 20) {
        flower.y = -20;
        flower.x = Math.random() * canvas.width;
      }
    }

    function drawFlower(flower) {
      // Draw flower petals
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const petalX = 
        flower.x + Math.cos(angle) * flower.petalSize;
        const petalY = 
        flower.y + Math.sin(angle) * flower.petalSize;

        ctx.beginPath();
        ctx.lineWidth = flower.petalSize / 4;
        ctx.strokeStyle = flower.petalColor;
        ctx.moveTo(petalX + flower.petalSize / 4, petalY);
        ctx.lineTo(petalX, petalY + flower.petalSize / 4);
        ctx.stroke();
        ctx.closePath();
      }

      // Draw flower center
      ctx.beginPath();
      ctx.arc
      (flower.x, flower.y, flower.centerSize, 
      0, 2 * Math.PI, false);
      ctx.fillStyle = flower.centerColor;
      ctx.fill();
      ctx.closePath();
    }

    function animateFlowerConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flowers.forEach(flower => {
        changeFlower(flower);
        drawFlower(flower);
      });

      requestAnimationFrame(animateFlowerConfetti);
    }

    animateFlowerConfetti();
  }
