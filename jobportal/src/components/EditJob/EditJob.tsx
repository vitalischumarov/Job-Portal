import "./EditJob.scss";
import { JobType } from "../../dataType/JobType";

type HomeProp = {
  job: JobType;
};

export default function EditJob({ job }: HomeProp) {
  return (
    <div>
      <button>back to home screen</button>
      {job.title}
    </div>
  );
}
