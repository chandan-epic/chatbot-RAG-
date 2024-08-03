import React from 'react'
import Chat2 from '../components/ChatBox/Chat2'
import { useLocation } from 'react-router-dom';
const EditBotData = () => {
  const location = useLocation();
  const { li } = location.state || {}; 
  return (
    <div><Chat2 li={li+":3000"}/></div>
  )
}

export default EditBotData