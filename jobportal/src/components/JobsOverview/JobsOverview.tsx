import "./JobsOverview.scss";
import { loadAllJobs } from "../../database/database";
import { useEffect, useState } from "react";
import { JobType } from "@/dataType/JobType";
import DetailJob from "../DetailJob/DetailJob";

export default function JobsOverview() {
  const [jobList, setJobList] = useState<JobType[]>([]);
  const [showJob, setShowJob] = useState<number>(0);

  useEffect(() => {
    async function displayJobs() {
      const jobs = await loadAllJobs();
      setJobList(jobs);
    }
    displayJobs();
  }, []);

  return (
    <div className="container">
      <div className="jobCards">
        {jobList.map((job) => {
          return (
            <div
              onClick={() => {
                setShowJob(job.id);
              }}
            >
              <h4>{job.title}</h4>
            </div>
          );
        })}
      </div>
      <div>
        <DetailJob jobId={showJob} key={showJob}></DetailJob>
      </div>
    </div>
  );
}
