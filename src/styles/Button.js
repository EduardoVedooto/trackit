import styled from "styled-components";

const Button = styled.button`
    background-color: #52B6FF;
    color: #FFF;
    width: 100%;
    height: 45px;
    margin-top: 2.5px;
    border-radius: 5px;
    border: none;
    font-size: 20px;
    outline: none;
    cursor: ${props => props.isLoading ? "not-allowed" : "pointer"};
    opacity: ${props => props.isActive ? !props.isLoading? "1" : ".4" : ".4"};
    pointer-events: ${props => props.isActive ? "default" : "none"};

    span{
        display: ${props => props.isLoading ? "none" : "default"}
    }
    svg{
        display: ${props => props.isLoading ? "default" : "none"}
    }
`;

export default Button;