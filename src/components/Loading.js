import Loader from "react-loader-spinner";
import styled from "styled-components";

const Loading = () => (
    <LoadingScreen>
        <Loader type="Grid" color="#126ba5" height={140} width={140} />
        <h2>Carregando</h2>
    </LoadingScreen>
);

const LoadingScreen = styled.main`
    background-color: #E5E5E5;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 70px 0;
    height: 100vh;
    flex-direction: column;

    h2{
        font-size: 20px;
        margin-top: 20px;
        color: #126ba5;
    }
`;

export default Loading;