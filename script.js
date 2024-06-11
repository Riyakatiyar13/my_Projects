
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");

/* --------------- Minimum And Maximum Angle for value  --------------------- */
const spinValues = [
  { minDegree: 52, maxDegree: 102, value: "100 bonus points" },
  { minDegree: 0, maxDegree: 51, value: "10% off" },
  { minDegree: 307, maxDegree: 357, value: "free Surprise gift" },
  { minDegree: 256, maxDegree: 306, value: "30% off" },
  { minDegree: 205, maxDegree: 255, value: "Won 100 Rs. Cash Prize" },
  { minDegree: 154, maxDegree: 204, value: "50% off" },
  { minDegree: 103, maxDegree: 153, value: "Better luck for next time" },




];

/* --------------- Size Of Each segement  --------------------- */
const size = [20, 20, 20, 20, 20, 20, 20];

/* --------------- Background Color  --------------------- */
const spinColors = [
  "#E74C3C",
  "#7D3C98",
  "#2E86C1",
  "#138D75",
  "#F1C40F",
  "#D35400",
  "#b163da"
];

/* --------------- Chart insertion --------------------- */
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels], // include pulgin
  type: "pie",
  data: {
    labels: ["Bonus Point", "10% Off", "Free \nSurprise\n Gift", "30% Off", "Won\n Rs. 100\nCash", "50% Off", "Another\n Time!"],
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: { display: false },
      datalabels: {
        rotation: 90,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: {
          size: 12,
        },
        align: "end",
        display: 'auto',
        offset: -15,

        labels: {
          title: {
            font: {
              family: 'Arial', 
              
            }
          },
        }
     
      },
    },
  },
});

this.start=  startConfetti = () => {
  initConfetti();
  render();
  // Clear the previous timer

  // Set a new timer to stop the confetti after 10 seconds
  setTimeout(this.stop, 10000); // 10 seconds in milliseconds
};


/* --------------- Display Value Based On The Angle --------------------- */
const generateValue = (angleValue) => {
  for (let i of spinValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      
      spinBtn.disabled = true;
      //---------Execution****
      startConfetti();
      break;
    }
  }
};

/* --------------- Spinning Code --------------------- */
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  text.innerHTML = `<p>All the Best!</p>`;
  let randomDegree = Math.floor(Math.random() * 358);
  let count = 0;
  let resultValue = 101;
  let rotationInterval = window.setInterval(() => {
    spinChart.options.rotation += resultValue;
    spinChart.update();
    if (spinChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      spinChart.options.rotation = 0;
    }
    if (count > 15 && spinChart.options.rotation === randomDegree) {
      generateValue(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});

//-----------Var Inits-----
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cx = ctx.canvas.width / 2;
let cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 4;
const drag = 0.075;
const colors = [
  { front: 'red', back: 'darkred' },
  { front: 'green', back: 'darkgreen' },
  { front: 'blue', back: 'darkblue' },
  { front: 'yellow', back: 'darkyellow' },
  { front: 'orange', back: 'darkorange' },
  { front: 'pink', back: 'darkpink' },
  { front: 'purple', back: 'darkpurple' },
  { front: 'turquoise', back: 'darkturquoise' }
];

//-----------Functions-----
const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

const randomRange = (min, max) => Math.random() * (max - min) + min;

const initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(5, 10),
        y: randomRange(10, 15)
      },
      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1
      },
      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1
      },
      velocity: {
        x: randomRange(-15, 15),
        y: randomRange(0, -30)
      }
    });
  }
};

render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;


    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);


    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();


    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;


    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);


    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;


    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;


    ctx.fillRect(-width / 2, -height / 2, width, height);


    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  if (confetti.length <= 10) initConfetti();

  window.requestAnimationFrame(render);
};



//----------Resize----------
window.addEventListener('resize', function () {
  resizeCanvas();
});

//------------Click------------
window.addEventListener('click', function () {
  initConfetti();
});




