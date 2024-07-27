import React, { useState } from 'react';

const CreateBotForm = () => {
    const [file, setFile] = useState(null);
    const [size, setSize] = useState('');
    const [cautions, setCautions] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            alert('Please upload a PDF file.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('File:', file);
        console.log('Size:', size);
        console.log('Cautions:', cautions);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 glassmorphism shadow-md rounded-lg">
            <div className="mb-4">
                <label htmlFor="pdfFile" className="block text-white font-bold mb-2">Upload PDF:</label>
                <input
                    type="file"
                    id="pdfFile"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <span className="block text-gray-900 font-bold mb-2">Select Size:</span>
                <div className="flex items-center mb-2">
                    <input
                        type="radio"
                        id="sizeSmall"
                        name="size"
                        value="small"
                        checked={size === 'small'}
                        onChange={(e) => setSize(e.target.value)}
                        className="mr-2"
                    />
                    <label htmlFor="sizeSmall" className="text-gray-900">Small</label>
                </div>
                <div className="flex items-center mb-2">
                    <input
                        type="radio"
                        id="sizeMedium"
                        name="size"
                        value="medium"
                        checked={size === 'medium'}
                        onChange={(e) => setSize(e.target.value)}
                        className="mr-2"
                    />
                    <label htmlFor="sizeMedium" className="text-gray-900">Medium</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        id="sizeLarge"
                        name="size"
                        value="large"
                        checked={size === 'large'}
                        onChange={(e) => setSize(e.target.value)}
                        className="mr-2"
                    />
                    <label htmlFor="sizeLarge" className="text-gray-900">Large</label>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="cautions" className="block text-white font-bold mb-2">Cautions:</label>
                <input
                    type="text"
                    id="cautions"
                    value={cautions}
                    onChange={(e) => setCautions(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit
            </button>
        </form>
    );
};

export default CreateBotForm;
