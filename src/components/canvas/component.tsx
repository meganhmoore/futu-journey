import React from "react";
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import p5 from "p5";

interface CanvasProps {
	//Your component props
}

const canvasColors = {
    'futuPink': '#fcd4e1',
    'futuGrey': '#d9d9d9',
    'futuGreen': '#009f77',
    'futuDarkBlue': '#200a74',
    'futuLightBlue': '#cdedfd',
    'futuBrightBlue': '#51d0d3'
}

const Canvas: React.FC<CanvasProps> = (props: CanvasProps) => {
	let x = 50;
	const y = 50;

	//See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
	};

    const drawLine = (p5: p5Types, years: number, type: string, start: number=0) => {
        const x1 = start;
        const y1 = start;
        const x2 = (years*10);
        const y2 = (years *10);
        let color;
        if (type == "uni") {
            color = canvasColors["futuPink"]
        } else if ( type == "job") {
            color = canvasColors["futuDarkBlue"]
        } else {
            color = canvasColors["futuLightBlue"]
        }
        p5.stroke(color);
        p5.bezier(x1, y1, 0, 60, 300, 300, x2, y2);
    }

	const draw = (p5: p5Types) => {
		drawLine(p5, 3, "uni");
	};

	return <Sketch setup={setup} draw={draw} />;
};

export default Canvas;