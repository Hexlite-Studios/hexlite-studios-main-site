import { supabase } from "../lib/supabase";
import type { User, UserBadge } from "../data/user";

export const userService = {
  async getByUsername(username: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .ilike('username', username)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data;
  },

  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    return data;
  },

    async getUserBadges(userId: string): Promise<UserBadge[]> {
    const { data, error } = await supabase
        .from('user_badges')
        .select(`
        badge_id,
        earned_at,
        badges (
            name,
            description,
            icon_url
        )
        `)
        .eq('user_id', userId);
  
    if (error) {
        console.error('Error fetching user badges:', error);
        return [];
    }
  
    return (data || []).map((item: any) => ({
        badge_id: item.badge_id,
        badge_name: item.badges.name,
        badge_description: item.badges.description,
        badge_icon_url: item.badges.icon_url,
        earned_at: item.earned_at
    }));
    },
  async updateProfile(id: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user:', error);
      return null;
    }
    return data;
  },

  async uploadAvatar(userId: string, file: File): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};