import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSend, AiOutlineRobot, AiOutlineUser, AiOutlineCopy, AiOutlineSync, AiOutlineSound } from 'react-icons/ai';
import axios from 'axios';
const Chat2 = ({li}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial pre-prompts
    const initialMessages = [
      { type: 'recive', m: 'Hello! How can I assist you today?' },
    ];
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    //messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async() => {
    if (input.trim()) {
      //const userMessage = { sender: 'user', text: input };
      //setMessages([...messages, userMessage]);
      
      setInput('');
      setMessages((e)=>[...e,{m:input,type:"sent"}])
      const data={question:input}
      console.log(li)
      const response = await axios.post(`http://${li}/answer`, data);
      const rmessage=response.data.receivedData
      console.log(rmessage)
      // setMessages((e)=>[...e,{m:rmessage,type:"reicive"}])
      setInput('')
      // scroll.current.scrollIntoView({behavior: 'smooth'})
     
      // Simulate bot response
      generateBotResponse(rmessage);

    }
  };

  const generateBotResponse = (fullText) => {
    let index = 0;
    const botMessage = { type: 'recive', m: '' };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    const interval = setInterval(() => {
      if (index < fullText.length) {
        botMessage.m += fullText[index];
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1] = botMessage;
          return updatedMessages;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust speed as necessary
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const regenerateResponse = (index) => {
    const newResponse = 'This is a regenerated response.';
    generateBotResponse(newResponse);
  };

  const readMessage = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen font-poppins p-4 flex flex-col  items-center">
      <div className="w-full max-w-4xl bg-gray-800 p-4 shadow-md rounded-lg text-gray-200  flex flex-col justify-between" style={{ minHeight: '60vh' }}>
        <div className="flex-grow max-h-96 overflow-y-auto p-2 bg-gray-700 rounded-md mb-4 flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`p-4 rounded-lg flex flex-col transition-transform transform ${message.type === 'sent' ? 'bg-blue-500 text-white self-end' : 'bg-gray-500 text-white self-start'} ${message.type === 'sent' ? 'slide-in-up' : 'slide-in-down'}`}>
              <div className="flex items-center">
                {message.type === 'sent' ? <AiOutlineUser className="mr-2" /> : <AiOutlineRobot className="mr-2" />}
                <div>{message.m}</div>
              </div>
              {message.type !== 'sent' && (
                <div className="flex mt-2 space-x-2 text-sm">
                  <button onClick={() => copyToClipboard(message.text)} className="hover:text-blue-500"><AiOutlineCopy /></button>
                  <button onClick={() => regenerateResponse(index)} className="hover:text-blue-500"><AiOutlineSync /></button>
                  <button onClick={() => readMessage(message.text)} className="hover:text-blue-500"><AiOutlineSound /></button>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-grow px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <AiOutlineSend className="mr-2" />
            Send
          </button>
        </div>
      </div>
      <div className="w-full max-w-4xl bg-gray-800 p-4 mt-4 shadow-md rounded-lg text-gray-200 text-sm">
        <p className="mb-2">What is a RAG: A Retrieval-Augmented Generation model enhances responses by retrieving relevant information.</p>
        <p>✨✨Try asking anything about the shared docs......</p>
      </div>
    </div>
  );
};

export default Chat2
