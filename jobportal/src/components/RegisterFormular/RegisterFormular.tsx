import { useState } from "react";
import { supabase } from "../../supabase-client ";

export default function RegisterFormular() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function typeEmailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function typePasswordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function signUp() {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log(`error: ${error}`);
    }
    if (data) {
      console.log("successfully registered");
      setEmail("");
      setPassword("");
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
      <button onClick={signUp}>Sign up</button>
    </div>
  );
}
