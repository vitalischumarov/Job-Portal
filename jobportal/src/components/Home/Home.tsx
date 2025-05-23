import "./Home.scss";
import { CompanyType } from "../../dataType/CompanyType";
import { JobType } from "../../dataType/JobType";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [jobsList, setJobsList] = useState<JobType[]>([]);

  const companyExample: CompanyType = {
    name: "Gemeindeschule A bis Z",
    description: "Adventistische Schule",
    country: "Schweiz",
    employees: 10,
    email: "info@abisz.ch",
    jobs: jobsList,
  };

  function logOut() {
    navigate("/");
  }

  function addNewJob() {
    navigate("/newJobFormular");
  }

  return (
    <div>
      <button onClick={logOut}>Log Out</button>
      <div>
        <h2>Name of the missionary company:</h2>
        <h2>{companyExample.name}</h2>
      </div>
      <div>
        <h3>Description:</h3>
        <h3>{companyExample.description}</h3>
      </div>
      <div>
        <h3>Country:</h3>
        <h3>{companyExample.country}</h3>
      </div>
      <div>
        <h3>E-mail contact:</h3>
        <h3>{companyExample.email}</h3>
      </div>
      <hr />
      <button onClick={addNewJob}>add new job</button>
      {jobsList.map((job) => {
        return (
          <div>
            {job.title} : {job.description}
          </div>
        );
      })}
    </div>
  );
}
