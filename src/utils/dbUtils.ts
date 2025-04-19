
import { supabase } from "@/integrations/supabase/client";

export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(tableName as any)
      .select('id')
      .limit(1)
      .throwOnError();
    
    return !error;
  } catch (error) {
    console.log(`Table ${tableName} does not exist:`, error);
    return false;
  }
};
