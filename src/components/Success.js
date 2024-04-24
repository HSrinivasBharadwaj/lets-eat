import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate()
    const goToHome = () => {
        navigate("/")
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Success!</h1>
      <p className="text-lg text-gray-800 mb-8">Your action was successful.</p>
      <button onClick={goToHome} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Continue 
      </button>
    </div>
  );
};

export default SuccessPage;