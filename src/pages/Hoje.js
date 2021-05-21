import dayjs from "dayjs";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import Loading from "../components/Loading";
import TodayHabitComponent from "../components/TodayHabitComponent";
import ProgressContext from "../contexts/ProgressContext";
import CalculatePercentage from "../utils/CalculatePercentage";

const Hoje = () => {
    require("dayjs/locale/pt-br");
    dayjs.locale("pt-br");
    const { profile } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [waitingServer, SetWaitingServer] = useState(true);
    const { progress, setProgress } = useContext(ProgressContext);
    
    useEffect(() => {
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
                Authorization: `Bearer ${profile.token}`
            }
        });
        promisse.then(({data}) => {
            SetWaitingServer(false);
            setProgress(CalculatePercentage(data));
            setHabits(data);
        });
        promisse.catch(({data}) => console.log(data));
    }, [profile.token]); //eslint-disable-line

    function handleSelection(id, done){
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/${done ? "uncheck" : "check"}`, id, {
            headers: {
                Authorization: `Bearer ${profile.token}`
            }
        });
        promisse.then(updateList);
        promisse.catch(response => console.log(response));
    }

    function updateList(){
        const update = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
                Authorization: `Bearer ${profile.token}`
            }
        });
        update.then(({data}) => {
            setHabits(data);
            setProgress(CalculatePercentage(data));
        });
        update.catch(response => console.log(response));
        
    }

    if(waitingServer) return <Loading />
    
    return(
        <HojeContainer>
            <Title progress={progress}>
                <h2>
                    {dayjs().format("dddd")}, {dayjs().format("D/MM")}
                </h2>
                    {progress ? // Se progress === 0 não foi realizado nenhum hábito
                        <span>{progress}% dos hábitos concluídos</span> 
                    : 
                        <span>Nenhum hábito concluído ainda</span>
                    }
            </Title>
            {habits.map(habit => <TodayHabitComponent key={habit.id} handleSelection={handleSelection} habit={habit}/>) }
        </HojeContainer>
    );
}
 
const HojeContainer = styled.main`
    background-color: #E5E5E5;
    height: 100%;
    padding: 70px 15px 110px 15px;
`;

const Title = styled.div`
    margin: 25px 0;

    h2{
        color: #126BA5;
        font-size: 22px;
        margin-bottom: 5px;
    }
    span{
        font-size: 18px;
        color: ${props => props.progress ? "#8FC549" : "#BABABA"};
    }
    
`;

export default Hoje;