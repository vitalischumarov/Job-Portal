import { JobType } from "../../dataType/JobType";
import "./JobCard.scss";

type HomeProp = {
  job: JobType;
  clickFunction: (job: number) => void;
  deleteFunction: (job: number) => void;
};

export default function JobCard({
  job,
  clickFunction,
  deleteFunction,
}: HomeProp) {
  return (
    <div className="job-card-container">
      <div onClick={() => clickFunction(job.id)} className="job-card">
        <h3>{job.title}</h3>
      </div>
      <button onClick={() => deleteFunction(job.id)} className="delete-job-btn">
        Delete Job
      </button>
    </div>
  );
}
