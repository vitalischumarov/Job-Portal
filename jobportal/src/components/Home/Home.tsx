import "./Home.scss";
import { CompanyType } from "../../dataType/CompanyType";
import { JobType } from "../../dataType/JobType";
import { useEffect, useState } from "react";
import NewJobFormular from "../NewJobFormular/NewJobFormular";
import JobCard from "../JobCard/JobCard";
import { Page } from "../../dataType/enumPage";
import EditJob from "../EditJob/EditJob";
import { supabase } from "../../supabase-client ";
import { loadData } from "../../database/database";
import { fetchCompanyDataByEmail } from "../../database/database";

type LogProp = {
  logout: () => void;
  user: string;
};

export default function Home({ logout, user }: LogProp) {
  const [jobsList, setJobsList] = useState<JobType[]>([]);
  const [showPage, setShowPage] = useState<string>(Page.Home);
  const [jobId, setJobId] = useState<number>(0);
  const [company, setCompany] = useState<CompanyType>({
    name: "",
    description: "",
    country: "",
    employees: 0,
    email: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCompanyDataByEmail(user);
      setCompany({
        name: data.name,
        description: data.description,
        country: data.country,
        employees: Number(data.employees),
        email: user,
      });
    }
    fetchData();
  });

  useEffect(() => {
    async function displayJobs() {
      const jobs = await loadData(company.name);
      setJobsList(jobs);
    }
    displayJobs();
  }, [company.name]);

  function updateJob(job: JobType) {
    const newJobList: JobType[] = [];
    for (let i = 0; i < jobsList.length; i++) {
      if (jobsList[i].id === job.id) {
        jobsList[i].title = job.title;
        jobsList[i].description = job.description;
        jobsList[i].salary = job.salary;
      }
      newJobList.push(jobsList[i]);
    }
  }

  function logOut() {
    logout();
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

  function getTheJob(): JobType | undefined {
    return jobsList.find((job) => {
      return job.id === jobId;
    });
  }

  async function deleteJob(id: number) {
    console.log(`id: ${id}`);
    console.log(`company: ${company.name}`);
    const { error } = await supabase
      .from("Job")
      .delete()
      .eq("id", id)
      .eq("company", company.name);
    if (error) {
      console.log(error);
    } else {
      console.log(`erfolgreich...`);
    }
    const newList = jobsList.filter((job) => job.id !== id);
    setJobsList(newList);
  }

  if (showPage === Page.Home) {
    return (
      <div className="home_app">
        <div className="">
          <button className="logout_btn" onClick={logOut}>
            Log Out
          </button>
          <div className="company_profile_container">
            <div className="info-section">
              <h2 className="company-name">{company.name}</h2>
            </div>

            <div className="info-section">
              <p className="info-value">{company.description}</p>
            </div>

            <div className="info-section">
              <p className="info-value">
                <b>Country: </b>
                {company.country}
              </p>
            </div>

            <div className="info-section">
              <p className="info-value">
                <b>Employees: </b>
                {company.employees}
              </p>
            </div>

            <div className="info-section">
              <p className="info-value">
                <b>E-mail contact: </b>
                {company.email}
              </p>
            </div>
          </div>
          <div className="home_jobListing">
            <h2>Unsere Stellenangebote</h2>
            <button onClick={goToFormularPage} className="add-job-btn">
              Add new job
            </button>
            <div className="jobList">
              {jobsList.map((job) => (
                <div key={job.id}>
                  <JobCard
                    job={job}
                    deleteFunction={deleteJob}
                    clickOnJob={() => {
                      clickOnJobCard(job.id);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (showPage === Page.NewJobFormular) {
    return (
      <NewJobFormular
        showHomePage={setShowFormularPageTrue}
        addJob={addNewJob}
        companyName={company.name}
      ></NewJobFormular>
    );
  } else if (showPage === Page.EditJob) {
    const job = getTheJob();
    return (
      <EditJob
        job={job}
        showHomePage={setShowFormularPageTrue}
        changeJobFunction={updateJob}
      ></EditJob>
    );
  }
}
