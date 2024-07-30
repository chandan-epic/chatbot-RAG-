import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import axios from 'axios';

const style = {
  main: `flex flex-col p-[10px]`,
};

const Chat = ({link}) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  
  return (
    <div className='border-white border-2 w-[400px] h-[500px] flex flex-col justify-between'>
      <main className='flex flex-col p-[10px] '>
        
        {messages &&
          messages.map((message,key) => (
            <Message key={key} message={message.m} type={message.type}/>
          ))}
      </main>
      <div>
        <SendMessage scroll={scroll} setMassages={setMessages} messages={messages} link={link}/>
        <span ref={scroll}></span>
      </div>
      
    </div>
  );
};

export default Chat;