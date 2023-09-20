import { supabase } from "~shared/lib/supabase/supabase";

export async function getColumns(user_id: number) {
  const { data } = await supabase
    .from("columns")
    .select("*")
    .eq("user_id", user_id);
  return data;
}
