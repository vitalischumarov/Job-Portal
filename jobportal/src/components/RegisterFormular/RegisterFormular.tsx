import { useState } from "react";
import { supabase } from "../../supabase-client ";
import { useNavigate } from "react-router";

export default function RegisterFormular() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  function typeEmailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function typePasswordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function inputValidation() {
    if (email === "" || password === "") {
      return;
    } else {
      signUp();
    }
  }

  async function signUp() {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(`error: ${error}`);
      return;
    }
    if (data) {
      const emailName = email;
      setEmail("");
      setPassword("");
      navigate(`/newCompany/${emailName}`); //hier muss ich die E-Mail adresse uebergeben.
    }
  }

  return (
    <div>
      <h2>E-Mail Adresse:</h2>
      <input type="text" value={email} onChange={typeEmailHandler}></input>
      <h2>Password:</h2>
      <input
        type="password"
        value={password}
        onChange={typePasswordHandler}
      ></input>
      <button onClick={inputValidation}>Sign up</button>
    </div>
  );
}
