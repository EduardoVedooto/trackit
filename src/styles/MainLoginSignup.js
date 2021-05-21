import styled from 'styled-components';

const Main = styled.main`
    background-color: #E5E5E5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    a {
        margin-top: 25px;
        color: #52B6FF;
        text-decoration: underline;
        font-size: 14px;
        visibility: ${props => !props.isLoading ? "default" : "hidden"}
    }

    & > div {
        color: #e75766;
        margin: 10px 0;
        height: 16px;
    }

    
`;

export default Main;