import Banner from "../../components/Home/Banner/Banner";
import Calender from "../../components/Home/Calender/Calender";
import Time from "../../components/Home/Time/Time";

const Home = () => {
    return (
        <div className="pageContainer">
            <Banner />
            <Calender />
            <Time />
        </div>
    )
}

export default Home;