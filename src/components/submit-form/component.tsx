import React from 'react';

const SubmitForm: React.FC = () => {
    return(
        <div className="flex justify-center p-20">
            <div className="flex justify-center w-full">
                <form className="bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="linkedin">
                    LinkedIn
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="linkedin" type="text" placeholder="https://linkedin.com/my-linkedin" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Get My Journey
                    </button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitForm;