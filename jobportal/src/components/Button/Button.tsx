import "./Button.scss";
import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate();
  function logIn() {
    navigate("/home");
  }

  return <button onClick={logIn}>Log In</button>;
}
