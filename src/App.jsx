import { Route, Routes, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import OnBoarding from './pages/OnBoarding/OnBoarding';

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ResetPwd from './pages/Login/ResetPwd';
import FindId from './pages/Login/FindId';
import ViewUserId from './pages/Login/ViewUserId';
import SignUpComplete from './pages/SignUp/SignUpComplete';
import Mypage from './pages/Mypage/Mypage';
import TestMain from "./pages/Test/TestMain";
import TestQna from "./pages/Test/TestQna";
import TestResult from "./pages/Test/TestResult";
import MealHome from "./pages/Meal/MealHome";
import MealPost from './pages/Meal/MealPost';
import MealEdit from "./pages/Meal/MealEdit";
import Notice from "./pages/Notice/Notice";

import DeletePls from './pages/Login/DeletePls';
import ProtectedRoute from './routes/ProtectedRoute';
import Calendar from './pages/Calendar/Calendar';
import DetailedDailyAnalytics from './pages/Calendar/DetailedDailyAnalytics';
import MyHungerAnalytics from './pages/Calendar/MyHungerAnalytics';


function App() {
  const location = useLocation();

  const showHeader = location.pathname === '/home' || location.pathname === '/mypage' || location.pathname.startsWith('/test')  || location.pathname.startsWith('/result') || location.pathname === '/meal' || location.pathname === '/post' || location.pathname.startsWith('/edit') || location.pathname === "/notice" || location.pathname === "/calendar" || location.pathname.startsWith("/detailedanalytics") || location.pathname === "/myhungeranalytics";
  const showFooter = location.pathname === '/home' || location.pathname === '/mypage' || location.pathname === '/test' || location.pathname === '/meal' || location.pathname === '/post' || location.pathname.startsWith('/edit') || location.pathname === "/notice" || location.pathname === "/calendar" || location.pathname.startsWith("/detailedanalytics") || location.pathname === "/myhungeranalytics";

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/home" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signupcomplete' element={<SignUpComplete />} />
        <Route path='/resetpassword' element={<ResetPwd />} />
        <Route path="/findid" element={<FindId />} />
        <Route path='/viewuserid' element={<ViewUserId />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path="/test" element={<TestMain />} />
        <Route path="/test/:activeType" element={<TestQna />} />
        <Route path="/result/:activeType/:testResult" element={<TestResult />} />
        <Route path="/meal" element={<MealHome />} />
        <Route path="/post" element={<MealPost />} />
        <Route path="/edit/:id" element={<MealEdit />} />
        <Route path="/notice" element={<Notice />} />
        <Route path='/calendar' element={<Calendar />} />
        {/* DetailedDailyAnalytics는 캘린더에서 일을 클릭했을 때 이동하는 페이지 */}
        <Route path='/detailedanalytics/:date' element={<DetailedDailyAnalytics />} />
        <Route path='/myhungeranalytics' element = {<MyHungerAnalytics />} />
        <Route element={<ProtectedRoute />}>
        {/* 밑의 path는 로그인이 필요한 페이지들(홈, 마이페이지, 등등)을 넣어야 합니다. 밑의 path는 예시 */}
          <Route path='shouldbedeleted' element={<DeletePls />} />
        </Route>
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default App;