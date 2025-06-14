import "./NewJobFormular.scss";
import { useState } from "react";
import { JobType } from "../../dataType/JobType";
import { Page } from "../../dataType/enumPage";
import { supabase } from "../../supabase-client ";

type HomeProp = {
  showHomePage: (setHomeScreen: string) => void;
  addJob: (job: JobType) => void;
  companyName: string;
};

export default function NewJobFormular({
  showHomePage,
  addJob,
  companyName,
}: HomeProp) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [salary, setSalary] = useState<number | undefined>();

  function typeTitleHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function typeDescriptionHandler(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescription(event.target.value);
  }

  function typeSalaryHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSalary(Number(event.target.value));
  }

  function validateInput(
    title: string,
    description: string,
    salary: number | undefined
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

  function goBackToHomeScreen() {
    showHomePage(Page.Home);
  }

  async function saveJobToDB(job: JobType) {
    const { error } = await supabase.from("Job").insert(job);
    if (error) {
      console.log(`folgender Fehler ist passiert`);
      console.log(error);
    }
  }

  function saveTheJob() {
    const validationResult = validateInput(title, description, salary);
    if (validationResult) {
      const newJob: JobType = {
        id: Math.ceil(Math.random() * 100),
        title: title,
        description: description,
        salary: Number(salary),
        company: companyName,
      };
      saveJobToDB(newJob);
      console.log(newJob);
      addJob(newJob);
      showHomePage(Page.Home);
    } else {
      console.log("validation process of your inputs failed.");
    }
  }

  return (
    <div className="main">
      <button onClick={goBackToHomeScreen}>go back</button>
      <div className="formular">
        <h3 className="formularText">Title of the job:</h3>
        <input
          type="text"
          placeholder="title..."
          name="title"
          value={title}
          onChange={typeTitleHandler}
        />
        <h3 className="formularText">Jobdescription:</h3>
        <textarea
          placeholder="describe the job..."
          name="description"
          value={description}
          onChange={typeDescriptionHandler}
        />
        <h3 className="formularText">What will the salary be in [CHF]:</h3>
        <input
          type="number"
          name="salary"
          value={salary}
          onChange={typeSalaryHandler}
        />
        <button onClick={saveTheJob} className="formularButton">
          save
        </button>
      </div>
    </div>
  );
}
