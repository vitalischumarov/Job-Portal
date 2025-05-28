import "./EditJob.scss";
import { JobType } from "../../dataType/JobType";
import { Page } from "../../dataType/enumPage";
import { useState } from "react";

type HomeProp = {
  job: JobType | undefined;
  showHomePage: (setHomeScreen: string) => void;
};

export default function EditJob({ job, showHomePage }: HomeProp) {
  const [editPossible, setEditPossible] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>(job?.title);
  const [description, setDescription] = useState<string | undefined>(
    job?.description,
  );
  const [salary, setSalary] = useState<number | undefined>(job?.salary);

  if (job === undefined) {
    return;
  }

  function typeTitleHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function typeDescriptionHandler(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setDescription(event.target.value);
  }

  function typeSalaryHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSalary(Number(event.target.value));
  }

  function goBackToHomeScreen() {
    showHomePage(Page.Home);
  }

  function editJob() {
    if (editPossible === true) {
      setEditPossible(false);
    } else {
      setEditPossible(true);
    }
  }

  function saveChanges() {}
  if (!editPossible) {
    return (
      <div>
        <button onClick={goBackToHomeScreen}>back to home screen</button>
        <button onClick={editJob}>edit job</button>
        {title}
        <br></br>
        {description}
        <br></br>
        {salary}
        <br></br>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={goBackToHomeScreen}>back to home screen</button>
        <button onClick={editJob}>edit job</button>
        <button onClick={saveChanges}>save changed</button>
        <input value={title} onChange={typeTitleHandler}></input>
        <br></br>
        <textarea
          value={description}
          onChange={typeDescriptionHandler}
        ></textarea>
        <br></br>
        <input value={salary} onChange={typeSalaryHandler}></input>
        <br></br>
      </div>
    );
  }
}
