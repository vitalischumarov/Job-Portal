import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://uibhbrqjmwasyhbqzgpe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpYmhicnFqbXdhc3loYnF6Z3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NjIzMjcsImV4cCI6MjA2NDAzODMyN30.Gx1dq5VMHtwYfNWvEbnrJ4JuWGyFzVySdprf878K7eY",
);
