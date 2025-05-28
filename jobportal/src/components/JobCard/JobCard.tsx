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
    <div>
      <div
        onClick={() => {
          clickFunction(job.id);
        }}
        className="job-card"
      >
        <h3>Title: {job.title}</h3>
      </div>
      <button
        onClick={() => {
          deleteFunction(job.id);
        }}
      >
        delete job
      </button>
    </div>
  );
}
