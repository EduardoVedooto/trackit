import Main from "../styles/MainLoginSignup";
import logo from "../assets/images/logo.svg";
import Form from "../styles/Form";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import Button from "../styles/Button";


const Signup = () => {
    const history = useHistory();
    const emailValidation = /\S+@\S+\.\S+/; // eslint-disable-line
    const URLValidation = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // eslint-disable-line
    const [activateButton, setActivateButton] = useState(false);
    const [waitingServer, setWaitingServer] = useState(false);
    const [newUser, setNewUser] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        if(name === "email" ){
            newUser.email = value;
            setNewUser({...newUser});
        }
        else if(name === "senha" ){
            newUser.password = value;
            setNewUser({...newUser});
        }
        else if(name === "nome" ){
            newUser.name = value;
            setNewUser({...newUser});
        }
        else if(name === "foto" ){
            newUser.image = value;
            setNewUser({...newUser});
        }
        validate();
    }

    function validate() {
        const { email, password, name, image } = newUser;
        if(email && password && name && image) {
            if(!emailValidation.test(email)  ||
               password.length < 6          ||
               !name.trim()                 ||
               !URLValidation.test(newUser.image)
            ){
                setActivateButton(false);
            } else {
                setActivateButton(true);
            }
        } else {
            setActivateButton(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setWaitingServer(true);
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", newUser);
        promisse.then(() => {
            history.push("/");
            setWaitingServer(false);
            setActivateButton(true);
        });
        promisse.catch(e => console.log(e));
    }

    return(
        <Main isLoading={waitingServer}>
            <img src={logo} alt="Logo Trackit"/>
            <Form onSubmit={handleSubmit} isButtonActive={activateButton} waitingServer={waitingServer}>
                <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={newUser.email}
                    onChange={handleChange} 
                    disabled={waitingServer}
                    required
                />
                <input 
                    name="senha" 
                    type="password"
                    placeholder="Senha" 
                    value={newUser.password}
                    onChange={handleChange}
                    disabled={waitingServer}
                    required 
                />
                <input 
                    name="nome" 
                    type="text" 
                    placeholder="Nome" 
                    value={newUser.name}
                    onChange={handleChange}
                    disabled={waitingServer}
                    required 
                />
                <input 
                    name="foto" 
                    type="url" 
                    placeholder="Foto do perfil" 
                    value={newUser.image}
                    onChange={handleChange}
                    disabled={waitingServer}
                    required 
                />
                <Button isActive={activateButton} isLoading={waitingServer}>
                    <span>Cadastrar</span>
                    <Loader 
                        type="ThreeDots"
                        width="70px"
                        height="40px"
                        color="#fff"
                    />
                </Button>
            </Form>
            <Link to="/" >Já tem uma conta? Faça login</Link>
        </Main>
    );
}

export default Signup;