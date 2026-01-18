export interface User {
    id: string;
    username: string;
    avatar_url: string | null;
    bio: string | null;
    role: string;
    title: string;
    created_at: string;
    updated_at: string;
    
    discord_username?: string | null;
    youtube_username?: string | null;
    twitch_username?: string | null;

    background_type?: 'color' | 'image' | 'gradient' | null;
    background_value?: string | null;
}

export interface Badge {
    id: string;
    name: string;
    icon_url: string;
    description: string;
    created_at: string;
}

export interface UserBadge {
    badge_id: string;
    badge_name: string;
    badge_description: string;
    badge_icon_url: string;
    earned_at: string;
}