import Banner from "../../components/Home/Banner/Banner";
import Calender from "../../components/Home/Calender/Calender";
import Time from "../../components/Home/Time/Time";
import Meal from "../../components/Home/Meal/Meal";

const Home = () => {
    return (
        <div className="pageContainer" style={{marginBottom: "10.1rem"}}>
            <Banner />
            <Calender />
            <Time />
            <Meal />
        </div>
    )
}

export default Home;