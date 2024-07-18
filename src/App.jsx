import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';

import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        {/* <Header /> */}
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />}  />
          <Route path='/signup' element={<SignUp />}  />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;