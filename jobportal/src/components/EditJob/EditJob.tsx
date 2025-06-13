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
      <div className="job-detail-container">
        <div className="job-detail-actions">
          <button onClick={goBackToHomeScreen} className="back-btn">
            Back to home screen
          </button>
          <button onClick={editJob} className="edit-btn">
            Edit job
          </button>
        </div>

        <div className="job-detail-content">
          <div className="detail-field">{newTitle}</div>
          <div className="detail-field">{newDescription}</div>
          <div className="detail-field">{newSalary}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="job-edit-container">
        <div className="job-edit-actions">
          <button onClick={goBackToHomeScreen} className="back-btn">
            Back to home screen
          </button>
          <button onClick={editJob} className="edit-btn">
            Edit job
          </button>
          <button onClick={inputValidation} className="save-btn">
            Save changes
          </button>
        </div>

        <div className="job-edit-form">
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              value={newTitle}
              onChange={typeTitleHandler}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={newDescription}
              onChange={typeDescriptionHandler}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Salary</label>
            <input
              value={newSalary}
              onChange={typeSalaryHandler}
              className="form-input"
            />
          </div>
        </div>
      </div>
    );
  }
}
