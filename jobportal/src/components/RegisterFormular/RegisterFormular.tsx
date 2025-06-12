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
      navigate(`/newCompany/${emailName}`);
    }
  }

  return (
    <div className="registration_container">
      <div className="registration_form">
        <h1 className="registration_title">Account erstellen</h1>
        <div className="registration_field">
          <span className="registration_text">E-Mail Adresse:</span>
          <input
            type="email"
            value={email}
            onChange={typeEmailHandler}
            placeholder="beispiel@email.com"
            className="registration_input"
          />
          <span className="registration_text">Passwort:</span>
          <input
            type="password"
            value={password}
            onChange={typePasswordHandler}
            placeholder="Mindestens 8 Zeichen"
            className="registration_input"
          />
          <button onClick={inputValidation} className="registration_btn">
            Registrieren
          </button>{" "}
          <Link to="/" className="login-link">
            Bereits registriert? Zum Login
          </Link>
        </div>
      </div>
    </div>
  );
}
