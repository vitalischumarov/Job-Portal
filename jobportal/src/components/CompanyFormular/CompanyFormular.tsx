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
    <div>
      <h3>E-Mail</h3>
      {itemID}
      <h3>Companyname:</h3>
      <input
        type="text"
        value={companyname}
        name="companyname"
        onChange={typeCompanynameHandler}
      ></input>
      <h3>Description:</h3>
      <textarea
        value={description}
        name="description"
        onChange={typeDescriptionHandler}
      ></textarea>
      <h3>Country:</h3>
      <input
        type="text"
        onChange={typeCountryHandler}
        name="country"
        value={country}
      ></input>
      <h3>Employees:</h3>
      <input
        type="number"
        onChange={typeEmployeeHandler}
        name="employee"
        value={employee}
      ></input>
      <button onClick={inputValidation}>save</button>
    </div>
  );
}
