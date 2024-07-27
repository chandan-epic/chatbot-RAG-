import React, { useState } from 'react';

const CreateBotForm = () => {
    const [file, setFile] = useState(null);
    const [size, setSize] = useState('');
    const [cautions, setCautions] = useState('');
    const [step, setStep] = useState(1);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Please upload a PDF file.');
        }
    };

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrev = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('File:', file);
        console.log('Size:', size);
        console.log('Cautions:', cautions);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-primary to-secondary text-white font-poppins">
            <h1 className="text-4xl font-bold mb-6 animate-slideInFromLeft">Create Your BOT</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg text-gray-900 animate-slideInFromRight">
                {step === 1 && (
                    <div className="mb-4">
                        <label htmlFor="pdfFile" className="block text-gray-900 font-bold mb-2">Upload PDF:</label>
                        <div className="border-dashed border-4 border-blue-500 py-10 px-6 bg-blue-100 text-center rounded-lg">
                            <div className="mb-4 text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm2 2a1 1 0 100 2h8a1 1 0 100-2H6zM4 11a1 1 0 000 2h12a1 1 0 100-2H4zm0 4a1 1 0 100 2h8a1 1 0 100-2H4z" clipRule="evenodd" />
                                </svg>
                                <p>Choose Files or drag and drop here</p>
                            </div>
                            <input
                                type="file"
                                id="pdfFile"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label htmlFor="pdfFile" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Choose Files
                            </label>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={handleNext}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="mb-4">
                        <label htmlFor="size" className="block text-gray-900 font-bold mb-2">Select Size:</label>
                        <select
                            id="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            size="3"
                        >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="mb-4">
                        <label htmlFor="cautions" className="block text-gray-900 font-bold mb-2">Cautions:</label>
                        <input
                            type="text"
                            id="cautions"
                            value={cautions}
                            onChange={(e) => setCautions(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Previous
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateBotForm;
