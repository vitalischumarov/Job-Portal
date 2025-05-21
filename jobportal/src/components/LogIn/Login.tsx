import "./Login.scss";
import Button from "../Button/Button";
import InputField from "../InputField/InputField";

export default function LogIn() {
  return (
    <div className="app">
      <Button></Button>
      <InputField textForPlaceholder="E-Mail"></InputField>
      <InputField textForPlaceholder="Password"></InputField>
    </div>
  );
}
