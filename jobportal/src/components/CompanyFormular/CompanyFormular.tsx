import "./CompanyFormular.scss";
import { useParams } from "react-router";
import { useInput } from "../../hooks/useInput";
import { CompanyType } from "../../dataType/CompanyType";
import { supabase } from "../../supabase-client ";
import { useNavigate } from "react-router-dom";

export default function CompanyFormular() {
  const { itemID } = useParams();
  const [companyname, setCompanyname] = useInput("");
  const [description, setDescription] = useInput("");
  const [country, setCountry] = useInput("");
  const [employee, setEmployee] = useInput("1");
  const navigate = useNavigate();

  function typeCompanynameHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCompanyname(event.target.value);
  }

  function typeDescriptionHandler(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setDescription(event.target.value);
  }

  function typeCountryHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setCountry(event.target.value);
  }

  function typeEmployeeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value <= 0) {
      return;
    } else {
      setEmployee(event.target.value);
    }
  }

  async function inputValidation() {
    if (
      companyname === "" ||
      description === "" ||
      country === "" ||
      employee === ""
    ) {
      return;
    } else {
      const company: CompanyType = {
        name: companyname,
        description: description,
        country: country,
        employees: Number(employee),
        email: String(itemID),
      };
      const { error } = await supabase.from("Company").insert(company).single();
      if (error) {
        console.log(error);
      }
      alert("Sie duerfen sich jetzt einloggen.");
      navigate("/");
    }
  }

  return (
    <div className="companyF_app">
      <div className="companyF_container">
        <div className="companyF_formular">
          <span className="companyF_text">Companyname:</span>
          <input
            type="text"
            value={companyname}
            name="companyname"
            onChange={typeCompanynameHandler}
            className="companyF_input"
          ></input>
          <span className="companyF_text">Description:</span>
          <textarea
            value={description}
            name="description"
            onChange={typeDescriptionHandler}
            className="companyF_input"
          ></textarea>
          <span className="companyF_text">Country:</span>
          <input
            type="text"
            onChange={typeCountryHandler}
            name="country"
            value={country}
            className="companyF_input"
          ></input>
          <span className="companyF_text">Employees:</span>
          <input
            type="number"
            onChange={typeEmployeeHandler}
            name="employee"
            value={employee}
            className="companyF_input"
          ></input>
          <button onClick={inputValidation} className="companyF_btn">
            save
          </button>
        </div>
      </div>
    </div>
  );
}
