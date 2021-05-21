import Main from "../styles/MainLoginSignup";
import logo from "../assets/images/logo.svg";
import Form from "../styles/Form";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Button from "../styles/Button";
import Loader from "react-loader-spinner";
import axios from "axios";
import UserContext from "../contexts/UserContext";

const Login = () => {
    const history = useHistory();
    const { setProfile } = useContext(UserContext);
    const emailValidation = /\S+@\S+\.\S+/; // eslint-disable-line
    const [activateButton, setActivateButton] = useState(false); // Boolean que ativa/desativa o button
    const [waitingServer, setWaitingServer] = useState(false); // Boolean que ativa/desativa o loading do button
    const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro caso o usuário digite algum campo errado
    const [user, setUser] = useState({ // Objeto utilizado para requisição do servidor
        email: "",
        password: ""
    });

    useEffect(() => {
        if(localStorage.length) {
            user.email = JSON.parse(localStorage.user).email;
            user.password = JSON.parse(localStorage.user).password
            handleSubmit();
        }
    }, []); //eslint-disable-line


    function handleChange(e) {
        const { name, value } = e.target;
        if(name === "email"){
            user.email = value;
            setUser({...user});
        } else {
            user.password = value;
            setUser({...user});
        }
        validate();
    }

    function validate() {
        if( user.email && emailValidation.test(user.email) && user.password.length >= 6 ) {
            setActivateButton(true);
        } else {
            setActivateButton(false);
        }
    }

    function handleSubmit(e) {
        if(e) e.preventDefault();
        setWaitingServer(true);
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", user);
        promisse.then(({data}) => {
            setWaitingServer(false);
            if(!localStorage.length) localStorage.setItem("user", JSON.stringify(user));
            setProfile(data);
            history.push("/habitos");
        });
        promisse.catch( error => {
            setWaitingServer(false);
            if(error.response.status === 422) {
                setErrorMessage("Email digitado inválido");
            } else {
                setErrorMessage(error.response.data.message);
            }
            
        });
    }

    return(
        <Main isLoading={waitingServer} error={errorMessage.length > 0}>
            <img src={logo} alt="Logo Trackit"/>
            <div><h2>{errorMessage}</h2></div>
            <Form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={user.email}
                    onChange={handleChange}
                    onFocus={() => setErrorMessage("")}
                    disabled={waitingServer}
                    required
                />
                <input 
                    name="senha" 
                    type="password"
                    placeholder="Senha" 
                    value={user.password}
                    onChange={handleChange}
                    onFocus={() => setErrorMessage("")}
                    disabled={waitingServer}
                    required 
                />
                <Button type="submit" isActive={activateButton} isLoading={waitingServer} >
                    <span>Cadastrar</span>
                    <Loader 
                        type="ThreeDots"
                        width="70px"
                        height="40px"
                        color="#fff"
                    />
                </Button>
            </Form>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
        </Main>
    );
}

export default Login;