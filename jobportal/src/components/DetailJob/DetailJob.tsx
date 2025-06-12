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
    <div>
      <div>
        <div>{job?.id}</div>
        <div>{job?.title}</div>
        <div>{job?.description}</div>
        <div>{job?.salary}</div>
        <h4></h4>
      </div>
      <div>
        <h3>{company?.name}</h3>
        <h3>{company?.description}</h3>
        <h3>{company?.country}</h3>
        <h3>{company?.email}</h3>
      </div>
    </div>
  );
}
