import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import axios from "axios";
import NoticeNot from "../../components/Notice/NoticeNot/NoticeNot";
import ListNotice from "../../components/Notice/NoticeYes/list-notice";

const NoticeContainer = styled.div`
    width: 100%;
    padding-top: 8.6rem;
`

const NoticeP = styled.p`
    font-size: 1.2rem;
    color: ${colors.gray5};
    margin-left: 1.6rem;
`

const NoticeBar = styled.div`
    width: 100%;
    height: 0.1rem;
    border: none;
    background-color: ${colors.gray3};
    margin-top: 0.8rem;
`

const Notice = () => {
    const [data, setData] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setData(response.data.length > 0);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="pageContainer">
            <NoticeContainer>
                <NoticeP>내 알림</NoticeP>
                <NoticeBar />

                {data ? <ListNotice /> : <NoticeNot />}
            </NoticeContainer>
        </div>
    )
}

export default Notice;