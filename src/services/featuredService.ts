import { supabase } from "../lib/supabase";
import type { FeaturedItem } from "../data/featureditems";

export const featuredService = {
  async getAll(): Promise<FeaturedItem[]> {
    const { data, error } = await supabase
      .from('featured_items')
      .select('*')
    
    if (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
    return data || [];
  },
};