import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ResetPwd from './pages/Login/ResetPwd';

function App() {
  return (
    <>
        {/* <Header /> */}
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />}  />
          <Route path='/signup' element={<SignUp />}  />
          <Route path='resetpassword' element={<ResetPwd />} />
        </Routes>
        {/* <Footer /> */}
    </>
  );
}

export default App;