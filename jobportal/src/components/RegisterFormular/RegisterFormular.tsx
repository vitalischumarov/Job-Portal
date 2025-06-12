import "./RegisterFormular.scss";
import { useState } from "react";
import { supabase } from "../../supabase-client ";
import { useNavigate } from "react-router";
import { Link } from "react-router";

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
    <div className="registration-container">
      <div className="registration-form">
        <h1>Account erstellen</h1>

        <h2>E-Mail Adresse:</h2>
        <input
          type="email"
          value={email}
          onChange={typeEmailHandler}
          placeholder="beispiel@email.com"
        />

        <h2>Passwort:</h2>
        <input
          type="password"
          value={password}
          onChange={typePasswordHandler}
          placeholder="Mindestens 8 Zeichen"
        />

        <button onClick={inputValidation}>Registrieren</button>
        <Link to="/" className="login-link">
          Bereits registriert? Zum Login
        </Link>
      </div>
    </div>
  );
}
