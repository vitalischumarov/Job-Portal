import "./NewJobFormular.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { JobType } from "../../dataType/JobType";

type HomeProp = {
  showHomePage: (setHomeScreen: boolean) => void;
};

export default function NewJobFormular({ showHomePage }: HomeProp) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [salary, setSalary] = useState<number | undefined>();

  function typeTitleHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function typeDescriptionHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function typeSalaryHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSalary(Number(event.target.value));
  }

  function validateInput(
    title: string,
    description: string,
    salary: number | undefined,
  ): boolean {
    if (salary === undefined) {
      return false;
    } else {
      if (salary < 1 || title === "" || description === "") {
        return false;
      } else {
        return true;
      }
    }
  }

  function saveTheJob() {
    const validationResult = validateInput(title, description, salary);
    if (validationResult) {
      const newJob: JobType = {
        title: title,
        description: description,
        salary: Number(salary),
        publishedDay: new Date(),
      };
      console.log(newJob);
      showHomePage(false);
    } else {
      console.log("validation process of your inputs failed.");
    }
  }

  return (
    <div className="main">
      <Link to={"/home"}>Back</Link>
      <div className="formular">
        <h3 className="formularText">Title of the job:</h3>
        <input
          type="text"
          placeholder="title..."
          name="title"
          value={title}
          onChange={typeTitleHandler}
          className="formularText formularInput"
        />
        <h3 className="formularText">Jobdescription:</h3>
        <input
          type="text"
          placeholder="describe the job..."
          name="description"
          value={description}
          onChange={typeDescriptionHandler}
          className="formularText formularInput"
        />
        <h3 className="formularText">What will the salary be in [CHF]:</h3>
        <input
          type="number"
          name="salary"
          value={salary}
          onChange={typeSalaryHandler}
          className="formularText formularInput"
        />
        <button onClick={saveTheJob} className="formularButton">
          save
        </button>
      </div>
    </div>
  );
}
