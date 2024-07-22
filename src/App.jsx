import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ResetPwd from './pages/Login/ResetPwd';
import FindId from './pages/Login/FindId';
import ViewUserId from './pages/Login/ViewUserId';
import SignUpComplete from './pages/SignUp/SignUpComplete';
import Mypage from './pages/Mypage/Mypage';


function App() {
  const location = useLocation();
  const showHeader = location.pathname === '/' || location.pathname === '/mypage';
  const showFooter = location.pathname === '/' || location.pathname === '/mypage';

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signupcomplete' element={<SignUpComplete />} />
        <Route path='/resetpassword' element={<ResetPwd />} />
        <Route path="/findid" element={<FindId />} />
        <Route path='/viewuserid' element={<ViewUserId />} />
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default App;