import { NextPage } from 'next';
import React from 'react';
import { useRouter } from 'next/router';
import Canvas from 'components/canvas';

const buttonStyle="inline-flex items-center px-2.5 py-1.5 border text-xs font-medium rounded shadow-sm text-white bg-futuGreen hover:bg-futuLightBlue"

const JourneyVizPage: NextPage = () => {
    return(
        <div className="flex grid grid-cols-4 gap-4 justify-center">
            <div className="col-span-2 p-8">
                Add Experience:
                <div>
                <button type="button" className={buttonStyle}>University</button>
                <button type="button" className={buttonStyle}>Job</button>
                <button type="button" className={buttonStyle}>Other</button>
                </div>
            </div>
            <div className="col-span-2"><Canvas /></div>
        </div>
    )
}
export default JourneyVizPage;