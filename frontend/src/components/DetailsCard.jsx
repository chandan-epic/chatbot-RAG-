import React, { useState } from 'react';
import { FaEyeSlash, FaEye,FaTrash  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailsCard = ({ chatname, link, domain, apikey ,type}) => {
  const [isHide, setIsHide] = useState(true);
  const nav=useNavigate()
  const handleconnect=()=>{
    nav('/userpage/editbot', { state: { link:link,chatname:chatname  } });
  }
  const Terminate=async () =>{
    try{
        const response=await axios.post('http://localhost:3000/stopbot', { link }, {
          headers: {
              'Content-Type': 'application/json',
          },
        })
    }catch(error){
        console.error('Error:', error);
    }
}
  return (
    <div className='mt-5 ml-12 border px-4 py-6 rounded-md glassmorphism ml-5 w-[550px] animate-slideInFromRight'>
      <div className='space-y-2 mt-3'>
        <p className='font-semibold text-lg text-white'>Chatbot Name</p>
        <span className='text-gray-200'>{chatname}</span>
      </div>
      <div className='space-y-2 mt-3'>
        <p className='font-semibold text-lg text-white'>ChatBot URL:</p>
        <span className='text-gray-200'>{"http://" + link + ":3000/answer"}</span>
      </div>
      <div className='space-y-2 mt-3'>
        <p className='font-semibold text-lg text-white'>Domain of Chat Bot</p>
        <span className='text-gray-200'>{domain}</span>
      </div>
      <div className='space-y-2 mt-3'>
        <p className='font-semibold text-lg text-white'>Gemini API Key</p>
        <div className='flex items-center'>
          <span className='text-gray-200'>{!isHide ? apikey : "*".repeat(apikey.length)}</span>
          <div className='mx-6'>
            {isHide ? (
              <FaEyeSlash onClick={() => setIsHide(!isHide)} className='cursor-pointer text-blue-500' />
            ) : (
              <FaEye onClick={() => setIsHide(!isHide)} className='cursor-pointer text-blue-500' />
            )}
          </div>
        </div>
      </div>
      <div className=' space-x-3'>
            {type=='connect'?
              <button className={`px-2 py-1  bg-blue-700 text-white mt-5 rounded-md animate-slideInFromLeft`} onClick={handleconnect}>Connect</button>:
              <div className=' space-x-3'>

                <button className={`px-2 py-1 bg-red-600 text-white mt-5 rounded-md`} onClick={Terminate}>{"Teriminate"}</button>
              </div>
            }
           
        </div>
    </div>
  );
};

export default DetailsCard;
