import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xgzigvmecpmsgwecekep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnemlndm1lY3Btc2d3ZWNla2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNDM0MDksImV4cCI6MjAxODgxOTQwOX0.NLH2qlqXy4ZUm35Jb2Bwpk9QJqOQ31uH8UZmUN8fYgI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
