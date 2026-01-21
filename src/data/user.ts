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
    background_url?: string | null;

    subscription_tier?: 'free' | 'supporter';
    subscription_expires_at?: string | null;
    stripe_customer_id?: string | null;
    stripe_subscription_id?: string | null;
    
    avatar_ring_enabled?: boolean;
    avatar_ring_color?: string;
    profile_border_color?: string;
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