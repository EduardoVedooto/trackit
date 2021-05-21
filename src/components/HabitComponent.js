import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import axios from "axios";

const HabitComponent = ({token, title, days, id, updateHabits}) => {
    const weekdays = ['D','S','T','Q','Q','S','S'];

    function handleDelete() {
        if(window.confirm("Deseja deletar o hábito")){
            const promisse = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            promisse.then(() => {
                const update = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                update.then(({data}) => updateHabits(data));
            });
        }
    }

    return(
        <HabitContainer>
            <h3>{title}</h3>
            <ol>
                {weekdays.map( (weekday, index) => {
                    
                    return(
                        <Day isSelected={days.includes(index) ? true : false} key={index}>
                            <span>{weekday}</span>
                        </Day>
                )})}
            </ol>
            <BiTrash onClick={handleDelete}/>
            
        </HabitContainer>
    );
}

const HabitContainer = styled.div`
    background-color: #fff;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 18px 40px 18px 18px;
    margin-bottom: 10px;

    h3 {
        color: #666;
        margin-bottom: 10px;
        word-break: break-word;
        font-size: 20px;
    }

    ol {
        display: flex;
        gap: 3px;
    }

    svg {
        position: absolute;
        top: calc(50% - 30px/2);
        right: 10px;
        width: 25px;
        height: 30px;
        color: #666;
        
        border-radius: 4px;
    }
`;

const Day = styled.li`
    color: ${props => props.isSelected ? "#fff" : "#dbdbdb"};
    background-color: ${props => props.isSelected ? "#CFCFCF" : "#fff"};
    border: 1px solid #d4d4d4;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 5px;
`;

export default HabitComponent;