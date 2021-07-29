import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/users/auth", {
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
    axios.put("http://localhost:3001/users/logout", {
        accessToken: localStorage.getItem("accessToken")
    }).then(() => {
      localStorage.removeItem("accessToken");
      window.location.reload();
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router forceRefresh={true}>
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
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
