import { Route, Switch } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Habitos from "../pages/Habitos";
import Historico from "../pages/Historico";
import Hoje from "../pages/Hoje";

const Authenticated = () => (
    <>  
        <Header />
        <Footer />
        <Switch>
            <Route path="/habitos" exact component={Habitos} />
            <Route path="/historico" exact component={Historico} />
            <Route path="/hoje" exact component={Hoje} />
        </Switch>
        
    </>
);

export default Authenticated;