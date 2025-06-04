import "./Login.scss";
import { Link } from "react-router";
import { supabase } from "../../supabase-client ";
import { useState } from "react";
import Home from "../Home/Home";

export default function LogIn() {
  const [email, setEmail] = useState("vitali@ccc.ch");
  const [password, setPassword] = useState("123456789");
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  const [sessionUser, setSessionUser] = useState<String>("");

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
        <input
          value={email}
          placeholder="email"
          onChange={typeEmailHandler}
        ></input>
        <input
          value={password}
          placeholder="password"
          onChange={typePasswordHandler}
        ></input>
        <button onClick={login}>Login</button>
        <Link to={"/registrieren"}>Sign up</Link>
      </div>
    );
  } else {
    return <Home logout={logOut} user={sessionUser}></Home>;
  }
}
