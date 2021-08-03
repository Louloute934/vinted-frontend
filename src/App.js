import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Payment from "./containers/Payment";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Publish from "./containers/Publish";
import Cookies from "js-cookie";
import Success from "./containers/Success";

import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 3 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer userToken={userToken} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish userToken={userToken} setUser={setUser} />
        </Route>
        <Route path="/payment">
          <Payment userToken={userToken} />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/">
          <Home setUser={setUser} userToken={userToken} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
