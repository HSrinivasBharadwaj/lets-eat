import React, { useEffect, useState } from "react";
import { LOGO_URI, CART_URI } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../features/user/userSlice";
import { changeLanguage } from "../features/config/configSlice";
import lang from "../utils/language";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = useSelector(state => state.user?.userDetails?.email);
  const getLanguages = useSelector(state => state.config.lang);
  let quantity = 0;
  const getCartItems = useSelector(state => state.cart?.cartItems);
  for (let i = 0; i < getCartItems.length; i++) {
    quantity = quantity + getCartItems[i].quantity
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email } = user
        dispatch(addUser({ email }))
        navigate("/")
      } else {
        dispatch(removeUser())
        navigate("/signin")
      }
    });
  }, [])
  const goToGptSearchPage = () => {
    navigate("/gptsearch")
  }

  const goToSignInPage = () => {
    navigate("/signin")
  }

  const signOutUser = () => {
    signOut(auth).then(() => {
      navigate("/signin")
    }).catch((error) => {
      console.log(error)
    });
  }

  const goToCartPage = () => {
    navigate("/cartpage")
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }
  
  return (
    <header className="shadow-md p-4 font-[JetBrains Mono]">
      <nav className="flex justify-between items-center">
        <ul className="flex items-center">
          <li>
            <a>
              <img
                className="w-24 h-24 cursor-pointer"
                src={LOGO_URI}
                alt="Welcome to FoodHub"
              />
            </a>
          </li>
          <li>
            <a>
              <h1 className="font-bold">
                Delivering at
                <p className="text-[#5750c2]">560061, Bengaluru</p>
              </h1>
            </a>
          </li>
        </ul>

        <ul className="flex items-center">
        <li>
            <a>
              <select className="p-2 bg-gray-900 text-white m-2" onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="telugu">Telugu</option>
              </select>
            </a>
          </li>
          <li>
            <a>
              <button className="bg-red-500 text-white cursor-pointer p-2 rounded-md w-24" onClick={goToGptSearchPage}>{lang[getLanguages].search}</button>
            </a>
          </li>
          <li onClick={goToCartPage}>
            <a>
              <img
                className="w-16 h-16 cursor-pointer mr-5"
                src={CART_URI}
                alt="Cart Image"
              />
              <span className="absolute top-5 right-32 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                {quantity}
              </span>
            </a>
          </li>
          {
            getUser ?
              <li>
                <a>
                  <button
                    onClick={signOutUser}
                    className="bg-black text-white cursor-pointer p-2 rounded-lg w-24"
                  >
                    
                    {lang[getLanguages].signout}
                  </button>
                </a>
              </li>
              :
              <li>
                <a>
                  <button
                    onClick={goToSignInPage}
                    className="bg-black text-white cursor-pointer p-2 rounded-lg w-24"
                  >
                    {lang[getLanguages].signIn}
                  </button>
                </a>
              </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;