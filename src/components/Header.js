import styled from "styled-components";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const Header = () => {
    const { image, name } = useContext(UserContext).profile;
    return(
        <HeaderComponent>
            <h1>TrackIt</h1>
            <img src={image} title={name} alt={`Imagem do perfil de ${name}`}/>
        </HeaderComponent>
    );
}

const HeaderComponent = styled.header`
    background-color: #126ba5;
    height: 70px;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0 4px 4px rgba(0,0,0,.15);
    z-index: 10;

    h1 {
        color: #fff;
        font-size: 40px;
        font-family: 'Playball', cursive;
    }

    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }
`;

export default Header;