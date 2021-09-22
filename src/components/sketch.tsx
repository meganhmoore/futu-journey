export default function Sketch(p5) {
    // Variables
    const colorMap = {
        education: "#190C4F",
        job: "#009F77",
        travel: "#fb8793",
        volunteering: "#ffcd73",
        other: "#51d0d3",
    };
    const alto = "#F9F9F9";
    let careerLen = 0;
    let steps = [];
    const initY = 0.1;
    const margin = 0.1;
    const gap = 5;
    const weight = 8;
    // const totalLen = Math.sqrt(Math.pow(p5.width, 2) + Math.pow(p5.height, 2));
    // Setup
    p5.setup = () => {
        p5.createCanvas(p5.windowWidth * 0.5, p5.windowHeight * 0.5);
        p5.background(alto);
    };
    p5.draw = () => {};
    // Hooks for Controls
    function setColor(c) {
        steps[steps.length - 1].color = colorMap[c];
        updateSteps();
    }
    function setDuration(y, m) {
        steps[steps.length - 1].stepLen = y + m / 12;
        careerLen = 0;
        for (let i = 0; i < steps.length; i++) {
            careerLen += steps[i].stepLen;
        }
        updateSteps();
    }
    function newStep() {
        let step = {
            color: colorMap.job,
            stepLen: 0,
            curveBreak: p5.max(p5.min(p5.random(0, 1), 0.66), 0.33),
            curve1: {},
            curve2: {},
        };
        step.curve1["handle1X"] =
            steps.length == 0
                ? p5.random(0, 1)
                : -steps[steps.length - 1].curve2.handle2X;
        step.curve1["handle1Y"] =
            steps.length == 0
                ? p5.random(-1, 1)
                : -steps[steps.length - 1].curve2.handle2Y;
        step.curve1["handle2X"] = p5.random(-1, 0);
        step.curve1["handle2Y"] = p5.random(-1, 1);

        step.curve2["handle1X"] = -step.curve1["handle2X"];
        step.curve2["handle1Y"] = -step.curve1["handle2Y"];
        step.curve2["handle2X"] = p5.random(-1, 0);
        step.curve2["handle2Y"] = p5.random(-1, 1);
        steps.push(step);
    }
    function removeStep() {
        if (steps.length > 0) {
            careerLen -= steps[steps.length - 1].stepLen;
            steps.pop();
        }
    }
    function updateSteps() {
        for (let i = 0; i < steps.length; i++) {
            // Set gap directions
            let gapX = steps[i].curve1["handle1X"] < 0 ? -gap : +gap;
            let gapY = steps[i].curve1["handle1Y"] < 0 ? -gap : +gap;
            // Set Coordinates for Curve1
            steps[i].curve1["startX"] =
                i == 0 ? p5.width * margin : steps[i - 1].curve2.endX + gapX;
            steps[i].curve1["startY"] =
                i == 0
                    ? p5.height - p5.height * margin - p5.height * initY
                    : steps[i - 1].curve2.endY + gapY;
            steps[i].curve1["endX"] =
                steps[i].curve1.startX -
                gapX +
                (p5.width - p5.width * margin * 2) *
                    ((steps[i].stepLen / careerLen) * steps[i].curveBreak);
            steps[i].curve1["endY"] =
                steps[i].curve1.startY -
                gapY -
                (p5.height - p5.height * initY - p5.height * margin * 2) *
                    ((steps[i].stepLen / careerLen) * steps[i].curveBreak);

            // TO DO: Needs to be a bit more variable in it's Y position
            // Set Coordinates for Curve2
            steps[i].curve2["startX"] = steps[i].curve1.endX;
            steps[i].curve2["startY"] = steps[i].curve1.endY;
            steps[i].curve2["endX"] =
                steps[i].curve2.startX +
                (p5.width - p5.width * margin * 2) *
                    ((steps[i].stepLen / careerLen) *
                        (1 - steps[i].curveBreak));
            steps[i].curve2["endY"] =
                steps[i].curve2.startY -
                (p5.height - p5.height * initY - p5.height * margin * 2) *
                    ((steps[i].stepLen / careerLen) *
                        (1 - steps[i].curveBreak));

            // <<< BackUp: Alternative by Megan >>>
            // Helpers
            // let curveLen = totalLen * steps[i].stepLen/careerLen;
            // let curve1Len = curveLen * steps[i].curveBreak;
            // let x1 = p5.random(curve1Len*.2, curve1Len*.8);
            // let curve2Len = curveLen * (1-steps[i].curveBreak);
            // let x2 = p5.random(curve2Len*.2, curve2Len*.8);
            // Set Coordinates for Curve2
            // steps[i].curve1['startX'] = (i==0) ? p5.width*margin : steps[i-1].curve2.endX;
            // steps[i].curve1['startY'] = (i==0) ? p5.height-p5.height*margin-p5.height*initY : steps[i-1].curve2.endY;
            // steps[i].curve1['endX'] = steps[i].curve1.startX + x1;
            // steps[i].curve1['endY'] = steps[i].curve1.startY - (Math.sqrt(Math.pow(curve1Len, 2) - Math.pow(x1, 2)));
            // Set Coordinates for Curve2
            // steps[i].curve2['startX'] = steps[i].curve1.endX;
            // steps[i].curve2['startY'] = steps[i].curve1.endY;
            // steps[i].curve2['endX'] = steps[i].curve2.startX + x2;
            // steps[i].curve2['endY'] = steps[i].curve2.startY - (Math.sqrt(Math.pow(curve2Len, 2) - Math.pow(x2, 2)));
        }
        drawLines();
    }
    function drawLines() {
        // Repaint background
        p5.background(alto);
        // Round Initial strokeCap
        p5.stroke(steps[0].color);
        p5.strokeWeight(weight);
        p5.point(
            p5.width * margin,
            p5.height - p5.height * margin - p5.height * initY
        );
        // Draw each step
        for (let i = 0; i < steps.length; i++) {
            p5.noFill();
            p5.stroke(steps[i].color);
            p5.strokeWeight(weight);
            p5.strokeCap(p5.SQUARE);
            let factor =
                ((p5.width * steps[i].stepLen) / careerLen) *
                steps[i].curveBreak;
            p5.bezier(
                steps[i].curve1.startX,
                steps[i].curve1.startY,
                steps[i].curve1.startX + factor * steps[i].curve1.handle1X,
                steps[i].curve1.startY + factor * steps[i].curve1.handle1Y,
                steps[i].curve1.endX + factor * steps[i].curve1.handle2X,
                steps[i].curve1.endY + factor * steps[i].curve1.handle2Y,
                steps[i].curve1.endX,
                steps[i].curve1.endY
            );
            p5.point(steps[i].curve1.endX, steps[i].curve1.endY);
            p5.point(steps[i].curve2.startX, steps[i].curve2.startY);
            factor =
                ((p5.width * steps[i].stepLen) / careerLen) *
                (1 - steps[i].curveBreak);
            p5.bezier(
                steps[i].curve2.startX,
                steps[i].curve2.startY,
                steps[i].curve2.startX + factor * steps[i].curve2.handle1X,
                steps[i].curve2.startY + factor * steps[i].curve2.handle1Y,
                steps[i].curve2.endX + factor * steps[i].curve2.handle2X,
                steps[i].curve2.endY + factor * steps[i].curve2.handle2Y,
                steps[i].curve2.endX,
                steps[i].curve2.endY
            );
        }
        // Round Last strokeCap
        p5.point(
            steps[steps.length - 1].curve2.endX,
            steps[steps.length - 1].curve2.endY
        );
    }
    // Looping Function
    function loopStep(n) {
        // flip position of curve1.handle2X/Y with curve2.handle1X/Y
        // center point curve2.startX/Y needs to sit somewhere else (to be fixed)
        let helperX = steps[n].curve1.handle2X;
        let helperY = steps[n].curve1.handle2Y;
        steps[n].curve1.handle2X = steps[n].curve2.handle1X;
        steps[n].curve1.handle2Y = steps[n].curve2.handle1Y;
        steps[n].curve2.handle1X = helperX;
        steps[n].curve2.handle1Y = helperY;
        p5.fill("RED");
        p5.rect(steps[n].curve2.startX, steps[n].curve2.startY, 5, 5);
    }
    function unloopStep(n) {
        // to be added
    }
    function addQR() {
        // add Code
    }
    function exportImg() {
        // potentially add Logo and optimize canvas for social media layouts (5:4/16:9)
        p5.saveCanvas("export", "jpg");
    }
    // TEMPORARY >> To be removed when controls are in place
    // Trigger Handling (needs to be hooked to buttons)
    p5.mouseClicked = () => {
        let colorTest = ["job", "education", "travel", "other", "volunteering"];

        newStep();
        setColor(colorTest[Math.floor(p5.random(5))]);
        setDuration(p5.random(3), p5.random(12));
        if (steps.length == 5) {
            loopStep(2);
        }
        if (steps.length == 7) {
            addQR();
            exportImg();
        }
    };
}
