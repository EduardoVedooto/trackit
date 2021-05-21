import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProgressContext from "../contexts/ProgressContext";
import Habitos from "../pages/Habitos";
import Historico from "../pages/Historico";
import Hoje from "../pages/Hoje";

const Authenticated = () => {
    const [progress, setProgress] = useState(0);
    return(
        <ProgressContext.Provider value={{progress, setProgress}}>  
            <Header />
            <Footer />
            <Switch>
                <Route path="/habitos" exact component={Habitos} />
                <Route path="/historico" exact component={Historico} />
                <Route path="/hoje" exact component={Hoje} />
            </Switch>
            
        </ProgressContext.Provider>
    );
}
export default Authenticated;