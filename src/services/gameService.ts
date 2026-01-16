import { supabase } from "../lib/supabase";
import type { Game } from "../data/games";

export const gameService = {
  async getAll(): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('display_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
    return data || [];
  },
};