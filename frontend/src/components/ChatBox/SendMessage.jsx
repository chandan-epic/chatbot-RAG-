import React, { useState } from 'react';


import axios from 'axios';
const style = {
  form: `h-14 w-full max-w-[728px]  flex text-xl`,
  input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
  button: `w-[20%] bg-green-500`,
};

const SendMessage = ({scroll,messages,setMassages,link}) => {
  const [input, setInput] = useState('');
  
  const sendMessage = async (e) => {
    e.preventDefault()
    console.log(input)
    setMassages((e)=>[...e,{m:input,type:"sent"}])
    const data={question:input}
    const response = await axios.post(link+'/answer', data);
    const rmessage=response.data.receivedData
    setMassages((e)=>[...e,{m:rmessage,type:"reicive"}])
    setInput('')
    scroll.current.scrollIntoView({behavior: 'smooth'})
   
  }

  return (
    <form onSubmit={sendMessage} className={style.form}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={style.input}
        type='text'
        placeholder='Message'
      />
      <button className={style.button} type='submit'>
        Send
      </button>
    </form>
  );
};

export default SendMessage;