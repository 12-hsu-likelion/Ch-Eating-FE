import { useEffect, useState } from "react";
import styled from "styled-components";
import ItemNotice from "./item-notice";
import axios from "axios";

const ListContainer = styled.div`
    width: 100%;
    margin-bottom: 6.9rem;
`

// 보라색 색상 기준은 모르겠어서 나중에 추가해놓겠습니다.
const ListNotice = () => {
    const [notice, setNotice] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setNotice(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <ListContainer>
            {notice.map(notice => (
                <ItemNotice key={notice.id} date={notice.name} />
            ))}
        </ListContainer>
    )
}

export default ListNotice;
