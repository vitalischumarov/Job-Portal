import { CompanyType } from "@/dataType/CompanyType";
import { JobType } from "../dataType/JobType";
import { supabase } from "../supabase-client ";

export async function updateData(job: JobType) {
  console.log(job.id);
  const { error } = await supabase
    .from("Job")
    .update({
      title: job.title,
      description: job.description,
      salary: job.salary,
    })
    .eq("id", job.id);

  if (error) {
    console.log(error);
  } else {
    console.log("update was successfull.");
  }
}

export async function loadData(companyName: string) {
  console.log(`companyName: ${companyName}`);
  const { error, data } = await supabase
    .from("Job")
    .select()
    .eq("company", companyName);
  if (error) {
    console.log(`error-message: ${error.message}`);
    return [];
  } else {
    console.log("daten wurden geladen");
    console.log(data);
    const jobs: JobType[] = data as JobType[];
    return jobs;
  }
}

export async function loadAllJobs() {
  const { error, data } = await supabase.from("Job").select();
  if (error) {
    console.log(`error-message: ${error.message}`);
    return [];
  } else {
    // console.log("daten wurden geladen");
    // console.log(data);
    const jobs: JobType[] = data as JobType[];
    return jobs;
  }
}

export async function loadJobByID(id: number) {
  // console.log(`eingegebene id: ${id}`);
  const { error, data } = await supabase.from("Job").select().eq("id", id);
  if (error) {
    console.warn("error");
    console.log(error);
    return {
      id: 0,
      title: "",
      description: "",
      salary: 0,
      company: "companyName",
    };
  } else {
    return data[0] as JobType;
  }
}

export async function fetchCompanyData(name: string) {
  const { error, data } = await supabase
    .from("Company")
    .select()
    .eq("name", name);
  if (error) {
    console.log(`error: ${error}`);
    return {
      name: "",
      description: "",
      country: "",
      employees: "",
      email: "",
    };
  } else {
    return data[0] as CompanyType;
  }
}

export async function fetchCompanyDataByEmail(email: string) {
  const { error, data } = await supabase
    .from("Company")
    .select()
    .eq("email", email);
  if (error) {
    console.warn(error);
    return {
      name: "",
      description: "",
      country: "",
      employees: "",
      email: "",
    };
  } else {
    return data[0] as CompanyType;
  }
}
