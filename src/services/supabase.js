import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL; //import.meta
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
