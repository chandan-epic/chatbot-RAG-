import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {TailSpin} from 'react-loader-spinner'
import ProgressBar from './ProgressBar';
import { useNavigate } from 'react-router-dom';
const CreateBotForm = () => {
    const [file, setFile] = useState(null);
    const [size, setSize] = useState('small');
    const [filename,setFileName]=useState('')
    const [cautions, setCautions] = useState('');
    const [botName,setBotName]=useState('')
    const [desc,setDesc]=useState('')
    const [domain,setDomain]=useState('')
    const [apiKey,setApiKey]=useState('')
    const [step, setStep] = useState(0);
    const [isLoading,setIsLoading]=useState(false);
    const { getAccessTokenSilently} = useAuth0();
    const nav=useNavigate()
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setFileName(selectedFile.name)
        } else {
            alert('Please upload a PDF file.');
        }
    };

    const handleNext = () => {
        
        // const form = document.getElementById('stepperForm');
        // if (form.checkValidity()) {
        //     setStep((prevStep) => prevStep + 1);
        // } else {
        //     form.reportValidity();
        // }
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrev = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log('File:', file);
        console.log('Size:', size);
        console.log('chatbot',botName)
        console.log("domain",domain)
        console.log("desc",desc)
        console.log("api",apiKey)
        console.log("size",size)
        console.log('Cautions:', cautions);


        const formData = new FormData();
        formData.append('file', file);
        formData.append('size', size);
        formData.append('filename', filename);
        formData.append('caution', cautions);
        formData.append('botname', botName);
        formData.append('desc', desc);
        formData.append('domain', domain);
        formData.append('apiKey', apiKey);


        try {
            setIsLoading(true)
            const response = await axios.post('http://localhost:3000/createbot', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
           setIsLoading(false)
           if(response.status==200){
            alert("Sucessfully created and deployed")
            nav("managebot")
           }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className=" min-h-screen bg-gradient-to-r from-primary  font-poppins flex items-start pt-5">
            {isLoading?
                <div className=' absolute top-[280px] right-[510px] flex flex-col justify-center items-center'>
                    <TailSpin color='#4A90E2' height='50' width={'50'} /> 
                    <p className='mt-5'>Creating and Deploying ChatBot</p>
                </div>:
                <div className='flex'>
                    <form onSubmit={handleSubmit} className="w-full max-w-md ml-10 p-6 glassmorphism shadow-md rounded-lg text-gray-900 animate-slideInFromRight" id='stepperForm'>
                    {step === 0 && (
                        <div className="mb-4 w-[350px]">
                            <label htmlFor="pdfFile" className="block text-white font-bold mb-2">ChatBot Name</label>
                                <input
                                        type="text"
                                        id="name"
                                        onChange={(e) => setBotName(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
                                    />
                            <div className="flex justify-between mt-4 flex-col">
                                <label htmlFor="cautions" className="block text-white font-bold mb-2">Domain</label>
                                <input
                                    type="text"
                                    id="domain"
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
                                />
                            </div>
                            <div className="flex justify-between mt-4 flex-col">
                                <label htmlFor="cautions" className="block text-white font-bold mb-2">Description</label>
                                <input
                                    type="text"
                                    id="desc"
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
                                />
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
                    {step === 1 && (
                        <div className="mb-4 w-[350px">
                            <label htmlFor="pdfFile" className="block text-white font-bold mb-2">Upload PDF:</label>
                            <div className="border-dashed border-2 border-blue-900 py-10 px-6 bg-blue-100 text-center rounded-lg">
                                <div className="mb-4 text-gray-700">
                                    {filename!=''?
                                        <div className="mt-4 text-gray-700">
                                            <p>Uploaded file: {filename}</p>
                                        </div>:
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm2 2a1 1 0 100 2h8a1 1 0 100-2H6zM4 11a1 1 0 000 2h12a1 1 0 100-2H4zm0 4a1 1 0 100 2h8a1 1 0 100-2H4z" clipRule="evenodd" />
                                            </svg>
                                            <p>Choose Files or drag and drop here</p>
                                        </div>}
                                    
                                
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
                            <div className="flex justify-between mt-4 flex-col">
                                <label htmlFor="cautions" className="block text-white font-bold mb-2">Cautions:</label>
                                <input
                                    type="text"
                                    id="cautions"
                                    value={cautions}
                                    onChange={(e) => setCautions(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
                                />
                            </div>
                            <div className='mt-6'>
                                <label htmlFor="size" className="block text-white font-bold mb-2">Length of responese</label>
                                <select
                                    id="size"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
                                >                                       
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                            </div>
                        
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
                    {step === 2 && (
                        <div className="mb-4 w-[350px]">
                            <div className="flex justify-between mt-4 flex-col">
                                <label htmlFor="cautions" className="block text-white font-bold mb-2">Gemeni Api key</label>
                                <input
                                    type="text"
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-100"
                                />
                            </div>
                            <p className='text-white text-xs mt-3'>Don't have api key <span><a className='text-blue-400' href='https://aistudio.google.com/app/apikey'>click here</a></span>  </p>
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
                                    onClick={handleSubmit}
                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </form>
                    <div className="flex flex-col  ml-14 mt-20 ">
                        <ProgressBar currentStep={step}/>
                        {step===0 &&
                            <div className='mt-[100px] '>
                                <p className='text-xl'>ChatBot Info</p>
                                <p> 🚀Please provide your chatbot details.</p>
                                <p>Specify the domain of your chatbot working field</p>
                                <p>Enter the short description about your Ai assistant</p>
                            </div>
                        }
                        {step===1 &&
                            <div className='mt-[100px] '>
                                <p className='text-xl'>Upload Custom Data</p>
                                <p className='mt-5'>✨Upload the custom data specific to chatbot in the format of pdf or txt</p>
                                <p>🧨Specify the do's and don't of your chatbot in the cuations field</p>
                                <p>📏Select the length of answers produced by the chatbot </p>
                            </div>
                        }
                        {step===2 &&
                            <div className='mt-[100px] '>
                                <p className='text-xl'>API key</p>
                                <p> 🔑 Provide Gemini API key.</p>
                                <p></p>
                            </div>
                        }
                                
                    
                </div>
            </div>
            }
           
           
        </div>
    );
};

export default CreateBotForm;
