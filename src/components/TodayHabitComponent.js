import styled from "styled-components";
import { HiCheck } from "react-icons/hi";

const TodayHabitComponent = ({habit, handleSelection}) => (
    <HabitContainer onClick={() => handleSelection(habit.id, habit.done)} isDone={habit.done} isRecord={habit.currentSequence === habit.highestSequence} >
        <h3>{habit.name}</h3>
        <span>Sequência atual: <em>{habit.currentSequence} dias</em></span>
        <span>Seu recorde: <Record>{habit.highestSequence} dias</Record></span>
        <HiCheck />
    </HabitContainer>
);


const HabitContainer = styled.div`
    background-color: #fff;
    border-radius: 5px;
    color: #666;
    display: flex;
    flex-direction: column;
    padding: 13px 90px 13px 13px;
    gap: 5px;
    position: relative;
    margin-bottom: 10px;

    h3 {
        font-size: 20px;
        margin-bottom: 10px;
    }
    span {
        font-size: 13px;

        em {
            color: ${props => props.isDone ? "#8FC549" : "inherit"}
        }
    }

    svg{
        background-color: ${props => props.isDone ? "#8FC549" : "#EBEBEB"};
        color: #fff;
        position: absolute;
        height: 70px;
        width: 70px;
        right: 10px;
        bottom: 0;
        margin: auto 0;
        top: 0;
        border-radius: 5px;
    }
`;

const Record = styled.em`
    color: ${props => props.isRecord ? "#8FC549" : "#EBEBEB"};
`;

export default TodayHabitComponent;