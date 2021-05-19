import { Link } from "react-router-dom";
import styled from "styled-components"; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Footer = () => {
    return(
        <FooterContainer>
            <Link to="#">Hábitos</Link>
            <Link to="#">
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
            <Link to="#">Histórico</Link>
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
    }
`;


export default Footer;