import { useContext } from "react";
import UserContext from "../contexts/UserContext";


const Habitos = () => {
    const { profile } = useContext(UserContext);
    console.log(profile);    
    return(
        <>
            <h1>OLÁ MUNDO!</h1>
        </>
    );
}

export default Habitos;