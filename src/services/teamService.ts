import { supabase } from "../lib/supabase";
import type { teamMember } from "../data/theteam";

export const teamService = {
  async getAll(): Promise<teamMember[]> {
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
    return data || [];
  },
};