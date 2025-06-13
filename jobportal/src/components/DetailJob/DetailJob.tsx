import "./DetailJob.scss";
import { useEffect, useState } from "react";
import { loadJobByID } from "../../database/database";
import { fetchCompanyData } from "../../database/database";
import { JobType } from "../../dataType/JobType";
import { CompanyType } from "@/dataType/CompanyType";

type jobsOverviewProp = {
  jobId: number;
};

export default function DetailJob({ jobId }: jobsOverviewProp) {
  const [job, setJob] = useState<JobType>({
    id: 0,
    title: "",
    description: "",
    salary: 0,
    company: "",
  });
  const [company, setCompany] = useState<CompanyType>();

  useEffect(() => {
    async function loadJob() {
      const job = await loadJobByID(jobId);
      setJob(job);
    }
    loadJob();
  }, [jobId]);

  useEffect(() => {
    async function loadCompany() {
      if (job?.company === undefined) {
        console.warn(`job.company ist undefine`);
        return;
      } else {
        console.log(job.company);
        const data = await fetchCompanyData(job.company);
        setCompany({
          name: data.name,
          description: data.description,
          country: data.country,
          employees: Number(data.employees),
          email: data.email,
        });
      }
    }
    loadCompany();
  }, [job]);

  return (
    <div className="job-detail-container">
      <div className="detailJob">
        <div className="job-header-wrapper">
          <div className="detailJob_title detailJob_text">
            <h1 className="job-main-title">{job?.title}</h1>
          </div>
        </div>

        <div className="job-content-wrapper">
          <div className="detailJob_description detailJob_text">
            <div className="description-content">{job?.description}</div>
          </div>

          <div className="job-meta-wrapper">
            <div className="detailJob_salary detailJob_text">
              <div className="salary-content">Salary: {job?.salary}</div>
            </div>
          </div>
        </div>

        <h4 className="job-divider"></h4>
      </div>

      <div className="company_info">
        <div className="company-content-wrapper">
          <div className="company-description-block">
            <span>Name: {company?.name}</span>
            <span>Description: {company?.description}</span>
          </div>
          <div className="company-contact-block">
            <span className="company-country">{company?.country}</span>
            <span className="company-email">{company?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
