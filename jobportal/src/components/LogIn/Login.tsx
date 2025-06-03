import "./Login.scss";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function LogIn() {
  const [springBoot, setSpringBoot] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/demo/message")
      .then((response) => response.text())
      .then((data) => setSpringBoot(data));
  }, []);

  return (
    <div className="app">
      <Button></Button>
      <InputField textForPlaceholder="E-Mail"></InputField>
      <InputField textForPlaceholder="Password"></InputField>
      <Link to={"./jobsOverview"}>weiter als Bewerber</Link>
      <Link to={"/registrieren"}>Sign up</Link>
      <h4>{springBoot}</h4>
    </div>
  );
}
