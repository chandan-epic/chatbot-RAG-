import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { Navigate, Outlet } from 'react-router-dom'
import UserContext from '../context/UserContext'

import styles from "../style.js"
import UserPage from './UserPage.jsx'
const HomePage = () => {
  
  return (
    <>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
             <div className={`${styles.boxWidth} `}>
                <Navbar />
            </div>
        </div>

        <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Outlet/>
            </div>
        </div>
    </>
  )
}

export default HomePage