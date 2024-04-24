import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationCheck } from "../utils/validations";
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import lang from "../utils/language";

const Login = () => {
    const getLanguages = useSelector(state => state.config.lang);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
    const handleUserDetails = (e) => {
        e.preventDefault();
        const error = validationCheck(email, password);
        setErrorMessage(error);
        //Add the logic for the sign and signup
        if (error) return;
        if (!isSignInForm) {
            //Logic for the registering the user
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    toast.success("User successfully signed up please proceed to login to order")
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage.slice(22, 42))
                });
        }
        else {
            //Logic for signing the user
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    toast.success("User signed in successfully, You can order now")
                    navigate("/")
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage.slice(22, 40))
                });

        }

    };
    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} theme="colored" />
            <div className="bg-gray-100 rounded-lg shadow-md mt-20 mx-auto w-96 p-10">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-5">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>
                    <form className="flex flex-col w-72">
                        {/* Show this when isSignIn is false */}
                        {!isSignInForm && (
                            <>
                                <label htmlFor="name" className="mb-2 text-lg">
                                    {lang[getLanguages].fullName}
                                </label>
                                <input
                                    value={name}
                                    type="text"
                                    placeholder={lang[getLanguages].fullName}
                                    className="border border-gray-300 rounded-lg p-2 mb-4"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </>
                        )}

                        <label htmlFor="email" className="mb-2 text-lg">
                            {lang[getLanguages].email}
                        </label>
                        <input
                            value={email}
                            type="email"
                            placeholder={lang[getLanguages].emailPlaceHolder}
                            className="border border-gray-300 rounded-lg p-2 mb-4"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="password" className="mb-2 text-lg">
                            {lang[getLanguages].password}
                        </label>
                        <input
                            value={password}
                            type="password"
                            placeholder={lang[getLanguages].passwordPlaceHolder}
                            className="border border-gray-300 rounded-lg p-2 mb-4"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Error message */}
                        <p className="text-red-500 my-2">{errorMessage}</p>
                        <button
                            onClick={handleUserDetails}
                            className="bg-[#FE724C] text-white rounded-full py-2"
                        >
                            {isSignInForm ? lang[getLanguages].signIn : lang[getLanguages].signout}
                        </button>

                        <p
                            onClick={toggleSignInForm}
                            className="mt-4 text-sm text-gray-600 cursor-pointer"
                        >
                            {isSignInForm
                                ? lang[getLanguages].signUpText
                                : lang[getLanguages].loginText}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;