/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Web Brain Project

The Web Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Web Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Web
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xgzigvmecpmsgwecekep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnemlndm1lY3Btc2d3ZWNla2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNDM0MDksImV4cCI6MjAxODgxOTQwOX0.NLH2qlqXy4ZUm35Jb2Bwpk9QJqOQ31uH8UZmUN8fYgI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
