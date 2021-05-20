import { Link } from "react-router-dom";
import styled from "styled-components"; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Footer = () => {
    return(
        <FooterContainer>
            <Link to="/habitos">Hábitos</Link>
            <Link to="/hoje">
                <CircularProgressbar
                    value="68"
                    text="Hoje"
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#3e98c7",
                        textColor: "#fff",
                        pathColor: "#fff",
                        trailColor: "transparent"
                    })}
                />
            </Link>
            <Link to="/historico">Histórico</Link>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;

    a {
        color: #52B6FF;
        font-size: 18px;
    }
    svg {
        width: 91px;
        height: 91px;
        margin-bottom: 45px;
        box-shadow: 0 0 10px rgba(0,0,0,.4);
        border-radius: 50%;
    }
`;


export default Footer;