import { Link } from "react-router-dom";

export default function NewJobFormular() {
  return (
    <div>
      <Link to={"/home"}>Back</Link>
      <h3>Title of the job:</h3>
      <input type="text" placeholder="title..." />
      <h3>Jobdescription:</h3>
      <input type="text" placeholder="describe the job..." />
      <h3>What will the salary be:</h3>
      <input type="number" /> <span>CHF</span>
    </div>
  );
}
