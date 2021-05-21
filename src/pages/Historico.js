import styled from "styled-components";

const Historico = () => {
    return(
        <HistoricoContainer>
            <h2>Histórico</h2>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </HistoricoContainer>
    );
}

const HistoricoContainer = styled.main`
    padding: 70px 15px;
    background-color: #E5E5E5;
    height: 100vh;

    h2 {
        color: #126BA5;
        font-size: 22px;
        margin: 28px 0 20px 0;
    }
    p {
        color: #666;
        font-size: 18px;
    }
`;

export default Historico;