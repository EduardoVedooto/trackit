import { useContext } from "react";
import Header from "../components/Header";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import Footer from "../components/Footer";


const Habitos = () => {
    const { profile } = useContext(UserContext);
    console.log(profile);    
    return(
        <HabitosContainer>
            <Header />
            <h1>OLÁ MUNDO!</h1>
            <Footer />
        </HabitosContainer>
    );
}

const HabitosContainer = styled.main`
    padding: 70px 0;
    height: 100vh; //LEMBRAR DE ARRUMAR AQUI DEPOIS
    background-color: #E5E5E5;
`;

export default Habitos;