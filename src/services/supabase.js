import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wvzmrrzvgvqxiutnnpeq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2em1ycnp2Z3ZxeGl1dG5ucGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3OTkxNjEsImV4cCI6MjAzOTM3NTE2MX0.VjPv-RzbrkolWXTUmgt-OuamdMZUys1kh1st54FFi44";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
