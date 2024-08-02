
import Chat2 from '../components/ChatBox/Chat2'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DetailsCard from '../components/DetailsCard';
const Chatpage = () => {
  const [data,setData]=useState([]);
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
        const response = await axios.get('http://localhost:3000/getbots');
        setData(response.data.data);
        //console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {
        data.map((e,i)=><DetailsCard chatname={e.chatbotname} link={e.ip} apikey={e.apikey} domain={e.domain} type={"connect"} />)
      }

    </div>
  )
}

export default Chatpage