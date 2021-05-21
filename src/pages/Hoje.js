import dayjs from "dayjs";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import Loading from "../components/Loading";
import TodayHabitComponent from "../components/TodayHabitComponent";
import ProgressContext from "../contexts/ProgressContext";

const Hoje = () => {
    require("dayjs/locale/pt-br");
    dayjs.locale("pt-br");
    const { profile } = useContext(UserContext);
    const [habits, setHabits] = useState([]);
    const [waitingServer, SetWaitingServer] = useState(true);
    // const [percentage, setPercentage] = useState(0);
    const { progress, setProgress } = useContext(ProgressContext);
    
    useEffect(() => {
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
                Authorization: `Bearer ${profile.token}`
            }
        });
        promisse.then(({data}) => {
            SetWaitingServer(false);
            setHabits(data);
        });
        promisse.catch(({data}) => console.log(data));
    }, [profile.token]);

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
            completionPercentage(data);
        });
        update.catch(response => console.log(response));
        
    }

    function completionPercentage(habits){
        setProgress(Math.round((habits.reduce((sum, habit) => habit.done ? sum+=1 : sum, 0)/habits.length)*100));
        /* 
         * Explicando a equação: primeiramente é feito reduce para somar todas os hábitos que foram finalizados
         * Após isso, é dividido pelo número total de hábitos, chegando na porcentagem (decimal) de hábitos concluídos
         * Após isso, este valor é multiplicado por 100 e arrendondado para o número inteiro mais próximo, chegando assim no valor inteiro
         */ 
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
    height: 100vh;
    padding: 70px 15px;
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