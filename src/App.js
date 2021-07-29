import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get("https://itransition-summer-task4.herokuapp.com/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  const logOut = () => {
    axios.put("https://itransition-summer-task4.herokuapp.com/users/logout", {
        accessToken: localStorage.getItem("accessToken")
    }).then(() => {
      localStorage.removeItem("accessToken");
      window.location.reload();
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className="navBar">
            <Link to="/"> Main Page</Link>
            {!authState ? (
                <>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Log In</Link>
                </>
              ) : (
                <button onClick={logOut}> Log Out</button>
            )}
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
