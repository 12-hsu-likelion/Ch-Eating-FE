import styled from "styled-components";
import ItemEat from "./item-eat";

const ListEatContainer = styled.div`
    width: 85%;
    margin-top: 0.9rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
`

const ListEat = ({eat}) => {
    return (
        <div className="pageContainer" style={{display: "flex", justifyContent: "center"}}>
            <ListEatContainer>
                {eat.map((item, index) => (
                    <ItemEat 
                        key={index} 
                        title={item.name} 
                        sub={item.username}

                    />
                ))}
            </ListEatContainer>
        </div>
    )
}

export default ListEat;