import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import RestaurantPage from './components/RestaurantPage';
import CartPage from './components/CartPage';
import SuccessPage from './components/Success';
import GptSearchPage from './components/GptSearch';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/signin' element={<Login />}/>
        <Route path='/' element={<Body />}/>
        <Route path='/restaurant/:id' element={<RestaurantPage />}/>
        <Route path='/cartpage' element={<CartPage />}/>
        <Route path='/successpage' element={<SuccessPage />}/>
        <Route path='/gptsearch' element={<GptSearchPage />}/>
      </Routes>
    </div>
  );
}

export default App;
