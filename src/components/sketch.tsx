export default function Sketch(p5) {
  let canvas;
  let width;
  let height;
  let originX = 100;
  let originY = 100;

  p5.setup = () => {
    width = p5.windowWidth * 0.5;
    height = p5.windowHeight * 0.7;
    canvas = p5.createCanvas(width, height);
    p5.noStroke();
  };

  const colorMap = { job: "#DDBACC", travel: "#009F77", education: "#190C4F" };

  function randCoord() {
    let x = originX + p5.random(100);
    let y = originY + p5.random(100);
    if (x > width - 50) {
      x = originX - p5.random(100);
    }
    if (y > height - 50) {
      y = originY - p5.random(100);
    }
    originX = x;
    originY = y;
    return [x, y];
  }

  function drawLine(experience) {
    let color = "#FFF";
    if (experience in colorMap) {
      color = colorMap[experience];
    }
    p5.noFill();
    p5.stroke(color);
    p5.strokeWeight(5);
    let start = randCoord();
    let end = randCoord();
    p5.bezier(
      originX,
      originY,
      start[0],
      start[1],
      end[0],
      end[1],
      originX + 50,
      originY + 50
    );
    originX = originX + 100;
    originY = originY - 10;
  }

  p5.draw = () => {
    // let y = p5.color("coral");

    // p5.fill(y);
    // p5.circle(45, 45, 65);

    if (p5.mouseIsPressed) {
      drawLine("job");
    } //else {
    // //   p5.fill(p5.color("hsl(160, 100%, 50%)"));
    // }
    // p5.circle(p5.mouseX, p5.mouseY, 70, 70);
  };
}
