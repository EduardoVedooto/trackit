import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { BsFillPlusSquareFill } from "react-icons/bs";
import NewHabit from "../components/NewHabit";
import HabitComponent from "../components/HabitComponent";
import axios from "axios";
import Loading from "../components/Loading";

const Habitos = () => {
    const { profile } = useContext(UserContext);
    const [newHabit, setNewHabit] = useState(false);
    const [habitsList, setHabitsList] = useState([]);
    const [waitingServer, SetWaitingServer] = useState(true);

    useEffect(() => {
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            headers: {
                Authorization: `Bearer ${profile.token}`
            }
        });
        promisse.then(({data}) => {
            SetWaitingServer(false);
            setHabitsList(data);
        });
        promisse.catch( response => console.log(response.data));
    }, []);    

    function handleNewHabit() {
        return newHabit ? null : setNewHabit(true);
    }

    if(waitingServer) {
        return(<Loading />);
    }

    return(
        <HabitosContainer>
            <div id="title">
                <h2>Meus hábitos</h2>
                <BsFillPlusSquareFill onClick={handleNewHabit}/>
            </div>
            <NewHabit displayForm={{newHabit, setNewHabit}} token={profile.token} updateHabits={setHabitsList}/>
            {habitsList.length ? 
                habitsList.map( habit => 
                    <HabitComponent updateHabits={setHabitsList} id={habit.id} token={profile.token} key={habit.id} title={habit.name} days={habit.days}/>
                )
            :
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            }
        </HabitosContainer>
    );
}
 
const HabitosContainer = styled.main`
    padding: 70px 20px;
    height: 100vh; //LEMBRAR DE ARRUMAR AQUI DEPOIS
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