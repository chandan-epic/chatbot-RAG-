import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import LoginPopup from "./LoginPopUP/LoginPopup";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const handleLoginPopup = () => {
    setLoginPopup(!loginPopup);
  };
  const { loginWithRedirect,isAuthenticated ,logout} = useAuth0();

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <span className=" text-3xl text-white font-bold ">Rag</span>
      <p className=" text-3xl text-white font-bold text-gradient">Chat</p>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
        {isAuthenticated?
              <li
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === "logout" ? "text-white" : "text-dimWhite"
              } ml-6`}
              onClick={() => {logout(); setActive("logout")}}
            >
              Logout
            </li>
          :
            <li
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "login" ? "text-white" : "text-dimWhite"
            } ml-6`}
            onClick={() =>{ loginWithRedirect(); setActive("login")}}
          >
            Login
          </li>
        }
        

       
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <LoginPopup loginPopup={loginPopup} handleLoginPopup={handleLoginPopup} />
    </nav>
  );
};

export default Navbar;