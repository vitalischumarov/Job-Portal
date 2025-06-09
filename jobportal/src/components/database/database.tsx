import { JobType } from "../../dataType/JobType";
import { supabase } from "../../supabase-client ";

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
