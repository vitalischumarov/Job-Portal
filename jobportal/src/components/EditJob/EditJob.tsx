import "./EditJob.scss";
import { JobType } from "../../dataType/JobType";
import { Page } from "../../dataType/enumPage";
import { useState } from "react";
import { updateData } from "../../database/database";

type HomeProp = {
  job: JobType | undefined;
  showHomePage: (setHomeScreen: string) => void;
  changeJobFunction: (job: JobType) => void;
};

export default function EditJob({
  job,
  showHomePage,
  changeJobFunction,
}: HomeProp) {
  const [editPossible, setEditPossible] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string | undefined>(job?.title);
  const [newDescription, setNewDescription] = useState<string | undefined>(
    job?.description
  );
  const [newSalary, setNewSalary] = useState<number | undefined>(job?.salary);

  function typeTitleHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  function typeDescriptionHandler(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setNewDescription(event.target.value);
  }

  function typeSalaryHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setNewSalary(Number(event.target.value));
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

  function inputValidation() {
    if (newTitle === undefined) {
      return;
    }
    if (newDescription === undefined) {
      return;
    }
    if (newSalary === undefined) {
      return;
    }
    if (job === undefined) {
      return;
    }
    if (job.id === undefined) {
      return;
    }
    const newJob: JobType = {
      title: newTitle,
      description: newDescription,
      salary: newSalary,
      company: job.company,
      id: job.id,
    };
    updateData(newJob);
    changeJobFunction(newJob);
    goBackToHomeScreen();
  }

  if (!editPossible) {
    return (
      <div>
        <button onClick={goBackToHomeScreen}>back to home screen</button>
        <button onClick={editJob}>edit job</button>
        {newTitle}
        <br></br>
        {newDescription}
        <br></br>
        {newSalary}
        <br></br>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={goBackToHomeScreen}>back to home screen</button>
        <button onClick={editJob}>edit job</button>
        <button onClick={inputValidation}>save changed</button>
        <input value={newTitle} onChange={typeTitleHandler}></input>
        <br></br>
        <textarea
          value={newDescription}
          onChange={typeDescriptionHandler}
        ></textarea>
        <br></br>
        <input value={newSalary} onChange={typeSalaryHandler}></input>
        <br></br>
      </div>
    );
  }
}
