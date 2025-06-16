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
      <div className="edit_container">
        <div className="">
          <button onClick={goBackToHomeScreen} className="edit_back_btn">
            back
          </button>
          <button onClick={editJob} className="edit_btn">
            Edit job
          </button>
        </div>

        <div className="edit_text_container">
          <div className="edit_text">Title: {newTitle}</div>
          <div className="edit_text">Description: {newDescription}</div>
          <div className="edit_text">Salary: {newSalary}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="edit_container">
        <div className="">
          <button onClick={goBackToHomeScreen} className="edit_back_btn">
            Back to home screen
          </button>
          <button onClick={editJob} className="edit_btn">
            Edit job
          </button>
          <button onClick={inputValidation} className="edit_save_btn">
            Save changes
          </button>
        </div>

        <div className="">
          <div className="">
            <input
              value={newTitle}
              onChange={typeTitleHandler}
              className="edit_input edit_title"
            />
          </div>

          <div className="">
            <textarea
              value={newDescription}
              onChange={typeDescriptionHandler}
              className="edit_input"
              autoFocus
            />
          </div>

          <div className="">
            <input
              value={newSalary}
              onChange={typeSalaryHandler}
              className="edit_input"
            />
          </div>
        </div>
      </div>
    );
  }
}
