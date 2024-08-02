import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import OnBoarding from './pages/OnBoarding/OnBoarding';

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import SignUpComplete from './pages/SignUp/SignUpComplete';
import Mypage from './pages/Mypage/Mypage';
import TestMain from "./pages/Test/TestMain";
import TestQna from "./pages/Test/TestQna";
import TestResult from "./pages/Test/TestResult";
import MealHome from "./pages/Meal/MealHome";
import MealPost from './pages/Meal/MealPost';
import MealEdit from "./pages/Meal/MealEdit";
import Notice from "./pages/Notice/Notice";

import ProtectedRoute from './routes/ProtectedRoute';
import Calendar from './pages/Calendar/Calendar';
import DetailedDailyAnalytics from './pages/Calendar/DetailedDailyAnalytics';
import MyHungerAnalytics from './pages/Calendar/MyHungerAnalytics';


function App() {
  const location = useLocation();

  const showHeader = location.pathname === '/home' || location.pathname === '/mypage' || location.pathname.startsWith('/test') || location.pathname.startsWith('/result') || location.pathname === '/meal' || location.pathname === '/post' || location.pathname.startsWith('/edit') || location.pathname === "/notice" || location.pathname === "/calendar" || location.pathname.startsWith("/detailedanalytics") || location.pathname === "/myhungeranalytics";
  const showFooter = location.pathname === '/home' || location.pathname === '/mypage' || location.pathname === '/test' || location.pathname === '/meal' || location.pathname === '/post' || location.pathname.startsWith('/edit') || location.pathname === "/notice" || location.pathname === "/calendar" || location.pathname.startsWith("/detailedanalytics") || location.pathname === "/myhungeranalytics";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signupcomplete' element={<SignUpComplete />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path="/test" element={<TestMain />} />
          <Route path="/test/:activeType" element={<TestQna />} />
          <Route path="/result/:activeType/:testResult" element={<TestResult />} />
          <Route path="/meal" element={<MealHome />} />
          <Route path="/post" element={<MealPost />} />
          <Route path="/edit/:id" element={<MealEdit />} />
          {/* <Route path="/notice" element={<Notice />} /> */}
          <Route path='/calendar' element={<Calendar />} />
          <Route path="/detailedanalytics/:formattedDate" element={<DetailedDailyAnalytics />} />
          <Route path='/myhungeranalytics' element={<MyHungerAnalytics />} />
        </Route>
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default App;