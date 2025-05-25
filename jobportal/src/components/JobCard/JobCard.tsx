import "./JobCard.scss";

type HomeProp = {
  title: string;
  description: string;
};

export default function JobCard({ title, description }: HomeProp) {
  return (
    <div className="job-card">
      <h3>Title: {title}</h3>
      <h4>Description: {description}</h4>
    </div>
  );
}
