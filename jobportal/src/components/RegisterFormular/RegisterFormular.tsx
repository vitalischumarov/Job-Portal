import { useState } from "react";

export default function RegisterFormular() {
  const [email, setEmail] = useState<string>("");
  const [passwort, setPassword] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [employees, setEmployees] = useState<string>("0");

  function typeEmailHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function typePasswordHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function typeCompanyNameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCompanyName(event.target.value);
  }

  function typeDescriptionHandler(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setDescription(event.target.value);
  }

  function typeEmployeesHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setEmployees(event.target.value);
  }

  return (
    <div>
      <h2>E-Mail Adresse:</h2>
      <input type="text" value={email} onChange={typeEmailHandler}></input>
      <h2>Password:</h2>
      <input
        type="password"
        value={passwort}
        onChange={typePasswordHandler}
      ></input>
      <h2>Organisation name:</h2>
      <input
        type="text"
        value={companyName}
        onChange={typeCompanyNameHandler}
      ></input>
      <h2>Description:</h2>
      <textarea
        placeholder="What does your organisation do?"
        value={description}
        onChange={typeDescriptionHandler}
      ></textarea>
      <h2>Number of employees:</h2>
      <input
        type="number"
        value={employees}
        onChange={typeEmployeesHandler}
      ></input>
      <button>Sign up</button>
    </div>
  );
}
