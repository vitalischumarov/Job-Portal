import "./Home.scss";
import { CompanyType } from "../../dataType/CompanyType";
import { JobType } from "../../dataType/JobType";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NewJobFormular from "../NewJobFormular/NewJobFormular";
import JobCard from "../JobCard/JobCard";
import { Page } from "../../dataType/enumPage";
import EditJob from "../EditJob/EditJob";

export default function Home() {
  const navigate = useNavigate();
  const [jobsList, setJobsList] = useState<JobType[]>([]);
  const [showPage, setShowPage] = useState<string>(Page.Home);
  const [jobId, setJobId] = useState<number>(0);

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

  function goToFormularPage() {
    setShowPage(Page.NewJobFormular);
  }

  function setShowFormularPageTrue(setHomeScreen: string) {
    setShowPage(setHomeScreen);
  }

  function addNewJob(job: JobType) {
    setJobsList([...jobsList, job]);
  }

  function clickOnJobCard(id: number) {
    setJobId(id);
    setShowPage(Page.EditJob);
  }

  function findTheJob(): JobType | undefined {
    return jobsList.find((job) => {
      return job.id === jobId;
    });
  }

  function getChangedJob(job: JobType) {
    for (let i = 0; i < jobsList.length; i++) {
      if (jobsList[i].id === job.id) {
        jobsList[i].title = job.title;
        jobsList[i].description = job.description;
        jobsList[i].salary = job.salary;
      }
    }
    setJobsList(jobsList);
  }

  if (showPage === Page.Home) {
    return (
      <div className="app">
        <div className="container">
          {" "}
          <button className="logout-btn" onClick={logOut}>
            Log Out
          </button>
          <div className="info-section">
            <h2>{companyExample.name}</h2>
          </div>
          <div className="info-section">
            <h3>Description: {companyExample.description}</h3>
          </div>
          <div className="info-section">
            <h3>Country: {companyExample.country}</h3>
          </div>
          <div className="info-section">
            <h3>E-mail contact: {companyExample.email}</h3>
          </div>
          <hr />
          <button onClick={goToFormularPage}>add new job</button>
          <div className="jobList">
            {jobsList.map((job) => {
              return (
                <div
                  onClick={() => {
                    clickOnJobCard(job.id);
                  }}
                >
                  <JobCard
                    title={job.title}
                    description={job.description}
                  ></JobCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else if (showPage === Page.NewJobFormular) {
    return (
      <NewJobFormular
        showHomePage={setShowFormularPageTrue}
        addJob={addNewJob}
      ></NewJobFormular>
    );
  } else if (showPage === Page.EditJob) {
    const job = findTheJob();
    return (
      <EditJob
        job={job}
        showHomePage={setShowFormularPageTrue}
        changeJobFunction={getChangedJob}
      ></EditJob>
    );
  }
}
