import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { BsFillPlusSquareFill } from "react-icons/bs";
import NewHabit from "../components/NewHabit";
import HabitComponent from "../components/HabitComponent";
import axios from "axios";
import Loading from "../components/Loading";
import ProgressContext from "../contexts/ProgressContext";
import CalculatePercentage from "../utils/CalculatePercentage";

const Habitos = () => {
    const { setProgress } = useContext(ProgressContext);
    const { profile } = useContext(UserContext);
    const [newHabit, setNewHabit] = useState(false);
    const [habitsList, setHabitsList] = useState([]);
    const [waitingServer, SetWaitingServer] = useState(true);

    useEffect(() => {
        updateProgressBar();
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            headers: {
                Authorization: `Bearer ${profile.token}`
            }
        });
        promisse.then(({data}) => {
            SetWaitingServer(false);
            setHabitsList(data);
        });
        promisse.catch( error => window.alert(error.response.data.message));
    }, [profile.token]); //eslint-disable-line
 
    function updateProgressBar() { 
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
            headers: {
                Authorization: `Bearer ${profile.token}`
            }
        });
        promisse.then(({data}) => setProgress(CalculatePercentage(data)));
        promisse.catch(error => window.alert(error.response.data.message));
    }

    function handleNewHabit() {
        return newHabit ? null : setNewHabit(true); // Faz a <div> de criação de hábitos aparecer. Se ela já estiver aberta, não faz nada
    }

    if(waitingServer) return <Loading />;
    
    return(
        <HabitosContainer>
            <div id="title">
                <h2>Meus hábitos</h2>
                <BsFillPlusSquareFill onClick={handleNewHabit}/>
            </div>
            <NewHabit displayForm={{newHabit, setNewHabit}} token={profile.token} updateProgressBar={updateProgressBar} updateHabits={setHabitsList}/>
            {habitsList.length ? 
                habitsList.map( habit => 
                    <HabitComponent updateProgressBar={updateProgressBar} updateHabits={setHabitsList} id={habit.id} token={profile.token} key={habit.id} title={habit.name} days={habit.days}/>
                ).reverse()
            :
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            }
        </HabitosContainer>
    );
}
 
const HabitosContainer = styled.main`
    padding: 70px 20px 110px 20px;
    height: 100%;
    min-height: 100vh;
    background-color: #E5E5E5;

    div#title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 25px 0;
        
        h2{
            color: #126ba5;
            font-size: 24px;
        }
        svg {
            color: #52B6FF;
            height: 35px;
            width: 35px;
        }
    }

    p {
        color: #666666;
        font-size: 18px;

    }
`;

export default Habitos;
