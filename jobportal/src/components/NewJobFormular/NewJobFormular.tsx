import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NewJobFormular() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);

  function typeTitleHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function typeDescriptionHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function typeSalaryHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSalary(Number(event.target.value));
  }

  function saveTheTask() {
    console.log("saved");
    navigate("/home");
  }

  return (
    <div>
      <Link to={"/home"}>Back</Link>
      <h3>Title of the job:</h3>
      <input
        type="text"
        placeholder="title..."
        name="title"
        value={title}
        onChange={typeTitleHandler}
      />
      <h3>Jobdescription:</h3>
      <input
        type="text"
        placeholder="describe the job..."
        name="description"
        value={description}
        onChange={typeDescriptionHandler}
      />
      <h3>What will the salary be:</h3>
      <input
        type="number"
        name="salary"
        value={salary}
        onChange={typeSalaryHandler}
      />{" "}
      <span>CHF</span>
      <br></br>
      <button onClick={saveTheTask}>save</button>
    </div>
  );
}
