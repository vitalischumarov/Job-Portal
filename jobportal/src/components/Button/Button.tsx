import "./Button.scss";
import { Link } from "react-router-dom";

export default function Button() {
  return <Link to={"/home"}>Log In</Link>;
}
