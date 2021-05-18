import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" exact component={Signup} />
        </Switch>
      </BrowserRouter>
      
    </>
  );
}

export default App;