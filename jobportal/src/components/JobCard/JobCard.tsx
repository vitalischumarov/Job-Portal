import { JobType } from "../../dataType/JobType";
import "./JobCard.scss";

type HomeProp = {
  job: JobType;
  deleteFunction: (job: number) => void;
};

export default function JobCard({ job, deleteFunction }: HomeProp) {
  return (
    <div className="job-card-container">
      <div className="job-card">
        <div className="job-card-content">
          <h3 className="job-card-title">{job.title}</h3>
        </div>
      </div>
      <button onClick={() => deleteFunction(job.id)} className="delete-job-btn">
        X
      </button>
    </div>
  );
}
