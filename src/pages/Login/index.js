import Main from "./styles";
import logo from "../../assets/images/logo.svg";
import InputWrapper from "../../styles/InputWrapper";
import { Link } from "react-router-dom";

const Login = () => {
    return(
        <Main>
            <img src={logo} alt="Logo Trackit"/>
            <InputWrapper>
                <input name="email" type="email" placeholder="email" required/>
                <input name="senha" type="password" placeholder="senha" required/>
                <button type="submit">Submit</button>
            </InputWrapper>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
        </Main>
    );
}

export default Login;