import { createClient } from "@supabase/supabase-js";

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseUrl = process.env.SUPABASE_URL!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
