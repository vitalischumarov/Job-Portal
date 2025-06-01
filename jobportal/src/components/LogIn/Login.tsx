import "./Login.scss";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";
import { Link } from "react-router";

export default function LogIn() {
  return (
    <div className="app">
      <Button></Button>
      <InputField textForPlaceholder="E-Mail"></InputField>
      <InputField textForPlaceholder="Password"></InputField>
      <Link to={"./jobsOverview"}>weiter als Bewerber</Link>
      <Link to={"/registrieren"}>Sign up</Link>
    </div>
  );
}
