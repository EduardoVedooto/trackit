import axios from "axios";
import { useState } from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import Button from "../styles/Button";

const NewHabit = (props) => {
    const weekdays = ['D','S','T','Q','Q','S','S'];
    const {newHabit, setNewHabit} = props.displayForm;
    const [status, setStatus] = useState({
        isActive: false,
        isLoading: false
    })
    const [request, setRequest] = useState({
        name: "",
        days: []
    });

    function handleClose() {
        setNewHabit(false);
    }

    function handleChange(e) {
        request.name = e.target.value;
        setRequest({...request});
        inputVerification();
    }

    function handleCheck(e) {
        if(request.days.includes(Number(e.target.value))){
            request.days.splice(request.days.indexOf(Number(e.target.value)), 1);
            setRequest({...request});
        } else {
            request.days.push(Number(e.target.value));
            setRequest({...request});
        }
        inputVerification();
    }

    function handleSubmit(e) {
        e.preventDefault();
        status.isLoading = true;
        setStatus({...status});
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", request, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        });
        promisse.then(() => {
            setNewHabit(false);
            request.name = "";
            request.days = [];
            status.isLoading = false;
            status.isActive = false;
            setRequest({...request});
            setStatus({...status});
            updateHabitsList()
            props.updateProgressBar();
        });
        promisse.catch( error => {
            status.isLoading = false;
            status.isActive = false;
            setStatus({...status});
            console.log(error.response.data.message);
        });
    }

    function inputVerification() {
        if(request.name.length && request.days.length) {
            status.isActive = true;
            setStatus({...status});
        } else {
            status.isActive = false;
            setStatus({...status});
        }
    }

    function updateHabitsList() {
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        });
        promisse.then(({data}) => props.updateHabits(data));
        promisse.catch(error => window.alert(error.response.data.message));
    }

    

    return(
        <NewHabitContainer isLoading={status.isLoading} displayForm={newHabit} onSubmit={handleSubmit}>
            <input disabled={status.isLoading} id="titulo" placeholder="Nome do hábito" value={request.name} onChange={handleChange} required/>
            <ol>
                {weekdays.map( (weekday, index) => {
                    return(
                        <li key={index}>
                            <CheckBox className={request.days.includes(index)} isChecked={request.days.includes(index) ? true : false}>
                                {weekday}
                                <input required={request.days.length ? false : true} disabled={status.isLoading} type="checkbox" value={index} onChange={handleCheck}/>
                            </CheckBox>
                        </li>
                    )
                })}
            </ol>
            <div>
                <NewButton type="button" isActive={true} onClick={handleClose}>Cancelar</NewButton>
                <NewButton type="submit" isActive={status.isActive} isLoading={status.isLoading} >
                    <span>Salvar</span>
                    <Loader 
                        type="ThreeDots"
                        width="57px"
                        height="40px"
                        color="#fff"
                    />
                </NewButton>
            </div>

        </NewHabitContainer>
    );
}

const NewHabitContainer = styled.form`
    display: ${props => props.displayForm ? "flex" : "none"};
    background-color: #fff;
    width: 100%;
    height: 200px;
    border-radius: 5px;
    flex-direction: column;
    padding: 18px;
    margin-bottom: 25px;
    box-shadow: 0 0 4px rgba(0,0,0,.15);
    
    #titulo {
        background-color: #fff;
        color: ${props => props.isLoading ? "#bbbbbb" : "#666666"};
        width: 100%;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #d5d5d5;
        padding-left: 10px;
        margin: 0;
        font-size: 20px;
        outline: none;
        ::placeholder{
            color: #DBDBDB;
        }
    }

    ol {
        margin-top: 10px;
        display: flex;
        gap: 4px;

        label {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

    }
    div {
        display: flex;
        justify-content: flex-end;
        margin-top: auto;
        button:first-child{
            background: none;
            color: #52B6FF;
        }
    }
`;

const NewButton = styled(Button)`
    background-color: #52B6FF;
    width: auto;
    padding: 0 10px;
    margin-left: 10px;
`;

const CheckBox = styled.label`
    background-color: ${props => props.isChecked ? "#CFCFCF" : "#fff"};
    color: ${props => props.isChecked ? "#fff" :  "#666"};
    width: 30px;
    height: 30px;
    border-radius: 5px;
    font-size: 20px;
    outline: none;
    border: 1px solid #d5d5d5;
    border: 1px solid #d5d5d5;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
        display: none;
    }
`;

export default NewHabit;
