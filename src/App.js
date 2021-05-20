import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "./styles/globalStyles";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContext from "./contexts/UserContext";
import Authenticated from "./routes/Authenticated";

const App = () => {
  const [profile, setProfile] = useState(null);
  const data = {profile, setProfile};

  return (
    <UserContext.Provider value={data}>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" exact component={Signup} />
          <Route component={Authenticated} />
        </Switch>
      </BrowserRouter>
      
    </UserContext.Provider>
  );
}

export default App;