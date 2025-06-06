import "./Home.scss";
import { CompanyType } from "../../dataType/CompanyType";
import { JobType } from "../../dataType/JobType";
import { useEffect, useState } from "react";
import NewJobFormular from "../NewJobFormular/NewJobFormular";
import JobCard from "../JobCard/JobCard";
import { Page } from "../../dataType/enumPage";
import EditJob from "../EditJob/EditJob";
import { supabase } from "../../supabase-client ";

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

  async function fetchCompanyData() {
    const { error, data } = await supabase
      .from("Company")
      .select()
      .eq("email", user);
    if (error) {
      console.log(`error: ${error}`);
    }
    if (data) {
      setCompany({
        name: data[0].name,
        description: data[0].description,
        country: data[0].country,
        employees: data[0].employees,
        email: user,
      });
    }
  }

  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {
    async function fetchJobs() {
      const { error, data } = await supabase
        .from("Job")
        .select()
        .eq("company", company.name);
      if (error) {
        console.log(`error-message: ${error.message}`);
      } else {
        console.log(data);
        const jobs: JobType[] = data as JobType[];
        setJobsList(jobs);
      }
    }
    fetchJobs();
  }, [company.name]);

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
      <div className="app">
        <div className="container">
          {" "}
          <button className="logout-btn" onClick={logOut}>
            Log Out
          </button>
          <div className="info-section">
            <h2>{company.name}</h2>
          </div>
          <div className="info-section">
            <h3>Description: {company.description}</h3>
          </div>
          <div className="info-section">
            <h3>Country: {company.country}</h3>
          </div>
          <div className="info-section">
            <h3>Employees: {company.employees}</h3>
          </div>
          <div className="info-section">
            <h3>E-mail contact: {company.email}</h3>
          </div>
          <hr />
          <button onClick={goToFormularPage}>add new job</button>
          <div className="jobList">
            {jobsList.map((job) => {
              return (
                <div>
                  <JobCard
                    job={job}
                    clickFunction={clickOnJobCard}
                    deleteFunction={deleteJob}
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
        companyName={company.name}
      ></NewJobFormular>
    );
  } else if (showPage === Page.EditJob) {
    const job = getTheJob();
    return (
      <EditJob
        job={job}
        showHomePage={setShowFormularPageTrue}
        changeJobFunction={getChangedJob}
      ></EditJob>
    );
  }
}
