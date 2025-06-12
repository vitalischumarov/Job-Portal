import "./Login.scss";
import { Link } from "react-router";
import { supabase } from "../../supabase-client ";
import { useState } from "react";
import Home from "../Home/Home";

export default function LogIn() {
  const [email, setEmail] = useState("vitali@ccc.ch");
  const [password, setPassword] = useState("123456789");
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  const [sessionUser, setSessionUser] = useState<string>("");

  async function login() {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(`error-message: ${error}`);
      return;
    }
    if (data) {
      console.log(data.user.email);
      setSessionUser(String(data.user.email));
      setIsLogedIn(true);
    }
  }

  function logOut() {
    setIsLogedIn(false);
  }

  function typeEmailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function typePasswordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  if (!isLogedIn) {
    return (
      <div className="app">
        <div className="login_app">
          <h1>LOGIN</h1>
          <div className="login_details">
            <span className="login_text">E-Mail Adresse</span>
            <input
              value={email}
              placeholder="Email"
              onChange={typeEmailHandler}
              type="email"
              className="login_input"
            />
            <span className="login_text">Passwort</span>
            <input
              value={password}
              placeholder="Passwort"
              onChange={typePasswordHandler}
              type="password"
              className="login_input"
            />
            <button onClick={login} className="login_btn">
              LOG IN
            </button>
            <Link to={"/registrieren"} className="signup-link">
              <span className="login_link">Noch kein Konto? Registrieren</span>
            </Link>
            <Link to={"/jobsOverview"}>
              {" "}
              <span className="login_link">weiter zu den Jobs</span>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <Home logout={logOut} user={sessionUser}></Home>;
  }
}
